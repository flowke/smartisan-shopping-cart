const path = require('path');
const dfPath = require('./path');
const webpack = require('webpack');
const Html = require('html-webpack-plugin');
const CleanFolder = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: path.resolve(dfPath.root,'src/index.js')
    },
    output: {
        path: dfPath.dist,
        filename: '[name].bundle.js',
        publicPath: '/',
        chunkFilename: '[name].sepChunk.js'
    },

    module:{
        rules:[
            
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: ['link:href']
                    }
                }
            }
        ]
    },

    plugins: [
        new Html({
            name: 'index.html',
            template: './public/index.html'
        }),
        new CleanFolder(['dist'],{
            root: dfPath.root
        }),
        new webpack.ProvidePlugin({
            React: 'react',
            Component: ['react', 'Component'],
            ReactDOM: 'react-dom',
            PT: 'prop-types',
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
            dfPath.root,
            dfPath.src,
            dfPath.common,
            dfPath.route,
            dfPath.component,
            dfPath.layout,
            dfPath.store
        ]
    }
};
