// Сначала подключаются плагины для указания их в настройках
// ======================== ПЛАГИНЫ ================================
let path = require('path'); // Подключение модуля, который позволяет найти  относительный путь

let ExtractTextPlugin = require("extract-text-webpack-plugin"); // Подключение модуля "ExtractTextPlugin", который ...
let HTMLWebpackPlugin = require("html-webpack-plugin");
let CleanWebpackPlugin = require("clean-webpack-plugin");
// ==================================================================


// Суть конфигурации вебпака в том, что нужно сконфигурировать (создать) объект с настройками Вебпака и экспортировать этот объект. (Вебпак сам его заберет).
// Для каждого формата файла необходимо настроить ЗАГРУЗЧИК, который его будет обрабатывать + ПРАВИЛА (как именно будут обрабатываться эти файлы). Если этого не сделать -- вебпак не поймет, что необходимо делать с тем или инным форматом, и соответственно не обработает его. 

// ================= КОНФИГУРАЦИОННЫЙ ОБЪЕКТ ========================
// Основной объект настроек вебпака 
let JekaWebpackConfiguration = {

	// Свойство-объект "entry" -- указывает входные точки 
	entry: {
		index: './src/index.js',
		indexGenre: './src/indexGenre.js',
		indexAuthor: './src/indexAuthor.js'
	},
//----------------------------------------------------------
	// Свойство-объект "output" -- указывает выходные точки 
	output:{
		
			// Путь, по которому вебпак будет класть собранный проект в эту директорию.(Используем модуль "path" чтобы составить правильный относительный путь)
			path: path.resolve(__dirname, './dist'), 

			filename: '[name].js', // Имя итогового файла. (Название бандла после сборки)

			publicPath: 'dist/' // Публичный путь. Это относительная ссылка на данный файл, которая будет подставлятся в браузер (webpack-dev-server возьмет эту ссылку и сработает правильно, даже если директории './dist' нет в наличии. Вебпак дев сервер её конкатенирует с остальным путем (добавляет эту строку в конец пути)) (разобраться зачем он нужен) 
		},
//----------------------------------------------------------
	// Свойство-объеккоторый конфигурирует модули (загрузчики, правила ...)
	module:{

		// Свойство-объект "rules" -- описание правил. С каким расширением что необходимо сделать .
		// Для правил (для каждого правила) нужно указывать регулярное выражение!
		// ==ЗАМЕТКА==	Так, как вебпак работает в первую очередь именно с ЗАВИСИМОСТЯМИ -- то прописанные ниже правила будут срабатывать каждый раз, когда вебпак встречает строку (оператор) "require()/import" в .js-файле.
		// Загрузчики выполняются СНИЗУ -> ВВЕРХ (справа -> налево ). 
		// Порядок подключения загрузчиков ВАЖЕН! 
		// https://webpack.js.org/concepts/loaders/
		rules:[

			// Правило для обработки .js -файлов.
			{
				test:/\.js$/,				// регулярное выражение (к какому файлу применить правило)
				use: [
					{
						loader: 'babel-loader',
					},
					// {
					// 	loader: "source-map-loader",
					// }
				],		// Какой загрузчик использовать для данного файла
				exclude: '/node_modules/',	// Исключение из правил (не нужно папку "node_modules" прогонять через 'babel-loader')
				enforce: "pre",
			},

			// Правило для обработки .css -файлов. 
			// Для обработки .css файлов можно воспользоваться 2 подходами: 
			// 1. Когда применяется 'style-loader' + 'css-loader'. (При этом варианте нам нужно подключить .css-файлы в точку входа (.js-файл) через импорт (import "./css/style1.css";), вебпак сам возьмет стили с .css-файла и поместит их (с помощью JavaScript функций) -- в хедер .html-файла)

			// 2. Когда применяется специальный плагин "extract-text-webpack-plugin" + 'css-loader' (В этом случае создается отдельный, общий! .css-файл, который нам необходимо подключить в .html-файле)
			{
				// Если мы используем несколько загрузчиков ("loader") -- необходимо их добавить массивом в свойство "use".
				test:/\.css$/,
				////-----------------------------------------------------------------------
				// use: [
					// 	// Загрузчик, который считывает данные с файла и возвращает их в корректном виде без интерпритации
					// 	'style-loader',
					// 	// Загрузчик, который специальным образом подключает css-файл ( вставляет в .js файл в тег <head>. CSS внутри JS)
					// 	'css-loader'
					// ]
				////------------------------------------------------------------------------

				// Для css- файлов используем плагин "ExtractTextPlugin"
				use: ExtractTextPlugin.extract({
					// fallback: "style-loader",
					use: "css-loader" // Загрузчик, который специальным образом подключает css-файл ( вставляет в .js файл в тег <head>. (.css внутри .js))
				})
			},
			
			// Правило для обработки .jpg .png .svg .gif-файлов
			{
				test:/\.(jpg|png|svg|gif)$/,				
				use: [
					{
						// обрабатываем это загрузчиком "file-loader"
						loader: 'file-loader',
						// доп. параметры
						options: {
							name: '[name].[ext]', // шаблон имени после обработки загрузчиком
							outputPath: 'img/', // папка для вывода
							useRelativePath: true, // использовать относительный путь (разузнать)
							publicPath: 'img/'  // Устанавливаем публичный путь (разузнать)
						}
					}
				]
			},

			// // Правило для обработки .html-файлов
			// {
			// 	test:/\.html$/,
			// 	use: ['html-loader'] // используем загрузчик 'html-loader'
			// },

			// // Дополнительное правило для обработки .html-файлов. Правило для обработки дополнительных .html - файлов
			// {
			// 	test:/\.html$/,				
			// 	use: [
			// 		{
			// 			// обрабатываем это загрузчиком "file-loader"
			// 			loader: 'file-loader',
			// 			// доп. параметры
			// 			options: {
			// 				name: '[name].[ext]',
			// 			}
			// 		}
			// 	],
			// 	exclude: path.resolve(__dirname, 'src/index.html')

			// },
		]
	},
//----------------------------------------------------------
	// TODO Разобраться с SplitChunksPlugin, и выделить общие  файлы, которые участвуют во всех бандлах, -- в отдельный chunk

	// Задаются отдельные настройки для плагинов. 
	// Общая информация -- https://webpack.js.org/concepts/#plugins   
	// Ещё общая информация -- https://webpack.js.org/concepts/plugins/
	// Список плагинов -- https://webpack.js.org/plugins/

	plugins: [

		// Создаем экземпляр плагина "extract-text-webpack-plugin" и передаем 1 параметр -- название выходного файла .css (все настройки указаны в документации)
		new ExtractTextPlugin("styles.css"), 
		// new ExtractTextPlugin("styles.css", {allChunks:true}),

		// // Создаем экземпляр плагина "html-webpack-plugin"
		// new HTMLWebpackPlugin({
		// 	filename: 'index.html',
		// 	template: 'src/index.html'
		// }),

		new CleanWebpackPlugin(['dist'])
	],
//----------------------------------------------------------
	// Свойство-объек настройки dev-server-а (сервера для разработки)
	devServer:{
		overlay: true // Свойство, которое дает визуальный вывод ошибки прямо в HTML-страницу (белые буквы на черном фоне). Удобный показ ошибки.
	},
//----------------------------------------------------------
	devtool: 'source-map', // Настройка, которая позволяет создавать sourcemap в итоговой сборке
//----------------------------------------------------------
	// Блок оптимизации
	optimization: {
		
		// Настройка кусков кода (какие куски кода будут выводиться в общие файлы)
		splitChunks: {
			chunks: 'all',
			minSize: 10000,
			name: "commonChunk",
		}
	},
}
// ==================================================================

// Экспортируем объект с настройками вебпака
module.exports = JekaWebpackConfiguration;