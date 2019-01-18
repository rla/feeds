import debugLogger from 'debug';
import * as db from './db';
import {
    FeedRow,
    FetchError,
    FetchFeedOut,
    FeedArticle
} from './data';
import * as feedRepo from './repo/feed';
import * as articleRepo from './repo/article';
import fetch from './fetch';

const debug = debugLogger('app:service');

/**
 * Updates all feeds in the database.
 */
export const update = async () => {
    const feeds = await db.tx(async (tx) => feedRepo.all(tx));
    debug(`Updating ${feeds.length} feeds.`);
    const result = await fetch(feeds);
    await updateDatabase(result.feeds);
    await saveErrors(result.errors);
};

const updateDatabase = async (feeds: FetchFeedOut[]) => {
    await db.tx(async (tx) => {
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
                const article: FeedArticle = {
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

const saveErrors = async (errors: FetchError[]) => {
    return db.tx(async (tx) => {
        await feedRepo.clearErrors(tx);
        for (const error of errors) {
            await feedRepo.mark(tx, error.uuid, error.err);
        }
    });
};
