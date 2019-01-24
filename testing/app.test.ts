import path from 'path';
import { ChildProcess } from 'child_process';
import puppeteer, { Browser, Page } from 'puppeteer';
import createSqliteFile from './createSqliteFile';
import { errorWatcher, runServer } from './testUtils';

const TEST_DATA = path.join(__dirname, 'app.data.sql');
const SQLITE_FILE = path.join(__dirname, 'app.db.sqlite');
const CONFIG_FILE = path.join(__dirname, 'app.config.json');
const APP_MODULE = path.join(__dirname, '..', 'dist');

let app: ChildProcess;
let browser: Browser;

// Starts the server. Starts Puppeteer. Waits some time to
// let server begin serving HTTP request.

beforeAll(async () => {
    await createSqliteFile(SQLITE_FILE, TEST_DATA);
    app = runServer(APP_MODULE, ['-c', CONFIG_FILE]);
    browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    await new Promise((resolve) => setTimeout(resolve, 1000));
});

// Closes the browser instance of Puppeteer.
// Kills the application.

afterAll(async () => {
    await browser.close();
    app.kill();
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
    await page.close();
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

it('should display search results', async () => {
    await page.goto(`${BASE_URL}/#results/article`);
    await page.waitForSelector('#root .well');
    expect(errors).toEqual([]);
});

it('should display invalid feeds', async () => {
    await page.goto(`${BASE_URL}/#invalid`);
    await page.waitForSelector('#root .well');
    expect(errors).toEqual([]);
});

it('should display feeds', async () => {
    await page.goto(`${BASE_URL}/#feeds`);
    await page.waitForSelector('#root .well');
    expect(errors).toEqual([]);
});
