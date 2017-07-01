const path = require('path');

// Serves React and ReactDOM library.

module.exports = function(app) {

    // TODO https://expressjs.com/en/api.html#res.sendFile

    app.get('/js/react/react.js', function(req, res) {
        const file = path.join(__dirname, '..', '..', 'node_modules',
            'react', 'dist', 'react.js');
        res.sendFile(file);
    });

    app.get('/js/react/react.min.js', function(req, res) {
        const file = path.join(__dirname, '..', '..', 'node_modules',
            'react', 'dist', 'react.min.js');
        res.sendFile(file);
    });

    app.get('/js/react/react-dom.js', function(req, res) {
        const file = path.join(__dirname, '..', '..', 'node_modules',
            'react-dom', 'dist', 'react-dom.js');
        res.sendFile(file);
    });

    app.get('/js/react/react-dom.min.js', function(req, res) {
        const file = path.join(__dirname, '..', '..', 'node_modules',
            'react-dom', 'dist', 'react-dom.min.js');
        res.sendFile(file);
    });
};
