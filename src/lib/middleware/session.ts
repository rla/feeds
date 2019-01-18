import {
    Request,
    Response,
    NextFunction
} from 'express';
import { AppRequest } from '../express';

// Helper middleware to clear/set session.
// Base options for setting cookies.

const BASE_OPTIONS = {
    secure: false,
    httpOnly: true,
    overwrite: true
};

const options = (customize: object) => {
    return Object.assign({}, BASE_OPTIONS, customize);
};

export default () => {
    return (req: Request, res: Response, next: NextFunction) => {
        (req as AppRequest).setAuthenticated = (value: boolean) => {
            if (value) {
                req.cookies.set('authenticated', 'OK', options({ signed: true }));
            } else {
                req.cookies.set('authenticated', null, options({ signed: true }));
            }
        };
        (req as AppRequest).isAuthenticated = () => {
            const authenticated = req.cookies.get(
                'authenticated', { signed: true });
            return authenticated === 'OK';
        };
        next();
    };
};
