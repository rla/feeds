const path = require('path');
const concat = require('concat');

const libraries = [
    path.join(__dirname, 'node_modules', 'react', 'umd', 'react.production.min.js'),
    path.join(__dirname, 'node_modules', 'react-dom', 'umd', 'react-dom.production.min.js'),
    path.join(__dirname, 'node_modules', 'redux', 'dist', 'redux.min.js'),
    path.join(__dirname, 'node_modules', 'react-redux', 'dist', 'react-redux.min.js'),
    path.join(__dirname, 'node_modules', 'redux-thunk', 'dist', 'redux-thunk.min.js'),
];

(async () => {
    try {
        await concat(libraries, path.join(__dirname, 'public', 'js', 'libs.production.js'));
    } catch (err) {
        process.stderr.write(err);
        process.exit(1);
    }
})();
