var db = require('../sqlite3');
var log = require('../log')(module);
var config = require('../../config.json');

module.exports = function(app) {

    // Responds feeds, no authentication.

    app.get('/feeds/:start/:count', function(req, res) {
        var start = parseInt(req.params.start, 10);
        var count = Math.min(parseInt(req.params.count, 10), 100);
        db.feedWithStat(start, count, respond(res, true));
    });

    // Responds all articles, no authentication.

    app.get('/articles/:start/:count', function(req, res) {
        var start = parseInt(req.params.start, 10);
        var count = Math.min(parseInt(req.params.count, 10), 100);
        db.readArticles(start, count, respond(res, true));
    });

    // Responds unread articles, no authentication.

    app.get('/unread/:start/:count', function(req, res) {
        var start = parseInt(req.params.start, 10);
        var count = Math.min(parseInt(req.params.count, 10), 100);
        db.unreadArticles(start, count, respond(res, true));
    });

    // Responds unseen articles, no authentication.

    app.get('/unseen/:start/:count', function(req, res) {
        var start = parseInt(req.params.start, 10);
        var count = Math.min(parseInt(req.params.count, 10), 100);
        db.unseen(start, count, respond(res, true));
    });

    // Responds important articles, no authentication.

    app.get('/important/:start/:count', function(req, res) {
        var start = parseInt(req.params.start, 10);
        var count = Math.min(parseInt(req.params.count, 10), 100);
        db.important(start, count, respond(res, true));
    });

    // Responds feed articles, no authentication.

    app.get('/feed/:feed/:start/:count', function(req, res) {
        var feed = req.params.feed;
        var start = parseInt(req.params.start, 10);
        var count = Math.min(parseInt(req.params.count, 10), 100);
        db.articlesOfFeed(feed, start, count, respond(res, true));
    });

    // Responds search results, no authentication.

    app.get('/search/:query/:start/:count', function(req, res) {
        var query = req.params.query;
        var start = parseInt(req.params.start, 10);
        var count = Math.min(parseInt(req.params.count, 10), 100);
        var words = query.split(/ +/).map(function(word) {
            return word.replace(/%|_/, '');
        });
        db.search(words, start, count, respond(res, true));
    });

    // Marks article read, requires authentication.

    app.put('/article/:uuid/read', authed, function(req, res) {
        var uuid = req.params.uuid;
        db.markRead(uuid, true, respond(res));
    });

    // Marks article unread, requires authentication.

    app.put('/article/:uuid/unread', authed, function(req, res) {
        var uuid = req.params.uuid;
        db.markRead(uuid, false, respond(res));
    });

    // Marks all feed articles read, requires authentication.

    app.put('/feed/:uuid/read', authed, function(req, res) {
        var uuid = req.params.uuid;
        db.markFeedRead(uuid, respond(res));
    });

    // Marks all feed articles seen, requires authentication.

    app.put('/feed/:uuid/read', authed, function(req, res) {
        var uuid = req.params.uuid;
        db.markFeedSeen(uuid, respond(res));
    });

    // Marks article important, requires authentication.

    app.put('/article/:uuid/important', authed, function(req, res) {
        var uuid = req.params.uuid;
        db.markImportant(uuid, true, respond(res));
    });

    // Marks article unimportant, requires authentication.

    app.put('/article/:uuid/unimportant', authed, function(req, res) {
        var uuid = req.params.uuid;
        db.markImportant(uuid, false, respond(res));
    });

    // Marks batch of articles seen.
    // Needs JSON array of article uuids.

    app.put('/seen', authed, function(req, res) {
        var uuids = req.body;
        db.markSeen(uuids, respond(res));
    });

    // Authenticates and sets cookie for identification.

    app.post('/login', function(req, res) {
        var user = req.body.user;
        var pass = req.body.pass;
        var users = config.auth;
        var ok = users.some(function(u) {
            return u.user === user && u.pass === pass;
        });
        if (ok) {
            req.session.ok = true;
            respond(res, true)(null, { ok: true });
        } else {
            respond(res, true)(null, { ok: false });
        }
    });

    // Deauthenticates the user.

    app.post('/logout', function(req, res) {
        req.session.ok = null;
        respond(res, true)(null, {});
    });

    // Middleware for API calls to check
    // that the user has been authenticated.

    function authed(req, res, next) {
        if (req.session.ok) {
            next();
        } else {
            res.send({ error: true, data: 'unauthorized' });
        }
    }

    // Helper to send response.
    // Returns closure for query callbacks.

    function respond(res, hasData) {
        return function(err, data) {
            if (err) {
                log(err);
                res.send(500);
            } else if (hasData && data) {
                res.send({ error: false, data: data });
            } else {
                res.send(200);
            }
        };
    }
};