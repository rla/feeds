"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const articleRepo = __importStar(require("../repo/article"));
const feedRepo = __importStar(require("../repo/feed"));
/**
 * Middleware for API calls to check
 * that the user has been authenticated.
 */
const authed = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.send({ error: true, data: 'unauthorized' });
    }
};
/**
 * Injects API routes into the application.
 */
exports.default = (app, config, database) => {
    /**
     * Wrapper around route handlers to provide async/await support.
     *
     */
    const api = (fn) => {
        return async (req, res) => {
            try {
                const data = await database.transaction(tx => fn(req, tx));
                res.send({ error: false, data });
            }
            catch (err) {
                console.error(err);
                res.sendStatus(500);
            }
        };
    };
    /**
     * Permits anonymous readonly access but only when allowed in configuration.
     */
    const anonymousReadonly = (req, res, next) => {
        if (config.allowAnonymousReadonly) {
            next();
        }
        else {
            if (req.isAuthenticated()) {
                next();
            }
            else {
                res.send({ error: true, data: 'unauthorized' });
            }
        }
    };
    // Responds feeds, no authentication.
    app.get('/feeds/:start/:count', anonymousReadonly, api(async (req, tx) => {
        const start = parseInt(req.params.start, 10);
        const count = Math.min(parseInt(req.params.count, 10), 100);
        return feedRepo.allStat(tx, start, count);
    }));
    // Responds invalid feeds, no authentication.
    app.get('/invalid/:start/:count', anonymousReadonly, api(async (req, tx) => {
        const start = parseInt(req.params.start, 10);
        const count = Math.min(parseInt(req.params.count, 10), 100);
        return feedRepo.invalid(tx, start, count);
    }));
    // Responds all articles, no authentication.
    app.get('/articles/:rowid/:count', anonymousReadonly, api(async (req, tx) => {
        const rowid = parseInt(req.params.rowid, 10);
        const count = Math.min(parseInt(req.params.count, 10), 100);
        return articleRepo.all(tx, rowid, count);
    }));
    // Responds unread articles, no authentication.
    app.get('/unread/:rowid/:count', anonymousReadonly, api(async (req, tx) => {
        const rowid = parseInt(req.params.rowid, 10);
        const count = Math.min(parseInt(req.params.count, 10), 100);
        return articleRepo.unread(tx, rowid, count);
    }));
    // Responds unseen articles, no authentication.
    app.get('/unseen/:rowid/:count', anonymousReadonly, api(async (req, tx) => {
        const rowid = parseInt(req.params.rowid, 10);
        const count = Math.min(parseInt(req.params.count, 10), 100);
        return articleRepo.unseen(tx, rowid, count);
    }));
    // Responds important articles, no authentication.
    app.get('/important/:rowid/:count', anonymousReadonly, api(async (req, tx) => {
        const rowid = parseInt(req.params.rowid, 10);
        const count = Math.min(parseInt(req.params.count, 10), 100);
        return articleRepo.important(tx, rowid, count);
    }));
    // Responds feed articles, no authentication.
    app.get('/feed/:uuid/:rowid/:count', anonymousReadonly, api(async (req, tx) => {
        const uuid = req.params.uuid;
        const rowid = parseInt(req.params.rowid, 10);
        const count = Math.min(parseInt(req.params.count, 10), 100);
        return articleRepo.feed(tx, uuid, rowid, count);
    }));
    // Responds search results, no authentication.
    app.get('/search/:query/:rowid/:count', anonymousReadonly, api(async (req, tx) => {
        const query = req.params.query;
        const rowid = parseInt(req.params.rowid, 10);
        const count = Math.min(parseInt(req.params.count, 10), 100);
        const words = query.split(/ +/).map(word => {
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
    app.put('/seen', authed, body_parser_1.default.json(), api(async (req, tx) => {
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
    app.post('/urls', authed, body_parser_1.default.json(), api(async (req, tx) => {
        const urls = req.body;
        return feedRepo.addAll(tx, urls);
    }));
    // Authenticates and sets cookie for identification.
    app.post('/login', body_parser_1.default.json(), api(async (req) => {
        const user = req.body.user;
        const pass = req.body.pass;
        const users = config.auth;
        const ok = users.some(u => {
            return u.user === user && u.pass === pass;
        });
        if (ok) {
            req.setAuthenticated(true);
            return { ok: true };
        }
        else {
            return { ok: false };
        }
    }));
    // Deauthenticates the user.
    app.post('/logout', api(async (req) => {
        req.setAuthenticated(false);
    }));
};
//# sourceMappingURL=api.js.map