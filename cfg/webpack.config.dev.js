const base = require('./base');
const path = require('./path');
const merge = require('webpack-merge');

let strategyMerge = merge.strategy({
    entry: 'prepend',
});

let dev = {

    module:{
        rules: [
            {
                test: /\.js$/,
                use:['babel-loader'],
                exclude: [
                    path.node_modules
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

module.exports = strategyMerge(base,dev);
