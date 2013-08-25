var db = require('./db');
var uuid = require('node-uuid');

// Adds new feed url.

var add = db.prepare('INSERT INTO feed (uuid, url, title) VALUES (?, ?, ?)');

exports.add = function(url, cb) {
    add.run(uuid.v4(), url, url, cb);
};

// Reads all feeds from the database.

exports.all = function(cb) {
    var sql = 'SELECT * FROM feed ORDER BY title';
    db.all(sql, cb);
};

// Reads all feeds with unread, important
// and unseen counts.

exports.allStat = function(start, count, cb) {
    var sql = 'SELECT * FROM feed_with_stat' +
        ' ORDER BY unread DESC LIMIT ? OFFSET ?';
    db.all(sql, [ count, start ], cb);
};

// Reads all invalid feeds.

exports.invalid = function(start, count, cb) {
    var sql = 'SELECT * FROM feed WHERE error IS NOT NULL LIMIT ? OFFSET ?';
    db.all(sql, [ count, start ], cb);
};

var remove = db.prepare('DELETE FROM feed WHERE uuid = ?');

// Deletes the given feed.

exports.remove = function(uuid, cb) {

    remove.run(uuid, cb);
};

// Marks feed as erroneous. Completely async.

var mark = db.prepare('UPDATE feed SET error = ? WHERE uuid = ?');

exports.mark = function(uuid, err) {

    mark.run(err.message, uuid);
};

// Marks feed error as resolved.

var resolve = db.prepare('UPDATE feed SET error = NULL WHERE uuid = ?');

exports.resolve = function(uuid, cb) {

    resolve.run(uuid, cb);
};