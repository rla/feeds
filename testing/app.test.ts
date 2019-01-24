import path from 'path';
import puppeteer, { Browser, Page } from 'puppeteer';
import runMain, { System } from '../src/lib/runMain';
import createSqliteFile from './createSqliteFile';
import { closeServer, errorWatcher } from './testUtils';

const TEST_DATA = path.join(__dirname, 'app.data.sql');
const SQLITE_FILE = path.join(__dirname, 'app.db.sqlite');
const CONFIG_FILE = path.join(__dirname, 'app.config.json');

let system: System;
let browser: Browser;

// Starts the server with the

beforeAll(async () => {
    await createSqliteFile(SQLITE_FILE, TEST_DATA);
    system = await runMain(['-c', CONFIG_FILE]);
    browser = await puppeteer.launch({ args: ['--no-sandbox'] });
});

// Closes the browser instance of Puppeteer.
// Closes database, shuts down Express server.
// Clears the periodic fetcher interval.

afterAll(async () => {
    await browser.close();
    if (system) {
        clearInterval(system.fetcher);
        await system.database.close();
        await closeServer(system.server);
    }
});

let page: Page;
let errors: Error[] = [];

// Setup page for each test. Errors array is for detecting
// various errors on the page.

beforeEach(async () => {
    page = await browser.newPage();
    page.on('dialog', async (dialog) => {
        await dialog.dismiss();
    });
    errors = errorWatcher(page);
});

afterEach(async () => {
    if (page) {
        await page.close();
    }
});

const BASE_URL = 'http://localhost:3330';

it('should display unseen articles', async () => {
    await page.goto(`${BASE_URL}/`);
    await page.waitForSelector('#root .well');
    expect(errors).toEqual([]);
});

it('should display important articles', async () => {
    await page.goto(`${BASE_URL}/#important`);
    await page.waitForSelector('#root .well');
    expect(errors).toEqual([]);
});
