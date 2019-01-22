const path = require('path');

const config = (env, argv) => ({
    entry: path.join(__dirname, 'public', 'js', 'app', 'index.tsx'),
    output: {
        path: path.resolve(__dirname, 'public', 'js'),
        filename: `[name].${argv.mode}.bundle.js`
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
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    }
});

module.exports = config;
