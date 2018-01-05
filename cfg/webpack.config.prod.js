const base = require('./base');
const path = require('path');
const dfPath = require('./path');
const merge = require('webpack-merge');
const extractTextWebpackPlugin = require('extract-text-webpack-plugin');

const extractCSS = new extractTextWebpackPlugin('[name]-[contenthash:6].css')

let strategyMerge = merge.strategy({
    entry: 'replace',
    output: 'replace',
});

let config = {

    entry: {
        app: path.resolve(dfPath.root,'src/index.js')
    },
    output: {
        path: dfPath.dist,
        filename: './assets/js/[name].bundle.js',
        publicPath: '/',
        chunkFilename: './assets/js/[name].sepChunk.js'
    },

    module:{
        rules: [
            {
                test: /\.js$/,
                use:['babel-loader'],
                exclude: [
                    dfPath.node_modules
                ]
            },
            {
                test: /\.css$/,
                use: extractCSS.extract({
                    use: ['css-loader']
                })
            }
        ]
    },

    plugins:[
        extractCSS
    ],

    devtool: 'source-map',
};

module.exports = strategyMerge(base,config);
