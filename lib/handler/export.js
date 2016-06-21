var async = require('async');
var feed = require('../db/feed');

module.exports = function(app) {

    // Responds list of feed URLs.
    app.get('/export', function(req, res) {
        async.waterfall([
            // Get all feeds.
            function(cb) {
                feed.all(cb);
            },
            // Extract URLs.
            function(feeds, cb) {
                cb(null, feeds.map(function(feed) {
                    return feed.url;
                }));
            }
        ], function(err, urls) {
            if (err) {
                console.error(err);
                res.send(500);
            } else {
                res.set('Content-Type', 'text/plain');
                res.send(urls.join('\n'));
            }
        });
    });
};
