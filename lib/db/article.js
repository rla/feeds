var db = require('./db');
var uuid = require('node-uuid');
var async = require('async');

// All articles, sorted by published date.

exports.all = function(start, count, cb) {
    var sql = 'SELECT * FROM article_with_feed'
        + ' ORDER BY published DESC LIMIT ? OFFSET ?';
    db.all(sql, [ count, start ], cb);
};

// All unread articles, sorted by published date.

exports.unread = function(start, count, cb) {
    var sql = 'SELECT * FROM article_with_feed WHERE is_read = 0' +
        ' ORDER BY published DESC LIMIT ? OFFSET ?';
    db.all(sql, [ count, start ], cb);
};

// Retrieves unseen articles, sorted by published date.

exports.unseen = function(start, count, cb) {
    var sql = 'SELECT * FROM article_with_feed WHERE is_seen = 0' +
        ' ORDER BY published DESC LIMIT ? OFFSET ?';
    db.all(sql, [ count, start ], cb);
};

// Reads top important articles, sorted by published date.

exports.important = function(start, count, cb) {
    var sql = 'SELECT * FROM article_with_feed WHERE is_important = 1' +
        ' ORDER BY published DESC LIMIT ? OFFSET ?';
    db.all(sql, [ count, start ], cb);
};

// All articles from the given feed, sorted by published date.

exports.feed = function(feed, start, count, cb) {
    var sql = 'SELECT * FROM article_with_feed WHERE feed = ?' +
        ' ORDER BY published DESC LIMIT ? OFFSET ?';
    db.all(sql, [ feed, count, start ], cb);
};

// Searches articles by title.

exports.search = function(words, start, count, cb) {
    if (words.length === 0) {
        cb(null, []);
    } else {
        var params = words.map(function(word) { return '%' + word + '%'; });
        params.push(count);
        params.push(start);
        var conditions = words.map(function() { return 'title LIKE ?'; });
        var sql = 'SELECT * FROM article_with_feed WHERE ' + conditions.join(' AND ') +
            'ORDER BY is_important DESC, published DESC LIMIT ? OFFSET ?';
        db.all(sql, params, cb);
    }
};

// Marks article read. Automatically marks it
// seen too.

var markRead = db.prepare('UPDATE article SET is_read = ? WHERE uuid = ?');

exports.markRead = function(uuid, read, cb) {
    async.series([
        function(cb) {
            markRead.run(read ? 1 : 0, uuid, cb);
        },
        function(cb) {
            if (read) {
                markSeen.run(1, uuid, cb);
            } else {
                cb();
            }
        }
    ], cb);
};

// Marks feed read.

var markFeedRead = db.prepare('UPDATE article SET is_read = 1 WHERE feed = ?');

exports.markFeedRead = function(uuid, cb) {
    markFeedRead.run(uuid, cb);
};

// Marks article seen.

var markFeedSeen = db.prepare('UPDATE article SET is_seen = 1 WHERE feed = ?');

exports.markFeedSeen = function(uuid, cb) {
    markFeedSeen.run(uuid, cb);
};

// Marks article important.

var markImportant = db.prepare('UPDATE article SET is_important = ? WHERE uuid = ?');

exports.markImportant = function(uuid, important, cb) {
    markImportant.run(important ? 1 : 0, uuid, cb);
};

// Marks article gplussed.

var markGplussed = db.prepare('UPDATE article SET is_gplussed = 1 WHERE uuid = ?');

exports.markGplussed = function(uuid, cb) {
    markGplussed.run(uuid, cb);
};

// Marks all given articles as seen.
// FIXME do in a transaction.

var markSeen = db.prepare('UPDATE article SET is_seen = ? WHERE uuid = ?');

exports.markSeen = function(uuids, cb) {
    async.eachSeries(uuids, function(uuid, cb) {
        markSeen.run(1, uuid, cb);
    }, cb);
};
