const base = require('./base');
const path = require('path');
const dfPath = require('./path');
const merge = require('webpack-merge');
const extractTextWebpackPlugin = require('extract-text-webpack-plugin');
const ClosureCompilerPlugin = require('webpack-closure-compiler');
const webpack = require('webpack');

const extractCSS = new extractTextWebpackPlugin('assets/css/[name]_[contenthash:6].css')

let strategyMerge = merge.strategy({
    entry: 'replace',
    output: 'replace',
	module:{
		rules: 'replace'
	}
});

let config = {

    entry: {
        app: path.resolve(dfPath.root,'src/index.js')
    },
    output: {
        path: dfPath.dist,
        filename: 'assets/js/[name]_[chunkhash].bundle.js',
        publicPath: '/',
        chunkFilename: 'assets/js/[name].sepChunk.js',
		hashDigestLength: 6
    },

    module:{
        rules: [
            {
                test: /\.js$/,
                use:[
					{loader: 'babel-loader',options:{cacheDirectory:true}}
				],
                exclude: [
                    dfPath.node_modules
                ]
            },
            {
                test: /\.css$/,
                use: extractCSS.extract({
                    use: ['css-loader']
                })
            },
			{
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
					{
						loader: 'url-loader',
						options:{
							limit:8192,
							name: '[name]_[hash].[ext]',
							outputPath: 'assets/img/'
						}
					}
				],
            },
            {
                test: /\.(mp4|ogg|svg|ico)$/,
                use: [
					{
						loader: 'file-loader',
						options:{
							name: '[name]_[hash].[ext]',
							outputPath: 'assets/media/'
						}
					}
				]
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                use: [

					{
						loader: 'url-loader',
						options:{
							limit:10000,
							name: '[name]_[hash].[ext]',
							outputPath: 'assets/font/',
							mimetype: 'application/font-woff'
						}
					}
				]
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: [
					{
						loader: 'url-loader',
						options:{
							limit:10000,
							name: '[name]_[hash].[ext]',
							outputPath: 'assets/font/',
							mimetype: 'application/octet-stream'
						}
					}
				]
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: [
					{
						loader: 'file-loader',
						options:{
							name: '[name]_[hash].[ext]',
							outputPath: 'assets/font/',
						}
					}
				]
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: [
					{
						loader: 'url-loader',
						options:{
							limit:10000,
							name: '[name]_[hash].[ext]',
							outputPath: 'assets/font/',
							mimetype: 'image/svg+xml'
						}
					}
				]
            },

        ]
    },

    plugins:[
        extractCSS,
		new webpack.EnvironmentPlugin({
			NODE_ENV: 'production'
		}),
		new ClosureCompilerPlugin(),
    ],

    devtool: 'source-map',
};

module.exports = strategyMerge(base,config);
