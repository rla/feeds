type RouteCallback = (...params: string[]) => void;

type Route = {
    regexp: RegExp,
    cb: RouteCallback
};

const routes: Route[] = [];

// Sets up a route.

export const route = (regexp: RegExp, cb: RouteCallback) => {
    routes.push({ regexp, cb });
};

// Programmatically go a page.
// Supports extra arguments.

export const go = (page: string, ...extra: string[]) => {
    window.location.hash = `#${page}${(extra.length > 0 ? '/' + extra.join('/') : '')}`;
};

// Re-dispatches the current route.

export const refresh = () => {
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
