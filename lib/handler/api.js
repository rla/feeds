var async = require('async');
var feed = require('../db/feed');
var article = require('../db/article');
var config = require('../../config.json');
var bodyParser = require('body-parser');

module.exports = function(app) {

    // Responds feeds, no authentication.

    app.get('/feeds/:start/:count', function(req, res) {
        var start = parseInt(req.params.start, 10);
        var count = Math.min(parseInt(req.params.count, 10), 100);
        feed.allStat(start, count, respond(res, true));
    });

    // Responds invalid feeds, no authentication.

    app.get('/invalid/:start/:count', function(req, res) {
        var start = parseInt(req.params.start, 10);
        var count = Math.min(parseInt(req.params.count, 10), 100);
        feed.invalid(start, count, respond(res, true));
    });

    // Responds all articles, no authentication.

    app.get('/articles/:rowid/:count', function(req, res) {
        var rowid = parseInt(req.params.rowid, 10);
        var count = Math.min(parseInt(req.params.count, 10), 100);
        article.all(rowid, count, respond(res, true));
    });

    // Responds unread articles, no authentication.

    app.get('/unread/:rowid/:count', function(req, res) {
        var rowid = parseInt(req.params.rowid, 10);
        var count = Math.min(parseInt(req.params.count, 10), 100);
        article.unread(rowid, count, respond(res, true));
    });

    // Responds unseen articles, no authentication.

    app.get('/unseen/:rowid/:count', function(req, res) {
        var rowid = parseInt(req.params.rowid, 10);
        var count = Math.min(parseInt(req.params.count, 10), 100);
        article.unseen(rowid, count, respond(res, true));
    });

    // Responds important articles, no authentication.

    app.get('/important/:rowid/:count', function(req, res) {
        var rowid = parseInt(req.params.rowid, 10);
        var count = Math.min(parseInt(req.params.count, 10), 100);
        article.important(rowid, count, respond(res, true));
    });

    // Responds feed articles, no authentication.

    app.get('/feed/:uuid/:rowid/:count', function(req, res) {
        var uuid = req.params.uuid;
        var rowid = parseInt(req.params.rowid, 10);
        var count = Math.min(parseInt(req.params.count, 10), 100);
        article.feed(uuid, rowid, count, respond(res, true));
    });

    // Responds search results, no authentication.

    app.get('/search/:query/:rowid/:count', function(req, res) {
        var query = req.params.query;
        var rowid = parseInt(req.params.rowid, 10);
        var count = Math.min(parseInt(req.params.count, 10), 100);
        var words = query.split(/ +/).map(function(word) {
            return word.replace(/%|_/, '');
        });
        article.search(words, rowid, count, respond(res, true));
    });

    // Marks article read, requires authentication.

    app.put('/article/:uuid/read', authed, function(req, res) {
        var uuid = req.params.uuid;
        article.markRead(uuid, true, respond(res));
    });

    // Marks article unread, requires authentication.

    app.put('/article/:uuid/unread', authed, function(req, res) {
        var uuid = req.params.uuid;
        article.markRead(uuid, false, respond(res));
    });

    // Marks all feed articles read, requires authentication.

    app.put('/feed/:uuid/read', authed, function(req, res) {
        var uuid = req.params.uuid;
        article.markFeedRead(uuid, respond(res));
    });

    // Marks all feed articles seen, requires authentication.

    app.put('/feed/:uuid/seen', authed, function(req, res) {
        var uuid = req.params.uuid;
        article.markFeedSeen(uuid, respond(res));
    });

    // Marks article important, requires authentication.

    app.put('/article/:uuid/important', authed, function(req, res) {
        var uuid = req.params.uuid;
        article.markImportant(uuid, true, respond(res));
    });

    // Marks article unimportant, requires authentication.

    app.put('/article/:uuid/unimportant', authed, function(req, res) {
        var uuid = req.params.uuid;
        article.markImportant(uuid, false, respond(res));
    });

    // Marks batch of articles seen.
    // Needs JSON array of article uuids.

    app.put('/seen', [authed, bodyParser.json()], function(req, res) {
        var uuids = req.body;
        article.markSeen(uuids, respond(res));
    });

    // Deletes the given feed.
    // Requires authentication.

    app.delete('/feed/:uuid', authed, function(req, res) {
        var uuid = req.params.uuid;
        async.series([
            // Remove feed articles.
            function(cb) {
                article.removeFeed(uuid, cb);
            },
            // Remove feed itself.
            function(cb) {
                feed.remove(uuid, cb);
            }
        ], respond(res));
    });

    // Marks given feed error resolved.
    // Requires authentication.

    app.put('/feed/:uuid/resolve', authed, function(req, res) {
        var uuid = req.params.uuid;
        feed.resolve(uuid, respond(res));
    });

    // Adds all given feed URLs.
    // Requires authentication.

    app.post('/urls', [bodyParser.json(), authed], function(req, res) {
        const urls = req.body;
        feed.addAll(urls, respond(res));
    });

    // Authenticates and sets cookie for identification.

    app.post('/login', bodyParser.json(), function(req, res) {
        var user = req.body.user;
        var pass = req.body.pass;
        var users = config.auth;
        var ok = users.some(function(u) {
            return u.user === user && u.pass === pass;
        });
        if (ok) {
            req.setAuthenticated(true);
            respond(res, true)(null, { ok: true });
        } else {
            respond(res, true)(null, { ok: false });
        }
    });

    // Deauthenticates the user.

    app.post('/logout', function(req, res) {
        req.setAuthenticated(false);
        respond(res, true)(null, {});
    });

    // Middleware for API calls to check
    // that the user has been authenticated.

    function authed(req, res, next) {
        if (req.isAuthenticated()) {
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
                console.error(err);
                res.send(500);
            } else if (hasData && data) {
                res.send({ error: false, data: data });
            } else {
                res.send({});
            }
        };
    }
};
