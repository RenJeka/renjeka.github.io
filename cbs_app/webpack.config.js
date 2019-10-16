let path = require('path');

let ExtractTextPlugin = require("extract-text-webpack-plugin");

let conf = {
	//! необходимо создать несколько точек входа и подключить каждую точку входа к отдельному html -файлу
	entry: {
		index: './src/index.js',
		indexGenre: './src/indexGenre.js'
	},
	// ! Соответственно создать и несколько точек выхода
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
	plugins: [
		new ExtractTextPlugin("styles.css"),
	],
	devtool: 'sourcemap'
}

module.exports = conf;