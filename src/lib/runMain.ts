import path from 'path';
import { SqliteDatabase } from './db';
import runUpdate from './runUpdate';
import readVersion from './readVersion';
import parseOptions from './parseOptions';
import { readConfig } from './readConfig';
import runServer from './runServer';
import periodicFetch from './periodicFetch';

/**
 * Runs the application.
 */
export default async (argv: string[]) => {
  const options = parseOptions(argv);
  const version = await readVersion();
  const configFile = options.configFile || path.join(__dirname, '..', '..', 'config.json');
  const config = await readConfig(configFile, version);
  const database = new SqliteDatabase(config.db);
  await database.open();
  if (options.fetch) {
    await runUpdate(database, configFile);
    await database.close();
  } else {
    await periodicFetch(config, database, configFile);
    await runServer(config, database);
  }
};
