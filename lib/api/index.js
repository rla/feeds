var db = require('../sqlite3');
var log = require('../log')(module);
var config = require('../../config.json');

module.exports = function(app) {

    app.get('/feeds/:start/:count', function(req, res) {
        var start = parseInt(req.params.start, 10);
        var count = Math.min(parseInt(req.params.count, 10), 100);
        db.feedWithStat(start, count, respond(res, true));
    });

    app.get('/articles/:start/:count', function(req, res) {
        var start = parseInt(req.params.start, 10);
        var count = Math.min(parseInt(req.params.count, 10), 100);
        db.readArticles(start, count, respond(res, true));
    });

    app.get('/unread/:start/:count', function(req, res) {
        var start = parseInt(req.params.start, 10);
        var count = Math.min(parseInt(req.params.count, 10), 100);
        db.unreadArticles(start, count, respond(res, true));
    });

    app.get('/important/:start/:count', function(req, res) {
        var start = parseInt(req.params.start, 10);
        var count = Math.min(parseInt(req.params.count, 10), 100);
        db.important(start, count, respond(res, true));
    });

    app.get('/feed/:feed/:start/:count', function(req, res) {
        var feed = req.params.feed;
        var start = parseInt(req.params.start, 10);
        var count = Math.min(parseInt(req.params.count, 10), 100);
        db.articlesOfFeed(feed, start, count, respond(res, true));
    });

    app.get('/search/:query', function(req, res) {
        var query = req.params.query;
        var words = query.split(/ +/).map(function(word) {
            return word.replace(/%|_/, '');
        });
        db.searchArticlesByTitle(words, respond(res, true));
    });

    app.put('/article/:uuid/read', function(req, res) {
        var uuid = req.params.uuid;
        db.markRead(uuid, true, respond(res));
    });

    app.put('/article/:uuid/unread', function(req, res) {
        var uuid = req.params.uuid;
        db.markRead(uuid, false, respond(res));
    });

    app.put('/feed/:uuid/read', function(req, res) {
        var uuid = req.params.uuid;
        db.markFeedRead(uuid, respond(res));
    });

    app.put('/article/:uuid/important', function(req, res) {
        var uuid = req.params.uuid;
        db.markImportant(uuid, true, respond(res));
    });

    app.put('/article/:uuid/unimportant', function(req, res) {
        var uuid = req.params.uuid;
        db.markImportant(uuid, false, respond(res));
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

    // Helper to send response.
    // Returns closure for query callbacks.

    function respond(res, hasData) {
        return function(err, data) {
            if (err) {
                log(err);
                res.send(500);
            } else if (hasData && data) {
                res.send(data);
            } else {
                res.send(200);
            }
        };
    }
};