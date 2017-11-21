const path = require('./path');
const webpack = require('webpack');
const Html = require('html-webpack-plugin');
const CleanFolder = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.dist,
        filename: '[name].bundle.js',
        publicPath: '/',
        chunkFilename: '[name].sepChunk.js'
    },

    devtool: 'source-map',

    module:{
        rules:[
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: ['url-loader?limit=8192'],
            },
            {
                test: /\.(mp4|ogg|svg)$/,
                use: ['file-loader']
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                use: ['url-loader?limit=10000&mimetype=application/font-woff']
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: ['url-loader?limit=10000&mimetype=application/octet-stream']
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: ['file-loader']
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: ['url-loader?limit=10000&mimetype=image/svg+xml']
            }
        ]
    },

    plugins: [
        new Html({
            name: 'index.html',
            template: './public/index.html'
        }),
        new CleanFolder(['dist'],{
            root: path.root
        }),
        new webpack.ProvidePlugin({
            React: 'react',
            Component: ['react', 'Component'],
            ReactDOM: 'react-dom',
            _: 'lodash',
            Route: ['react-router-dom', 'Route'],
            Router: ['react-router-dom', 'BrowserRouter'],
            connect: ['react-redux', 'connect'],
            Provide: ['react-redux', 'Privide']
        })
    ],

    resolve:{
        modules:[
            'node_modules',
            path.src,
            path.common,
            path.route,
            path.component,
            path.layout,
            path.store
        ]
    },

    devServer: {
        historyApiFallback: true,
        open: true
    }
};
