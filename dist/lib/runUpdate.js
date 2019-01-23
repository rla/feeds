"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const feedRepo = __importStar(require("./repo/feed"));
const articleRepo = __importStar(require("./repo/article"));
const fetch_1 = __importDefault(require("./fetch"));
const debug = debug_1.default('app:service');
/**
 * Updates all feeds in the database.
 */
exports.default = async (database) => {
    const feeds = await database.transaction((tx) => feedRepo.all(tx));
    debug(`Updating ${feeds.length} feeds.`);
    const result = await fetch_1.default(feeds);
    await updateDatabase(database, result.feeds);
    await saveErrors(database, result.errors);
};
const updateDatabase = async (database, feeds) => {
    await database.transaction(async (tx) => {
        for (const feed of feeds) {
            if (!feed.title) {
                feed.title = 'Untitled';
            }
            await feedRepo.updateTitle(tx, feed.uuid, feed.title);
            for (const item of feed.items) {
                const id = item.id ? item.id : item.link;
                if (!id) {
                    continue;
                }
                if (!item.link) {
                    continue;
                }
                const article = {
                    id,
                    feedUuid: feed.uuid,
                    title: item.title || 'Untitled',
                    link: item.link,
                    date: item.date ? item.date : new Date()
                };
                await articleRepo.save(tx, article);
            }
        }
    });
};
const saveErrors = async (database, errors) => {
    return database.transaction(async (tx) => {
        await feedRepo.clearErrors(tx);
        for (const error of errors) {
            await feedRepo.mark(tx, error.uuid, error.err);
        }
    });
};
//# sourceMappingURL=runUpdate.js.map