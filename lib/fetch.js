var async = require('async');
var fastFeed = require('../../fast-feed');
var request = require('request');
var log = require('./log')(module);
var config = require('../config.json');

// Fetches single url and parses result.
// Calls cb at the end.

function fetch(feed, cb) {
    async.waterfall([
        function(cb) {
            log('fetching %s', feed.url);
            request({ url: feed.url, timeout: 20000 }, cb);
        },
        function(res, body, cb) {
            fastFeed.parse(body, cb);
        },
    ], cb);
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
