// Helper middleware to clear/set session.
// Base options for setting cookies.

function options(customize) {
    var base = {
        secure: false,
        httpOnly: true,
        overwrite: true
    };
    Object.keys(customize).forEach(function(key) {
        base[key] = customize[key];
    });
    return base;
}

module.exports = function() {
    return function(req, res, next) {
        req.setAuthenticated = function(value) {
            if (value) {
                req.cookies.set('authenticated', 'OK', options({ signed: true }));
            } else {
                req.cookies.set('authenticated', null, options({ signed: true }));
            }
        };
        req.isAuthenticated = function() {
            var authenticated = req.cookies.get(
                'authenticated', { signed: true });
            return authenticated === 'OK';
        };
        next();
    };
};
