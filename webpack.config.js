const path = require('path');

const config = {
    entry: path.join(__dirname, 'public', 'js', 'app', 'index.tsx'),
    output: {
        path: path.resolve(__dirname, 'public', 'js'),
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader'
            }
        ]
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'redux': 'Redux',
        'react-redux': 'ReactRedux',
        'redux-thunk': 'ReduxThunk'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    }
};

module.exports = config;
