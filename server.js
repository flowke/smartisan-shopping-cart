const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const config = require('./cfg/webpack.config.dev');

const options = {
    contentBase: './',
    host: '0,0,0,0',
    open: true,
    historyApiFallback: true,
    useLocalIp: true
};


let port = 9000;

const compiler = webpack(config);

new webpackDevServer(compiler, options)
    .listen(port, ()=>{
        console.log( `dev server listening on port ${port}` );
    })
