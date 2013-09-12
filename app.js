var debug = require('debug')('app');
var express = require('express');
var http = require('http');
var path = require('path');
var feeds = require('./lib/feeds');
var config = require('./config.json');
var ejs = require('ejs');
var commander = require('commander');
var package = require('./package.json');
var db = require('./lib/db/db');

// When heap profiling is enables, load v8-profiler.
// https://github.com/felixge/node-memory-leak-tutorial

if (config.heapdump) {

    require('heapdump');

    console.log('PID: ' + process.pid);
}

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

app.set('port', process.env.PORT || 3330);

// Set up views.
// Will use ejs with .html file name extension.

ejs.open = '{{';
ejs.close = '}}';

app.set('views', __dirname + '/views');
app.engine('html', ejs.renderFile);

app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.cookieSession({ secret: config.sessionSecret }));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {

    app.use(express.errorHandler());
}

// Set up routes.

require('./lib/api')(app);
require('./lib/import')(app);
require('./lib/export')(app);

app.get('/', function(req, res) {

    res.render('index.html', { loggedIn: !!req.session.ok });
});

http.createServer(app).listen(app.get('port'), function() {

    debug('Express server listening on port: %s', app.get('port'));
});

if (commander.fetch) {

    feeds.update(function() {

        debug('Done');
    });

} else {

    // Starts automatic updating for feeds.

    setInterval(function() {

        debug('Updating feeds');

        feeds.update(function() {

            debug('Update finished');
        });

    }, polltime * 1000);
}

