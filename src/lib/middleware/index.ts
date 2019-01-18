import path from 'path';
import { Application } from 'express';
import express from 'express';
import logger from 'morgan';
import buster from './buster';
import cookies from './cookies';
import session from './session';

export default (app: Application) => {
    if (process.env.NODE_ENV !== 'production') {
        app.use(logger('dev'));
    }
    app.use(buster());
    let staticOptions = {};
    if (process.env.NODE_ENV === 'production') {
        staticOptions = { maxAge: '30d' };
    }
    app.use(express.static(
        path.join(__dirname, '..', '..', '..', 'public'),
        staticOptions));
    app.use(cookies());
    app.use(session());
};
