var split = require('split');
var async = require('async');
var fastFeed = require('fast-feed');
var request = require('request');
var config = require('../../config.json');
var debug = require('debug')('fetch-app');

// Sets up stdin for receiving data.

process.stdin.resume();
process.stdin.setEncoding('utf8');

// Wait for incoming request.

process.stdin.pipe(split()).on('data', function(line) {

    var feeds = JSON.parse(line);

    // Fetch all feeds and exit then.

    fetchAll(feeds, function() {

        process.exit(0);
    });
});

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

            debug('Fetching ' + feed.url);

            request({

                url: feed.url,
                timeout: config.timeout,
                strictSSL: false

            }, cb);

        },

        // Parse feed.

        function(res, body, cb) {

            parse(body, cb);

        }

    ], cb);
}

// Fetches all given urls.
// Does it so by parallel requests.

function fetchAll(feeds, cb) {

    debug('Using ' + config.requests + ' concurrent requests');

    var queue = async.queue(function(feed, cb) {

        fetch(feed, function(err, result) {

            if (err) {

                console.log(JSON.stringify({

                    type: 'error',
                    data: {

                        url: feed.url,
                        uuid: feed.uuid,
                        err: err.message

                    }

                }));

            } else {

                result.uuid = feed.uuid;
                result.url = feed.url;

                console.log(JSON.stringify({

                    type: 'feed',
                    data: result

                }));
            }

            cb();
        });

    }, config.requests);

    queue.drain = cb;
    queue.push(feeds);
};
