import debugLogger from 'debug';
import { Database } from './db';
import { FetchError, FetchFeedOut, FeedArticle } from './data';
import * as feedRepo from './repo/feed';
import * as articleRepo from './repo/article';
import fetch from './fetch';

const debug = debugLogger('app:service');

/**
 * Updates all feeds in the database.
 */
export default async (database: Database, configFile: string) => {
  const feeds = await database.transaction(tx => feedRepo.all(tx));
  debug(`Updating ${feeds.length} feeds.`);
  const result = await fetch(feeds, configFile);
  await updateDatabase(database, result.feeds);
  await saveErrors(database, result.errors);
};

const updateDatabase = async (database: Database, feeds: FetchFeedOut[]) => {
  await database.transaction(async tx => {
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
          date: item.date ? item.date : new Date(),
        };
        await articleRepo.save(tx, article);
      }
    }
  });
};

const saveErrors = async (database: Database, errors: FetchError[]) => {
  return database.transaction(async tx => {
    await feedRepo.clearErrors(tx);
    for (const error of errors) {
      await feedRepo.mark(tx, error.uuid, error.err);
    }
  });
};
