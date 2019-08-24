import { Server } from 'http';
import { Page } from 'puppeteer';
import { spawn } from 'child_process';

/**
 * Runs the server. Pipes its output to the current process.
 * Throws (uncaught) error when the application finishes with
 * nonzero status code.
 */
export const runServer = (moduleLocation: string, args: string[]) => {
  const child = spawn('node', [moduleLocation, ...args], {
    env: { NODE_ENV: 'production' },
  });
  child.stdout.pipe(
    process.stdout,
    { end: false }
  );
  child.stderr.pipe(
    process.stderr,
    { end: false }
  );
  child.on('close', code => {
    if (code !== 0) {
      throw new Error('Child application finished with non-0 exit value.');
    }
  });
  return child;
};

/**
 * Runs the app. Pipes its output to the current process.
 * Resolves the returned promise when the process is finished.
 */
export const runApp = (moduleLocation: string, args: string[]) => {
  return new Promise((resolve, reject) => {
    const child = spawn('node', [moduleLocation, ...args], {
      env: { NODE_ENV: 'production' },
    });
    child.stdout.pipe(
      process.stdout,
      { end: false }
    );
    child.stderr.pipe(
      process.stderr,
      { end: false }
    );
    child.on('close', code => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error('Child application finished with non-0 exit value.'));
      }
    });
  });
};

/**
 * Closes the given HTTP server.
 */
export const closeServer = (server: Server) => {
  return new Promise<void>(resolve => {
    server.close(() => resolve());
  });
};

/**
 * Creates object to keep errors during the page execution.
 * Sets up error callbacks on the Puppeteer page instance.
 */
export const errorWatcher = (page: Page) => {
  const errors: Error[] = [];
  page.on('error', err => {
    errors.push(err);
  });
  page.on('pageerror', err => {
    errors.push(err);
  });
  page.on('requestfailed', request => {
    errors.push(new Error(`Request to url ${request.url()} failed.`));
  });
  page.on('requestfinished', request => {
    const response = request.response();
    if (response) {
      const status = response.status();
      if (status < 200 || status > 400) {
        errors.push(
          new Error(`Request to url ${request.url()} failed with non-200/300 status code.`)
        );
      }
    }
  });
  return errors;
};
