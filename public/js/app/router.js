const routes = [];

// Sets up a route.

exports.route = (regexp, cb) => {
    if (!(regexp instanceof RegExp)) {
        throw new Error('Route must be a regexp.');
    }
    if (typeof cb !== 'function') {
        throw new Error('Route handler must be a function.');
    }
    routes.push({ regexp: regexp, cb: cb });
};

// Programmatically go a page.
// Supports extra arguments.

exports.go = (page, ...extra) => {
    window.location.hash = `#${page}${(extra.length > 0 ? '/' + extra.join('/') : '')}`;
};

// Re-dispatches the current route.

exports.refresh = () => {
    activate();
};

// Looks for matching routes. Picks first.

const activate = () => {
    const hash = window.location.hash.substring(1);
    for (const route of routes) {
        const match = hash.match(route.regexp);
        if (match) {
            route.cb.apply(null, match.slice(1, match.length));
            break;
        }
    }
};

// Sets up hash change and initial callbacks.

window.addEventListener('load', activate, false);    
window.addEventListener('hashchange', activate, false);
