// Сначала подключаются плагины для указания их в настройках
// ======================== ПЛАГИНЫ ================================
let path = require('path'); // Модуль для указания относительного пути

let ExtractTextPlugin = require("extract-text-webpack-plugin");
// ==================================================================


// Суть конфигурации вебпака в том, что нужно сконфигурировать (создать) объект с настройками Вебпака и экспортировать его (Вебпак сам его заберет)

// ================= КОНФИГУРАЦИОННЫЙ ОБЪЕКТ ========================
// Основной объект настроек вебпака 
let JekaWebpackConfiguration = {

	// Свойство-объект "entry" -- указывает входные точки 
	entry: {
		index: './src/index.js',
		indexGenre: './src/indexGenre.js',
		indexAuthor: './src/indexAuthor.js'
	},

	// Свойство-объект "output" -- указывает входные точки 
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
		// new ExtractTextPlugin("styles.css", {allChunks:true}),
	],
	devtool: 'sourcemap'
}
// ==================================================================

// Экспортируем объект с настройками вебпака
module.exports = JekaWebpackConfiguration;