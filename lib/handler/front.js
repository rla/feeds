var package = require('../../package.json');
var config = require('../../config.json');

module.exports = function(app) {

    app.get('/', function(req, res) {

        res.render('index', {
            loggedIn: req.isAuthenticated(),
            version: package.version,
            title: config.title || 'Feeds',
            production: process.env.NODE_ENV === 'production'
        });
    });
};
