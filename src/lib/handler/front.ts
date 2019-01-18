import fs from 'fs';
import path from 'path';
import { Application } from 'express';
import { AppRequest } from '../express';
import config from '../config';

const packageData = JSON.parse(fs.readFileSync(
    path.join(__dirname, '..', '..', '..', 'package.json'), 'utf8'));

export default (app: Application) => {

    app.get('/', (req, res) => {
        res.render('index', {
            loggedIn: (req as AppRequest).isAuthenticated(),
            version: packageData.version,
            title: config.title || 'Feeds',
            production: process.env.NODE_ENV === 'production'
        });
    });

    app.get('/old', (req, res) => {
        res.render('old');
    });
};
