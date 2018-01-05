const base = require('./base');
const dfPath = require('./path');
const merge = require('webpack-merge');

let strategyMerge = merge.strategy({
    entry: 'prepend',
});

let config = {

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
                use: ['style-loader', 'css-loader']
            }
        ]
    },

    devtool: 'cheap-module-eval-source-map',
}

module.exports = strategyMerge(base,config);
