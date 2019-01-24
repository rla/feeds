import path from 'path';
import split from 'split';
import { spawn } from 'child_process';
import debugLogger from 'debug';
import {
    FetchFeedIn,
    FetchFeedOut,
    FetchResult,
    FetchError
} from '../data';

const debug = debugLogger('app:fetch');

/**
 * Runs feed fetching and parsing as a separate NodeJS process.
 */
export default async (feeds: FetchFeedIn[], configFile: string): Promise<FetchResult> => {
    return new Promise((resolve, reject) => {

        const script = path.join(__dirname, 'app.js');
        const app = spawn('node', [ script, configFile ]);
        const results: FetchFeedOut[] = [];
        const errors: FetchError[] = [];

        app.stdout.pipe(split()).on('data', (line: string) => {
            if (!line) {
                return;
            }
            const obj = JSON.parse(line);
            if (obj.type === 'error') {
                const error = obj.data as FetchError;
                errors.push(error);
                console.error(`Feed ${error.url}`);
                console.error(error.err);

            } else if (obj.type === 'feed') {
                const feed = obj.data as FetchFeedOut;
                debug(`Got feed ${feed.url}`);
                feed.items.forEach((article) => {
                    article.date = article.date === null ? null : new Date(article.date);
                });
                results.push(feed);
            }
        });

        app.stderr.on('data', (data: string | Buffer) => {
            process.stderr.write(data);
        });

        app.on('close', (code: number) => {
            if (code === 0) {
                const ret: FetchResult = { errors, feeds: results };
                resolve(ret);
            } else {
                reject(new Error('Fetching failed.'));
            }
        });

        const feedsToFetch = feeds.map(({url, uuid}) => ({url, uuid}));
        app.stdin.write(JSON.stringify(feedsToFetch) + '\n');
    });
};
