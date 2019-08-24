import path from 'path';
import { Application } from 'express';
import express from 'express';
import buster from './buster';
import cookies from './cookies';
import session from './session';
import { Config } from '../readConfig';

export default (app: Application, config: Config) => {
  app.use(buster());
  let staticOptions = {};
  if (process.env.NODE_ENV === 'production') {
    staticOptions = { maxAge: '30d' };
  }
  app.use(express.static(path.join(__dirname, '..', '..', '..', 'public'), staticOptions));
  app.use(cookies(config));
  app.use(session());
};
