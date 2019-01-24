import { Server } from 'http';
import { Page } from 'puppeteer';

/**
 * Closes the given HTTP server.
 */
export const closeServer = (server: Server) => {
    return new Promise<void>((resolve) => {
        server.close(() => resolve());
    });
};

/**
 * Creates object to keep errors during the page execution.
 * Sets up error callbacks on the Puppeteer page instance.
 */
export const errorWatcher = (page: Page) => {
    const errors: Error[] = [];
    page.on('error', (err) => {
        errors.push(err);
    });
    page.on('pageerror', (err) => {
        errors.push(err);
    });
    page.on('requestfailed', (request) => {
        errors.push(new Error(`Request to url ${request.url()} failed.`));
    });
    page.on('requestfinished', (request) => {
        const response = request.response();
        if (response) {
            const status = response.status();
            if (status < 200 || status > 400) {
                errors.push(new Error(`Request to url ${request.url()} failed with non-200/300 status code.`));
            }
        }
    });
    return errors;
};
