import { Config } from './readConfig';
import { Database } from './db';
import runUpdate from './runUpdate';

/**
 * Starts to pull newsfeeds periodically.
 */
export default async (config: Config, database: Database) => {
    if (config.polltime < 60) {
        throw new Error('Poll time must be at least 60 seconds.');
    }
    return setInterval(async () => {
        await runUpdate(database);
    }, config.polltime * 1000);
};
