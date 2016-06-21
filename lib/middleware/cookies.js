var config = require('../../config.json');
var Cookies = require('cookies');

// Application-specific cookie handling.

if (!config.sessionSecret) {
    throw new Error('Session key is not set.');
}

module.exports = function() {
    return function(req, res, next) {
        req.cookies = new Cookies(req, res, { keys: [ config.sessionSecret ] });
        next();
    };
};
