import Cookies from 'cookies';
import { Request, Response, NextFunction } from 'express';
import { Config } from '../readConfig';

/**
 * Application-specific cookie handling.
 */
export default (config: Config) => {
  if (!config.sessionSecret) {
    throw new Error('Session key is not set.');
  }
  return (req: Request, res: Response, next: NextFunction) => {
    req.cookies = new Cookies(req, res, { keys: [config.sessionSecret] });
    next();
  };
};
