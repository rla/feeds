import bodyParser from 'body-parser';
import {
    Application,
    NextFunction,
    Response
} from 'express';
import { AppRequest } from '../express';
import { Config } from '../readConfig';
import * as articleRepo from '../repo/article';
import * as feedRepo from '../repo/feed';
import { Database, Transaction } from '../db';

// tslint:disable-next-line: no-any
type ApiHandler = (req: AppRequest, tx: Transaction) => Promise<any>;

/**
 * Middleware for API calls to check
 * that the user has been authenticated.
 */
const authed = (req: AppRequest, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.send({ error: true, data: 'unauthorized' });
    }
};

/**
 * Injects API routes into the application.
 */
export default (app: Application, config: Config, database: Database) => {

    /**
     * Wrapper around route handlers to provide async/await support.
     *
     */
    const api = (fn: ApiHandler) => {
        return async (req: AppRequest, res: Response) => {
            try {
                const data = await database.transaction((tx) => fn(req, tx));
                res.send({ error: false, data });
            } catch (err) {
                console.error(err);
                res.sendStatus(500);
            }
        };
    };

    // Responds feeds, no authentication.

    app.get('/feeds/:start/:count', api(async (req, tx) => {
        const start = parseInt(req.params.start, 10);
        const count = Math.min(parseInt(req.params.count, 10), 100);
        return feedRepo.allStat(tx, start, count);
    }));

    // Responds invalid feeds, no authentication.

    app.get('/invalid/:start/:count', api(async (req, tx) => {
        const start = parseInt(req.params.start, 10);
        const count = Math.min(parseInt(req.params.count, 10), 100);
        return feedRepo.invalid(tx, start, count);
    }));

    // Responds all articles, no authentication.

    app.get('/articles/:rowid/:count', api(async (req, tx) => {
        const rowid = parseInt(req.params.rowid, 10);
        const count = Math.min(parseInt(req.params.count, 10), 100);
        return articleRepo.all(tx, rowid, count);
    }));

    // Responds unread articles, no authentication.

    app.get('/unread/:rowid/:count', api(async (req, tx) => {
        const rowid = parseInt(req.params.rowid, 10);
        const count = Math.min(parseInt(req.params.count, 10), 100);
        return articleRepo.unread(tx, rowid, count);
    }));

    // Responds unseen articles, no authentication.

    app.get('/unseen/:rowid/:count', api(async (req, tx) => {
        const rowid = parseInt(req.params.rowid, 10);
        const count = Math.min(parseInt(req.params.count, 10), 100);
        return articleRepo.unseen(tx, rowid, count);
    }));

    // Responds important articles, no authentication.

    app.get('/important/:rowid/:count', api(async (req, tx) => {
        const rowid = parseInt(req.params.rowid, 10);
        const count = Math.min(parseInt(req.params.count, 10), 100);
        return articleRepo.important(tx, rowid, count);
    }));

    // Responds feed articles, no authentication.

    app.get('/feed/:uuid/:rowid/:count', api(async (req, tx) => {
        const uuid = req.params.uuid;
        const rowid = parseInt(req.params.rowid, 10);
        const count = Math.min(parseInt(req.params.count, 10), 100);
        return articleRepo.feed(tx, uuid, rowid, count);
    }));

    // Responds search results, no authentication.

    app.get('/search/:query/:rowid/:count', api(async (req, tx) => {
        const query = req.params.query as string;
        const rowid = parseInt(req.params.rowid, 10);
        const count = Math.min(parseInt(req.params.count, 10), 100);
        const words = query.split(/ +/).map((word) => {
            return word.replace(/%|_/, '');
        });
        return articleRepo.search(tx, words, rowid, count);
    }));

    // Marks article read, requires authentication.

    app.put('/article/:uuid/read', authed, api(async (req, tx) => {
        const uuid = req.params.uuid;
        return articleRepo.markRead(tx, uuid, true);
    }));

    // Marks article unread, requires authentication.

    app.put('/article/:uuid/unread', authed, api(async (req, tx) => {
        const uuid = req.params.uuid;
        return articleRepo.markRead(tx, uuid, false);
    }));

    // Marks all feed articles read, requires authentication.

    app.put('/feed/:uuid/read', authed, api(async (req, tx) => {
        const uuid = req.params.uuid;
        return articleRepo.markFeedRead(tx, uuid);
    }));

    // Marks all feed articles seen, requires authentication.

    app.put('/feed/:uuid/seen', authed, api(async (req, tx) => {
        const uuid = req.params.uuid;
        return articleRepo.markFeedSeen(tx, uuid);
    }));

    // Marks article important, requires authentication.

    app.put('/article/:uuid/important', authed, api(async (req, tx) => {
        const uuid = req.params.uuid;
        return articleRepo.markImportant(tx, uuid, true);
    }));

    // Marks article unimportant, requires authentication.

    app.put('/article/:uuid/unimportant', authed, api(async (req, tx) => {
        const uuid = req.params.uuid;
        return articleRepo.markImportant(tx, uuid, false);
    }));

    // Marks batch of articles seen.
    // Needs JSON array of article uuids.

    app.put('/seen', authed, bodyParser.json(), api(async (req, tx) => {
        const uuids = req.body;
        return articleRepo.markSeen(tx, uuids);
    }));

    // Deletes the given feed.
    // Requires authentication.

    app.delete('/feed/:uuid', authed, api(async (req, tx) => {
        const uuid = req.params.uuid;
        await articleRepo.removeFeed(tx, uuid);
        await feedRepo.remove(tx, uuid);
    }));

    // Marks given feed error resolved.
    // Requires authentication.

    app.put('/feed/:uuid/resolve', authed, api(async (req, tx) => {
        const uuid = req.params.uuid;
        return feedRepo.resolve(tx, uuid);
    }));

    // Adds all given feed URLs.
    // Requires authentication.

    app.post('/urls', authed, bodyParser.json(), api(async (req, tx) => {
        const urls = req.body;
        return feedRepo.addAll(tx, urls);
    }));

    // Authenticates and sets cookie for identification.

    app.post('/login', bodyParser.json(), api(async (req) => {
        const user = req.body.user;
        const pass = req.body.pass;
        const users = config.auth;
        const ok = users.some((u) => {
            return u.user === user && u.pass === pass;
        });
        if (ok) {
            req.setAuthenticated(true);
            return { ok: true };
        } else {
            return { ok: false };
        }
    }));

    // Deauthenticates the user.

    app.post('/logout', api(async (req) => {
        req.setAuthenticated(false);
    }));
};
