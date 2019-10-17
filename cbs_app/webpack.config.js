let path = require('path');

let ExtractTextPlugin = require("extract-text-webpack-plugin");

let conf = {
	entry: {
		index: './src/index.js',
		indexGenre: './src/indexGenre.js'
	},
	output:{
		path: path.resolve(__dirname, './dist'),
		filename: '[name].js',
		publicPath: 'dist/'
	},
	devServer:{
		overlay: true
	},
	module:{
		rules:[
			{
				test:/\.js$/,
				loader: 'babel-loader',
				exclude: '/node_modules/'
			},
			{
				test:/\.css$/,
				// use: [
				// 	'style-loader',
				// 	'css-loader'
				// ]
				use: ExtractTextPlugin.extract({
					// fallback: "style-loader",
					use: "css-loader"
				})
			}
		]
	},
	// TODO Разобраться с SplitChunksPlugin, и выделить общие  файлы, которые участвуют во всех бандлах, -- в отдельный chunk
	plugins: [
		new ExtractTextPlugin("styles.css"),
	],
	devtool: 'sourcemap'
}

module.exports = conf;