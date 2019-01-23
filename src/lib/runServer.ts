import express, { Application } from 'express';
import debugLogger from 'debug';
import { Config } from './readConfig';
import { Database } from './db';
import setupEJS from './setupEJS';
import middleware from './middleware';
import handler from './handler';
import { Server } from 'http';

const debug = debugLogger('app');

/**
 * Starts the server. Returns a promise that is
 * resolved once the server starts.
 */
export default async (config: Config, database: Database) => {
    return new Promise<Server>((resolve, reject) => {
        // Set up the express app.
        const app = express();
        // Set up templating.
        setupEJS(app);
        // Generic middleware stack.
        middleware(app, config);
        // Set up handlers.
        handler(app, config, database);
        // Starts the server.
        app.set('port', process.env.PORT || 3330);
        const server = app.listen(app.get('port'), () => {
            debug('Express web server is started.');
            resolve(server);
        });
    });
};
