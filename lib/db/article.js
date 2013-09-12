var db = require('./db');
var uuid = require('node-uuid');
var async = require('async');
var debug = require('debug')('db:article');

// Saves a new article.

exports.save = function(article, cb) {

    var st = db.prepare('INSERT INTO article' +
        ' (uuid, feed, id, title, link, published, fetch_time)' +
        ' VALUES (?, ?, ?, ?, ?, ?, ?)');

    // Use current date in case of invalid date.

    if (isNaN(article.date.getTime())) {

        article.date = new Date();
    }

    // Uses UNIX timestamps.

    var published = Math.floor(article.date.getTime() / 1000);
    var fetchTime = Math.floor(Date.now() / 1000);

    st.run(uuid.v4(), article.feedUuid, article.id, article.title, article.link,
        published, fetchTime, cb);
};

// All articles, sorted by published date.

exports.all = function(start, count, cb) {
    var st = db.prepare('SELECT * FROM article_with_feed' +
        ' ORDER BY published DESC LIMIT ? OFFSET ?');
    st.all([ count, start ], cb);
};

// All unread articles, sorted by published date.

exports.unread = function(start, count, cb) {
    var st = db.prepare('SELECT * FROM article_with_feed WHERE is_read = 0' +
        ' ORDER BY published DESC LIMIT ? OFFSET ?');
    st.all([ count, start ], cb);
};

// Retrieves unseen articles, sorted by published date.

exports.unseen = function(start, count, cb) {
    var st = db.prepare('SELECT * FROM article_with_feed WHERE is_seen = 0' +
        ' ORDER BY published DESC LIMIT ? OFFSET ?');
    st.all([ count, start ], cb);
};

// Reads top important articles, sorted by published date.

exports.important = function(start, count, cb) {
    var st = db.prepare('SELECT * FROM article_with_feed WHERE is_important = 1' +
        ' ORDER BY published DESC LIMIT ? OFFSET ?');
    st.all([ count, start ], cb);
};

// All articles from the given feed, sorted by published date.

exports.feed = function(feed, start, count, cb) {
    var st = db.prepare('SELECT * FROM article_with_feed WHERE feed = ?' +
        ' ORDER BY published DESC LIMIT ? OFFSET ?');
    st.all([ feed, count, start ], cb);
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
        var st = db.prepare('SELECT * FROM article_with_feed WHERE ' + conditions.join(' AND ') +
            'ORDER BY is_important DESC, published DESC LIMIT ? OFFSET ?');
        st.all(params, cb);
    }
};

// Marks article read. Automatically marks it
// seen too.

exports.markRead = function(uuid, read, cb) {

    var stRead = db.prepare('UPDATE article SET is_read = ? WHERE uuid = ?');
    var stSeen = db.prepare('UPDATE article SET is_seen = ? WHERE uuid = ?');

    async.series([
        function(cb) {
            stRead.run(read ? 1 : 0, uuid, cb);
        },
        function(cb) {
            if (read) {
                stSeen.run(1, uuid, cb);
            } else {
                cb();
            }
        }
    ], cb);
};

// Marks feed read.



exports.markFeedRead = function(uuid, cb) {

    var st = db.prepare('UPDATE article SET is_read = 1 WHERE feed = ?');
    st.run(uuid, cb);
};

// Marks article seen.

exports.markFeedSeen = function(uuid, cb) {

    var st = db.prepare('UPDATE article SET is_seen = 1 WHERE feed = ?');
    st.run(uuid, cb);
};

// Marks article important.

exports.markImportant = function(uuid, important, cb) {

    var st = db.prepare('UPDATE article SET is_important = ? WHERE uuid = ?');
    st.run(important ? 1 : 0, uuid, cb);
};

// Marks article gplussed.

exports.markGplussed = function(uuid, cb) {

    var st = db.prepare('UPDATE article SET is_gplussed = 1 WHERE uuid = ?');
    st.run(uuid, cb);
};

// Marks all given articles as seen.

exports.markSeen = function(uuids, cb) {

    var st = db.prepare('UPDATE article SET is_seen = ? WHERE uuid = ?');
    var tx = db.tx();

    uuids.forEach(function(uuid) {

        tx.run(function(cb) {

            st.run(1, uuid, cb);
        });
    });

    tx.execute(cb);
};

// Removes all articles of the given feed.

exports.removeFeed = function(uuid, cb) {

    var st = db.prepare('DELETE FROM article WHERE feed = ?');
    st.run(uuid, cb);
};
