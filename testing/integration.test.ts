import path from 'path';
import util from 'util';
import puppeteer, { Browser, Page } from 'puppeteer';
import runMain, { System } from '../src/lib/runMain';
import createSqliteFile from './createSqliteFile';

const configFile = path.join(__dirname, 'test.config.json');
const sqliteFile = path.join(__dirname, 'db.sqlite');

let system: System;
let browser: Browser;

/**
 * Starts the server with the special config file
 * for the integration tests.
 */
beforeAll(async () => {
    await createSqliteFile(sqliteFile);
    system = await runMain(['-c', configFile]);
    browser = await puppeteer.launch({ args: ['--no-sandbox'] });
});

/**
 * Closes database and server handles.
 */
afterAll(async () => {
    console.log('CLOSE');
    if (browser) {
        await browser.close();
    }
    if (system) {
        clearInterval(system.fetcher);
        await system.database.close();
        await util.promisify((cb) => {
            if (system) {
                system.server.close(cb);
            }
        })();
    }
});

let page: Page;
let errors = 0;

/**
 * Setup page for each test. Errors counter is for detecting
 * various errors on the page.
 */
beforeEach(async () => {
    page = await browser.newPage();
    errors = 0;
    page.on('dialog', async (dialog) => {
        await dialog.dismiss();
    });
    page.on('error', (err) => {
        console.log(err);
        errors += 1;
    });
    page.on('pageerror', (err) => {
        console.log(err);
        errors += 1;
    });
    page.on('requestfailed', (request) => {
        console.log(`Request to url ${request.url()} failed.`);
        errors += 1;
    });
    page.on('requestfinished', (request) => {
        const response = request.response();
        if (response) {
            if (response.status() !== 200) {
                console.log(`Request to url ${request.url()} failed with non-200 status code.`);
                errors += 1;
            }
        }
    });
});

/**
 * Closes page after each test.
 */
afterEach(async () => {
    if (page) {
        await page.close();
    }
});

it('should display unseen articles', async () => {
    await page.goto('http://localhost:3330/');
    await page.waitForSelector('#root .well', { timeout: 2000 });
    expect(errors).toBe(0);
    expect(await page.title()).toBe('Feeds');
});
