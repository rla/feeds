import {
    Request,
    Response,
    NextFunction
} from 'express';

// Rewrites the URL by stripping the version prefix.

export default () => {
    return (req: Request, res: Response, next: NextFunction) => {
        const rewritten = req.url.replace(/^\/v\-\d+\.\d+\.\d+/, '');
        if (req.url.length !== rewritten.length) {
            req.url = rewritten;
        }
        next();
    };
};
