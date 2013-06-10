var sqlite3 = require('sqlite3');
var uuid = require('node-uuid');
var config = require('../config.json');
var log = require('./log')(module);

log('opening database %s', config.db);

var read = new sqlite3.Database(config.db);

var saveFeed = read.prepare('INSERT INTO feed (url, title, uuid) VALUES (?, ?, ?)');
var markRead = read.prepare('UPDATE article SET is_read = ? WHERE uuid = ?');
var markFeedRead = read.prepare('UPDATE article SET is_read = 1 WHERE feed = ?');
var markImportant = read.prepare('UPDATE article SET is_important = ? WHERE uuid = ?');

// Reads all feeds from the database.

exports.feeds = function(cb) {
    var sql = 'SELECT * FROM feed ORDER BY title';
    read.all(sql, cb);
};

exports.feedWithStat = function(start, count, cb) {
    var sql = 'SELECT * FROM feed_with_stat' +
        ' ORDER BY unread DESC LIMIT ? OFFSET ?';
    read.all(sql, [ count, start ], cb);
};

// Reads top articles.

exports.readArticles = function(start, count, cb) {
    var sql = 'SELECT * FROM article_with_feed ORDER BY published DESC LIMIT ? OFFSET ?';
    read.all(sql, [ count, start ], cb);
};

exports.unreadArticles = function(start, count, cb) {
    var sql = 'SELECT * FROM article_with_feed WHERE is_read = 0 ORDER BY published DESC LIMIT ? OFFSET ?';
    read.all(sql, [ count, start ], cb);
};

exports.articlesOfFeed = function(feed, start, count, cb) {
    var sql = 'SELECT * FROM article_with_feed WHERE feed = ? ORDER BY published DESC LIMIT ? OFFSET ?';
    read.all(sql, [ feed, count, start ], cb);
};

// Reads top important articles.

exports.important = function(start, count, cb) {
    var sql = 'SELECT * FROM article_with_feed WHERE is_important = 1 ORDER BY published DESC LIMIT ? OFFSET ?';
    read.all(sql, [ count, start ], cb);
};

exports.searchArticles = function(words, cb) {
    if (words.length === 0) {
        cb(null, []);
    } else {
        var conditions = words.map(function() { return 'content LIKE ?'; });
        var sql = 'SELECT * FROM article WHERE ' +
            conditions.join(' AND ') + ' LIMIT 100';
        read.all(sql, words.map(function(word) { return '%' + word + '%'; }), cb);
    }
};

exports.searchArticlesByTitle = function(words, cb) {
    if (words.length === 0) {
        cb(null, []);
    } else {
        var conditions = words.map(function() { return 'title LIKE ?'; });
        var sql = 'SELECT * FROM article WHERE ' +
            conditions.join(' AND ') + ' LIMIT 1000';
        read.all(sql, words.map(function(word) { return '%' + word + '%'; }), cb);
    }
};

exports.markRead = function(uuid, read, cb) {
    markRead.run(read ? 1 : 0, uuid, cb);
};

exports.markFeedRead = function(uuid, cb) {
    markFeedRead.run(uuid, cb);
};

exports.markImportant = function(uuid, important, cb) {
    markImportant.run(important ? 1 : 0, uuid, cb);
};