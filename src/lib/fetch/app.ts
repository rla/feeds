import util from 'util';
import request from 'request';
import PromiseQueue from 'promise-queue';
import fastFeed from 'fast-feed';
import debugLogger from 'debug';
import split from 'split';
import {
    FetchFeedIn,
    FetchFeedOut,
    FetchError
} from '../data';
import config from '../config';

const debug = debugLogger('app:fetch');

const writeOutput = util.promisify(
    (msg: string, cb: (err: Error) => void) => process.stdout.write(msg, cb));

const promisedRequest = util.promisify(request);

// Sets up stdin for receiving data.

process.stdin.resume();
process.stdin.setEncoding('utf8');

// Wait for incoming request.

process.stdin.pipe(split()).on('data', (line) => {
    (async () => {
        try {
            const feeds = JSON.parse(line) as FetchFeedIn[];
            // Fetch all feeds and exit then.
            await fetchAll(feeds);
            process.exit(0);
        } catch (err) {
            process.stderr.write(err + '\n');
            process.exit(1);
        }
    })();
});

// This should be moved to the parsing package.

type ParsedFeedItem = {
    id: string | null,
    title: string | null,
    link: string | null,
    date: Date | null
};

type ParsedFeed = {
    id: string | null,
    title: string | null,
    link: string | null,
    items: ParsedFeedItem[]
};

// Parses given feed after
// fixups.

const parse = (feed: string) => {
    feed = feed.replace(/allowfullscreen>/g, '>');
    return fastFeed.parse(feed, { content: false }) as ParsedFeed;
};

// Fetches single url and parses result.
// Calls cb at the end.

const fetch = async (feed: FetchFeedIn) => {
    const options = {
        url: feed.url,
        timeout: config.timeout,
        strictSSL: false,
        maxRedirects: 5
    };
    try {
        const response = await promisedRequest(options);
        if (response.statusCode !== 200) {
            throw new Error(`Status code non-200 (${response.statusCode}).`);
        }
        const parsedFeed = parse(response.body.toString());
        await outputFeed(feed, parsedFeed);
    } catch (err) {
        await outputError(err, feed);
    }
};

const outputFeed = async (feed: FetchFeedIn, result: ParsedFeed) => {
    const out: FetchFeedOut = {
        url: feed.url,
        uuid: feed.uuid,
        id: result.id,
        items: result.items.map((item) => {
            return {
                id: item.id,
                title: item.title,
                link: item.link,
                date: item.date
            };
        }),
        link: result.link,
        title: result.title
    };
    return writeOutput(JSON.stringify({type: 'feed', data: out}) + '\n');
};

const outputError = async (err: Error, feed: FetchFeedIn) => {
    const out: FetchError = {
        url: feed.url,
        uuid: feed.uuid,
        err: err.message
    };
    return writeOutput(JSON.stringify({type: 'error', data: out}) + '\n');
};

// Fetches all given urls.
// Does it so by parallel requests.

const fetchAll = async (feeds: FetchFeedIn[]) => {
    debug(`Using ${config.requests} concurrent requests`);
    const queue = new PromiseQueue(config.requests);
    return Promise.all(feeds.map((feed) => queue.add(() => fetch(feed))));
};
