var ejs = require('ejs');
var path = require('path');

// Set up EJS templating engine.

module.exports = function(app) {
    app.set('views', path.join(__dirname, '..', 'views'));
    app.set('view engine', 'ejs');
};
