import path from 'path';
import { Application } from 'express';
import 'ejs';

/**
 * Sets up the EJS templating engine.
 */
export default (app: Application) => {
    app.set('views', path.join(__dirname, '..', '..', 'views'));
    app.set('view engine', 'ejs');
};
