var feed = require('../lib/db/feed');
var async = require('async');
var fs = require('fs');

// Updates with the list of urls.

var fromList = exports.fromList = function(list, cb) {
    async.eachSeries(list, function(url, cb) {
        feed.add(url, cb);
    }, cb);
};

// Updates with the list of urls from file.

var fromFile = exports.fromFile = function(file, cb) {
    async.waterfall([
        function(cb) {
            fs.readFile(file, 'UTF-8', cb);
        },
        function(data, cb) {
            fromList(data.split(/\n\r?/).filter(function(url) {
                return url.trim().length > 0;
            }), cb);
        }
    ], cb);
};