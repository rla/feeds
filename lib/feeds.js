var async = require('async');
var fetch = require('./fetch');
var update = require('./db/update');
var feed = require('./db/feed');
var debug = require('debug')('feeds');

// Updates all feeds in the database.

exports.update = function(cb) {

    async.waterfall([

        feed.all,

        function(feeds, cb) {

            debug('Updating ' + feeds.length + ' feeds');

            fetch(feeds, cb);
        },

        update

    ], cb);
};