var package = require('../../package.json');

module.exports = function(app) {

    var bundle = '/js/bundle/' + (process.env.NODE_ENV === 'production' ?
        'all.min.js' : 'all.debug.js');

    app.get('/', function(req, res) {

        res.render('index', {
            loggedIn: req.isAuthenticated(),
            bundle: bundle,
            version: package.version
        });
    });
};
