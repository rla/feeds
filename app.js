var debug = require('debug')('app');
var feeds = require('./lib/feeds');
var config = require('./config.json');
var package = require('./package.json');
var commander = require('commander');
var express = require('express');
var db = require('./lib/db/db');
var logger = require('./lib/logger');

db.open(config.db);

commander.version(package.version);
commander.option('-f, --fetch', 'Runs fetch process right at start.');
commander.parse(process.argv);

// Polltime check.

var polltime = config.polltime;

if (polltime < 60) {
    throw new Error('Poll time must be at least 60 seconds.');
}

// Set up the express app.

var app = express();

// Set up templating.

require('./lib/ejs')(app);

// Generic middleware stack.

require('./lib/middleware')(app);

// Set up handlers.

require('./lib/handler')(app);

// Starts the server.

app.set('port', process.env.PORT || 3330);

var server = app.listen(app.get('port'), function() {

    logger.info('Express server listening on port ' +
        server.address().port);
});

// Runs immediate fetch or starts periodic polling.

if (commander.fetch) {
    logger.info('Single-time feed update triggered.');
    feeds.update(function() {
        logger.info('Finished feed update.');
    });
} else {
    // Starts automatic updating for feeds.
    setInterval(function() {
        logger.info('Updating feed.');
        feeds.update(function() {
            logger.info('Update finished.');
        });
    }, polltime * 1000);
}
