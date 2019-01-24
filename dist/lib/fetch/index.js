"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const split_1 = __importDefault(require("split"));
const child_process_1 = require("child_process");
const debug_1 = __importDefault(require("debug"));
const debug = debug_1.default('app:fetch');
/**
 * Runs feed fetching and parsing as a separate NodeJS process.
 */
exports.default = async (feeds, configFile) => {
    return new Promise((resolve, reject) => {
        const script = path_1.default.join(__dirname, 'app.js');
        const app = child_process_1.spawn('node', [script, configFile]);
        const results = [];
        const errors = [];
        app.stdout.pipe(split_1.default()).on('data', (line) => {
            if (!line) {
                return;
            }
            const obj = JSON.parse(line);
            if (obj.type === 'error') {
                const error = obj.data;
                errors.push(error);
                console.error(`Feed ${error.url}`);
                console.error(error.err);
            }
            else if (obj.type === 'feed') {
                const feed = obj.data;
                debug(`Got feed ${feed.url}`);
                feed.items.forEach((article) => {
                    article.date = article.date === null ? null : new Date(article.date);
                });
                results.push(feed);
            }
        });
        app.stderr.on('data', (data) => {
            process.stderr.write(data);
        });
        app.on('close', (code) => {
            if (code === 0) {
                const ret = { errors, feeds: results };
                resolve(ret);
            }
            else {
                reject(new Error('Fetching failed.'));
            }
        });
        const feedsToFetch = feeds.map(({ url, uuid }) => ({ url, uuid }));
        app.stdin.write(JSON.stringify(feedsToFetch) + '\n');
    });
};
//# sourceMappingURL=index.js.map