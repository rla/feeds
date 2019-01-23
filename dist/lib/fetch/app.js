"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = __importDefault(require("util"));
const request_1 = __importDefault(require("request"));
const promise_queue_1 = __importDefault(require("promise-queue"));
const fast_feed_1 = __importDefault(require("fast-feed"));
const debug_1 = __importDefault(require("debug"));
const split_1 = __importDefault(require("split"));
const readConfig_1 = require("../readConfig");
const debug = debug_1.default('app:fetch');
const writeOutput = util_1.default.promisify((msg, cb) => process.stdout.write(msg, cb));
const promisedRequest = util_1.default.promisify(request_1.default);
// Sets up stdin for receiving data.
process.stdin.resume();
process.stdin.setEncoding('utf8');
// Wait for incoming request.
process.stdin.pipe(split_1.default()).on('data', (line) => {
    (async () => {
        try {
            const feeds = JSON.parse(line);
            // Fetch all feeds and exit then.
            await fetchAll(feeds);
            process.exit(0);
        }
        catch (err) {
            process.stderr.write(err + '\n');
            process.exit(1);
        }
    })();
});
// Parses given feed after
// fixups.
const parse = (feed) => {
    feed = feed.replace(/allowfullscreen>/g, '>');
    return fast_feed_1.default.parse(feed, { content: false });
};
// Fetches single url and parses result.
// Calls cb at the end.
const fetch = async (config, feed) => {
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
    }
    catch (err) {
        await outputError(err, feed);
    }
};
const outputFeed = async (feed, result) => {
    const out = {
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
    return writeOutput(JSON.stringify({ type: 'feed', data: out }) + '\n');
};
const outputError = async (err, feed) => {
    const out = {
        url: feed.url,
        uuid: feed.uuid,
        err: err.message
    };
    return writeOutput(JSON.stringify({ type: 'error', data: out }) + '\n');
};
// Fetches all given urls.
// Does it so by parallel requests.
const fetchAll = async (feeds) => {
    const configFile = process.argv[1];
    if (!configFile) {
        throw new Error('Config file is not specified.');
    }
    const config = await readConfig_1.readConfig(configFile, 'child');
    debug(`Using ${config.requests} concurrent requests`);
    const queue = new promise_queue_1.default(config.requests);
    return Promise.all(feeds.map((feed) => queue.add(() => fetch(config, feed))));
};
//# sourceMappingURL=app.js.map