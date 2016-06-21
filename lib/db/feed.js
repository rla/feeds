var db = require('./db');
var uuid = require('node-uuid');
var debug = require('debug')('db:feed');

// Updates title.

exports.updateTitle = function(uuid, title, cb) {
    var st = db.prepare('UPDATE feed SET title = ? WHERE uuid = ?');
    st.run(title, uuid, cb);
};

// Adds new feed url.

exports.add = function(url, cb) {
    var st = db.prepare('INSERT INTO feed (uuid, url, title) VALUES (?, ?, ?)');
    st.run(uuid.v4(), url, url, cb);
};

// Reads all feeds from the database.

exports.all = function(cb) {
    var st = db.prepare('SELECT * FROM feed ORDER BY title ASC');
    st.all(cb);
};

// Reads all feeds with unread, important
// and unseen counts.

exports.allStat = function(start, count, cb) {
    var st = db.prepare('SELECT * FROM feed_with_stat' +
        ' ORDER BY unread DESC, title ASC LIMIT ? OFFSET ?');
    st.all([ count, start ], cb);
};

// Reads all invalid feeds.

exports.invalid = function(start, count, cb) {
    var st = db.prepare('SELECT * FROM feed WHERE error IS NOT NULL LIMIT ? OFFSET ?');
    st.all([ count, start ], cb);
};

// Deletes the given feed.

exports.remove = function(uuid, cb) {

    var st = db.prepare('DELETE FROM feed WHERE uuid = ?');
    st.run(uuid, cb);
};

// Marks feed as erroneous.

exports.mark = function(uuid, err, cb) {

    var st = db.prepare('UPDATE feed SET error = ? WHERE uuid = ?');
    st.run([ err, uuid ], cb);
};

// Clears errors from feeds.

exports.clearErrors = function(cb) {

    var st = db.prepare('UPDATE feed SET error = NULL');
    st.run(cb);
};

// Marks feed error as resolved.

exports.resolve = function(uuid, cb) {

    var st = db.prepare('UPDATE feed SET error = NULL WHERE uuid = ?');
    st.run(uuid, cb);
};