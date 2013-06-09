// Simplest hashchange router.
// Chrome 5, Firefox 3.6, IE 8.
// (c) Raivo Laanemets 2013
// MIT license.

var route = (function() {
    var routes = [];

    // Sets up a route.
    
    function route(regexp, cb) {
        if (!(regexp instanceof RegExp)) {
            throw new Error('Route must be a regexp.');
        }
        if (typeof cb !== 'function') {
            throw new Error('Route handler must be a function.');
        }
        routes.push({ regexp: regexp, cb: cb });
    }
    
    // Programmatically go a page.
    // Supports extra arguments.
    
    route.go = function(page) {
        var extra = Array.prototype.slice.call(arguments, 1);        
        window.location.hash = '#' + page +
            (extra.length > 0 ? '/' + extra.join('/') : '');
    };
    
    // Looks for matching routes. Picks first.
    
    function activate() {
        var hash = window.location.hash.substring(1);
        for (var i = 0; i < routes.length; i++) {
            var route = routes[i];
            var match = hash.match(route.regexp);
            if (match) {
                route.cb.apply(null, match.slice(1, match.length));
                break;
            }
        }
    }
    
    // Sets up hash change and initial callbacks.
    
    window.addEventListener('load', activate, false);    
    window.addEventListener('hashchange', activate, false);
    
    return route;
})();

// CommonJS support.

if (typeof module !== 'undefined' && module.exports) {
    module.exports = route;
}
