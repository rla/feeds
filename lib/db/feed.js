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