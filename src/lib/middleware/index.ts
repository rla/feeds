import path from 'path';
import { Application } from 'express';
import express from 'express';
import buster from './buster';
import cookies from './cookies';
import session from './session';

export default (app: Application) => {
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
