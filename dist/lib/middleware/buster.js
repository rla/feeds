"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Rewrites the URL by stripping the version prefix.
exports.default = () => {
    return (req, res, next) => {
        const rewritten = req.url.replace(/^\/v\-\d+\.\d+\.\d+/, '');
        if (req.url.length !== rewritten.length) {
            req.url = rewritten;
        }
        next();
    };
};
//# sourceMappingURL=buster.js.map