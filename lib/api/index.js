var db = require('../sqlite3');
var log = require('../log')(module);

module.exports = function(app) {

    app.get('/feeds/:start/:count', function(req, res) {
        var start = parseInt(req.params.start, 10);
        var count = parseInt(req.params.count, 10);
        db.feedWithStat(start, count, function(err, feeds) {
            if (err) {
                log(err);
                res.send(500);
            } else {
                res.send(feeds);
            }
        });
    });

    app.get('/articles/:start/:count', function(req, res) {
        var start = parseInt(req.params.start, 10);
        var count = parseInt(req.params.count, 10);
        db.readArticles(start, count, function(err, articles) {
            if (err) {
                log(err);
                res.send(500);
            } else {
                res.send(articles);
            }
        });
    });

    app.get('/unread/:start/:count', function(req, res) {
        var start = parseInt(req.params.start, 10);
        var count = parseInt(req.params.count, 10);
        db.unreadArticles(start, count, function(err, articles) {
            if (err) {
                log(err);
                res.send(500);
            } else {
                res.send(articles);
            }
        });
    });

    app.get('/important/:start/:count', function(req, res) {
        var start = parseInt(req.params.start, 10);
        var count = parseInt(req.params.count, 10);
        db.important(start, count, function(err, articles) {
            if (err) {
                log(err);
                res.send(500);
            } else {
                res.send(articles);
            }
        });
    });

    app.get('/feed/:feed/:start/:count', function(req, res) {
        var feed = req.params.feed;
        var start = parseInt(req.params.start, 10);
        var count = parseInt(req.params.count, 10);
        db.articlesOfFeed(feed, start, count, function(err, articles) {
            if (err) {
                log(err);
                res.send(500);
            } else {
                res.send(articles);
            }
        });
    });

    app.get('/search/:query', function(req, res) {
        var query = req.params.query;
        var words = query.split(/ +/).map(function(word) {
            return word.replace(/%|_/, '');
        });
        db.searchArticles(words, function(err, articles) {
            if (err) {
                log(err);
                res.send(500);
            } else {
                res.send(articles);
            }
        });
    });

    app.get('/search-by-title/:query', function(req, res) {
        var query = req.params.query;
        var words = query.split(/ +/).map(function(word) {
            return word.replace(/%|_/, '');
        });
        db.searchArticlesByTitle(words, function(err, articles) {
            if (err) {
                log(err);
                res.send(500);
            } else {
                res.send(articles);
            }
        });
    });

    app.put('/article/:uuid/read', function(req, res) {
        var uuid = req.params.uuid;
        db.markRead(uuid, true, function(err) {
            if (err) {
                log(err);
                res.send(500);
            } else {
                res.send(200);
            }
        });
    });

    app.put('/article/:uuid/unread', function(req, res) {
        var uuid = req.params.uuid;
        db.markRead(uuid, false, function(err) {
            if (err) {
                log(err);
                res.send(500);
            } else {
                res.send(200);
            }
        });
    });

    app.put('/feed/:uuid/read', function(req, res) {
        var uuid = req.params.uuid;
        db.markFeedRead(uuid, function(err) {
            if (err) {
                log(err);
                res.send(500);
            } else {
                res.send(200);
            }
        });
    });

    app.put('/article/:uuid/important', function(req, res) {
        var uuid = req.params.uuid;
        db.markImportant(uuid, true, function(err) {
            if (err) {
                log(err);
                res.send(500);
            } else {
                res.send(200);
            }
        });
    });

    app.put('/article/:uuid/unimportant', function(req, res) {
        var uuid = req.params.uuid;
        db.markImportant(uuid, false, function(err) {
            if (err) {
                log(err);
                res.send(500);
            } else {
                res.send(200);
            }
        });
    });
};