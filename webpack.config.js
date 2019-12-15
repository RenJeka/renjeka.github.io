
let path = require('path');
let CleanWebpackPlugin = require('clean-webpack-plugin');


let myConfigObject = {
	entry:'./src/index.js',

	output:{
		path: path.resolve(__dirname, './dist'),
		filename: 'main.js',
		publicPath: 'dist/',

	},

	module:{
		rules: [
			
		]
	},

	plugins: [
		new CleanWebpackPlugin()
	],	

	devServer:{
		overlay: true,
	},

	devtool: 'source-map',
}

module.exports = myConfigObject;