import path from 'path';
import { SqliteDatabase } from './db';
import runUpdate from './runUpdate';
import readVersion from './readVersion';
import parseOptions from './parseOptions';
import { readConfig } from './readConfig';
import runServer from './runServer';
import periodicFetch from './periodicFetch';
import { Server } from 'http';

export type System = {
    database: SqliteDatabase,
    server: Server,
    fetcher: NodeJS.Timeout
} | void;

/**
 * Runs the application.
 */
export default async (argv: string[]): Promise<System> => {
    const options = parseOptions(argv);
    const version = await readVersion();
    const configFile = options.configFile || path.join(__dirname, '..', '..', 'config.json');
    const config = await readConfig(configFile, version);
    const database = new SqliteDatabase(config.db);
    await database.open();
    if (options.fetch) {
        await runUpdate(database);
        await database.close();
    } else {
        const fetcher = await periodicFetch(config, database);
        const server = await runServer(config, database);
        return { database, fetcher, server };
    }
};
