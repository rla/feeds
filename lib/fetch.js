var async = require('async');
var fastFeed = require('fast-feed');
var request = require('request');
var feedDb = require('./db/feed');
var log = require('./log')(module);
var config = require('../config.json');

// Parses given feed after
// fixups.

function parse(feed, cb) {

    // http://feeds.feedburner.com/smuscom
    // Has HTML as XML.

    feed = feed.replace(/allowfullscreen>/g, '>');

    fastFeed.parse(feed, { content: false }, cb);
}

// Fetches single url and parses result.
// Calls cb at the end.

function fetch(feed, cb) {

    async.waterfall([

        // Fetch feed.

        function(cb) {

            log('fetching %s', feed.url);

            request({

                url: feed.url,
                timeout: config.timeout

            }, cb);

        },

        // Parse feed.

        function(res, body, cb) {

            parse(body, cb);

        },

    ], function(err, items) {

        if (err) {

            // If error occurred, mark
            // the feed as erroneus.

            feedDb.mark(feed.uuid, err);
        }

        cb(err, items);
    });
}

// Fetches all given urls.
// Does it so by parallel requests.

module.exports = function(feeds, cb) {
    log('using %s concurrent requests', config.requests);
    var results = [];
    var queue = async.queue(function(feed, cb) {
        fetch(feed, function(err, result) {
            if (err) {
                log('Error: %s: %s', feed.url, err);
            } else {
                result.uuid = feed.uuid;
                results.push(result);
            }
            cb();
        });
    }, config.requests);
    queue.drain = function() {
        cb(null, results);
    };
    queue.push(feeds);
};
