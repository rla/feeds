var async = require('async');
var fetch = require('./fetch');
var update = require('./db/update');
var db = require('./sqlite3');
var log = require('./log')(module);

// Updates all feeds in the database.

exports.update = function(cb) {
    async.waterfall([
        function(cb) {
            db.feeds(cb);
        },
        function(feeds, cb) {
            log('updating %s feeds', feeds.length);
            fetch(feeds, cb);
        },
        function(feeds, cb) {
            update(feeds, cb);
        }
    ], cb);
};