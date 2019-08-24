"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Helper middleware to clear/set session.
// Base options for setting cookies.
const BASE_OPTIONS = {
    secure: false,
    httpOnly: true,
    overwrite: true,
};
const options = (customize) => {
    return Object.assign({}, BASE_OPTIONS, customize);
};
exports.default = () => {
    return (req, res, next) => {
        req.setAuthenticated = (value) => {
            if (value) {
                req.cookies.set('authenticated', 'OK', options({ signed: true }));
            }
            else {
                req.cookies.set('authenticated', null, options({ signed: true }));
            }
        };
        req.isAuthenticated = () => {
            const authenticated = req.cookies.get('authenticated', { signed: true });
            return authenticated === 'OK';
        };
        next();
    };
};
//# sourceMappingURL=session.js.map