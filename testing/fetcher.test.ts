import path from 'path';
import createFeedServer from './createFeedServer';
import createSqliteFile from './createSqliteFile';
import { closeServer, runApp } from './testUtils';
import { Server } from 'http';

// Configuration for this test.
// FEED_SERVER_PORT must be consistent with test data in TEST_DATA.
// CONFIG_FILE must reference the database file SQLITE_FILE.

const FEED_SERVER_PORT = 5001;
const TEST_DATA = path.join(__dirname, 'fetcher.data.sql');
const SQLITE_FILE = path.join(__dirname, 'fetcher.db.sqlite');
const CONFIG_FILE = path.join(__dirname, 'fetcher.config.json');
const APP_MODULE = path.join(__dirname, '..', 'dist');

let server: Server;

// Sets up server serving the test feed.
// Creates database instance with the test data.

beforeAll(async () => {
    server = await createFeedServer(FEED_SERVER_PORT);
    await createSqliteFile(SQLITE_FILE, TEST_DATA);
});

afterAll(async () => {
    await closeServer(server);
});

it('should fetch the feed and update the database without error', async () => {
    await runApp(APP_MODULE, ['-f', '-c', CONFIG_FILE]);
});
