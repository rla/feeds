var feed = require('./db/feed');
var async = require('async');

// Updates with the list of urls.

var fromList = exports.fromList = function(list, cb) {

    async.eachSeries(list, function(url, cb) {

        feed.add(url, cb);

    }, cb);
};

// Middleware to handle text request.
// From https://gist.github.com/visionmedia/3750227

function text(req, res, next) {

    if (req.is('text/*')) {

        req.text = '';
        req.setEncoding('utf8');

        req.on('data', function(chunk) {

            req.text += chunk;

        });

        req.on('end', next);

    } else {

        next();
    }
}

module.exports = function(app) {

    // Takes given URLs and inserts into the database.
    // Auth token must be given as query parameter auth.

    app.post('/import', text, function(req, res) {

        if (req.text) {

            if (checkToken(req.query.auth)) {

                var urls = req.text.split(/\r?\n/).filter(function(url) {

                    return url.trim().length > 0;

                });

                fromList(urls, function(err) {

                    if (err) {

                        // Import failed.

                        console.error(err);
                        res.send(500);

                    } else {

                        // Import successful.

                        res.send(200);
                    }
                });

            } else {

                // Auth token wrong.

                res.send(401);
            }

        } else {

            // No body. Bad request.

            res.send(400);
        }
    });

    // Import auth is done by temporary tokens.

    var chars = 'abcdefghijklmnopqrstuvwxyz'.split('');
    var currentToken;
    var tokenCreated = 0;

    // Creates a new token.

    function createToken() {

        currentToken = '';

        for (var i = 0; i < 20; i++) {

            currentToken += chars[Math.floor(Math.random() * chars.length)];
        }

        tokenCreated = Date.now();

        return currentToken;
    }

    function checkToken(token) {

        if (Date.now() - tokenCreated > 1000 * 60 * 10) {

            // 10 minute timeout.

            return false;
        }

        if (typeof currentToken === 'undefined') {

            // No token ever set.

            return false;
        }

        return token === currentToken;
    }

    // Sends authentication token for
    // import access.

    app.get('/token', function(req, res) {

        if (req.session.ok) {

            // User has web session.

            res.set('Content-Type', 'text/plain');
            res.send(createToken());

        } else {

            // No web session.

            res.send(401);
        }
    });
};