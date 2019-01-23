"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sets up route handlers for static HTML pages.
 */
exports.default = (app, config) => {
    app.get('/', (req, res) => {
        res.render('index', {
            loggedIn: req.isAuthenticated(),
            version: config.version,
            title: config.title || 'Feeds',
            production: process.env.NODE_ENV === 'production'
        });
    });
    app.get('/old', (req, res) => {
        res.render('old');
    });
};
//# sourceMappingURL=front.js.map