var log = require('./lib/log')(module);
var express = require('express');
var http = require('http');
var path = require('path');
var feeds = require('./lib/feeds');
var config = require('./config.json');
var ejs = require('ejs');

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

app.use(express.favicon());
app.use(express.logger('dev'));
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

http.createServer(app).listen(app.get('port'), function(){
    log('express server listening on port: %s', app.get('port'));
});

// Starts automatic updating for feeds.

setInterval(function() {
    log('updating feeds');
    feeds.update(function() {
        log('update finished');
    });
}, polltime * 1000);