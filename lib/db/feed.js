var db = require('./db');
var uuid = require('node-uuid');

var add = db.prepare('INSERT INTO feed (uuid, url, title) VALUES (?, ?, ?)');

// Adds new feed url.

exports.add = function(url, cb) {
    add.run(uuid.v4(), url, url, cb);
};