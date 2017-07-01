const path = require('path');

const config = {
    entry: path.join(__dirname, 'public', 'js', 'app', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'public', 'js'),
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            }
        ]
    }
};

module.exports = config;
