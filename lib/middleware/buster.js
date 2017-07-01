// Rewrites the URL by stripping the version prefix.

module.exports = () => {
    return (req, res, next) => {
        const rewritten = req.url.replace(/^\/v\-\d+\.\d+\.\d+/, '');
        if (req.url.length !== rewritten.length) {
            req.url = rewritten;
        }
        next();
    };
};
