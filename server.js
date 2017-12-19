const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const historyApiFallback = require('connect-history-api-fallback');

const ip = require('ip');
const express = require('express');

const config = require('./cfg/webpack.config.dev');
const merge = require('webpack-merge');

let app = new express();

let strategyMerge = merge.strategy({
    entry: 'replace'
});

const options = {
    contentBase: '/',
    publicPath: '/',
    noInfo: true,
    stats: {
        colors: true
    }
};

let port = 9000;

newConfig = strategyMerge(config,{
    entry: [
        'webpack-hot-middleware/client?reload=true',
        './src/index.js'
    ],
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({url: `http://${ip.address()}:${port}/?react_pref`}),
    ]
});

const compiler = webpack(newConfig);

let middleware = webpackDevMiddleware(compiler, options);

app.use(historyApiFallback({
    index: '/index.html'
}));

app.use(middleware);
app.use( webpackHotMiddleware(compiler));

app.get('/*', (req, res)=> res.sendFile(__dirname + '/index.html') );

app.listen(port, (error)=>{
    if(error){
        console.log(error);
        return;
    }
    console.log( `dev server listening on port ${port}` );
})
