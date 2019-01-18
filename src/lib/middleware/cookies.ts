import Cookies from 'cookies';
import {
    Request,
    Response,
    NextFunction
} from 'express';
import config from '../config';

// Application-specific cookie handling.

if (!config.sessionSecret) {
    throw new Error('Session key is not set.');
}

export default () => {
    return (req: Request, res: Response, next: NextFunction) => {
        req.cookies = new Cookies(req, res, { keys: [ config.sessionSecret ] });
        next();
    };
};
