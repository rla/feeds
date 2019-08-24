import { Application } from 'express';
import api from './api';
import front from './front';
import { Database } from '../db';
import { Config } from '../readConfig';

/**
 * Sets up all application routes.
 */
export default (app: Application, config: Config, database: Database) => {
  api(app, config, database);
  front(app, config);
};
