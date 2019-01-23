import { Application } from 'express';
import { AppRequest } from '../express';
import { Config } from '../readConfig';

/**
 * Sets up route handlers for static HTML pages.
 */
export default (app: Application, config: Config) => {

    app.get('/', (req, res) => {
        res.render('index', {
            loggedIn: (req as AppRequest).isAuthenticated(),
            version: config.version,
            title: config.title || 'Feeds',
            production: process.env.NODE_ENV === 'production'
        });
    });

    app.get('/old', (req, res) => {
        res.render('old');
    });
};
