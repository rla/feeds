import 'source-map-support/register';
import commander from 'commander';
import express from 'express';
import ejs from './lib/ejs';
import middleware from './lib/middleware';
import handler from './lib/handler';
import * as db from './lib/db';
import * as logger from './lib/logger';
import * as service from './lib/service';
import config from './lib/config';
import debugLogger from 'debug';

const debug = debugLogger('app');

commander.version(config.version);
commander.option('-f, --fetch', 'Runs fetch process right at start.');
commander.parse(process.argv);

const runFetch = async () => {
    logger.info('Single-time feed update triggered.');
    await service.update();
    logger.info('Finished feed update.');
    process.exit(0);
};

const setupPeridocFetch = async () => {
    if (config.polltime < 60) {
        throw new Error('Poll time must be at least 60 seconds.');
    }
    setInterval(async () => {
        logger.info('Updating feed.');
        await service.update();
        logger.info('Update finished.');
    }, config.polltime * 1000);
};

const startServer = async () => {
    // Set up the express app.
    const app = express();
    // Set up templating.
    ejs(app);
    // Generic middleware stack.
    middleware(app);
    // Set up handlers.
    handler(app);
    // Starts the server.
    app.set('port', process.env.PORT || 3330);
    app.listen(app.get('port'), () => {
        logger.info('Express web server is started.');
    });
};

const runMain = async () => {
    if (commander.fetch) {
        await runFetch();
    } else {
        await setupPeridocFetch();
        await startServer();
    }
};

(async () => {
    try {
        await db.open(config.db);
        await runMain();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
})();
