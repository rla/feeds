var package = require('../../package.json');
var config = require('../../config.json');

module.exports = function(app) {

    var bundle = '/js/bundle/' + (process.env.NODE_ENV === 'production' ?
        'all.min.js' : 'all.debug.js');

    app.get('/', function(req, res) {

        res.render('index', {
            loggedIn: req.isAuthenticated(),
            bundle: bundle,
            version: package.version,
            title: config.title || 'Feeds',
            production: process.env.NODE_ENV === 'production'
        });
    });
};
