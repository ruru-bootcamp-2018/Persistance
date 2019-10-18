const webpack = require('webpack');

require('dotenv').config();

module.exports = {
    entry: './client/index.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                ENVIRONMENT: JSON.stringify(process.env.ENVIRONMENT),
            },
        }),
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader', // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                    },
                    {
                        loader: 'sass-loader?sourceMap', // compiles Sass to CSS
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devtool: 'source-map',
};
