
/**
 * @summary Суть конфигурации вебпака в том, что нужно сконфигурировать (создать) объект с настройками Вебпака и экспортировать этот объект. (Вебпак сам его заберет).
 * @description Для каждого формата файла необходимо настроить ПРАВИЛА @see JekaWebpackConfiguration.module.rules (как именно будут обрабатываться эти файлы) + ЗАГРУЗЧИК @see JekaWebpackConfiguration.module.rules[любой_эллемент_массива]→use→loader, который мы прописываем в правилах и который будет обрабатывать наши файлы. Если этого не сделать -- вебпак не поймет, что необходимо делать с тем или инным форматом, и соответственно не обработает его. 
 * Изначально конфигурационный файл пишется на Node.js, но его можно написать и на другом языке @see https://webpack.js.org/configuration/configuration-languages/
 * Список основных опций конфигурации (свойств у объекта конфигурации) @see https://webpack.js.org/configuration/#options
 * Генератор конфигационного файла @see https://createapp.dev/webpack
 * Генератор конфигационного файла (Еще один) @see https://generatewebpackconfig.netlify.com/
 * Создать файл конфигурации с помощью webpack cli (npx webpack-cli init) @see https://github.com/webpack/webpack-cli/tree/master/packages/init#cli-via-webpack-cli
 */

// Сначала подключаются плагины для указания их в настройках
// ======================== ПЛАГИНЫ ================================
let path = require('path'); // Подключение модуля, который позволяет найти  относительный путь

let ExtractTextPlugin = require("extract-text-webpack-plugin"); // Подключение модуля "ExtractTextPlugin", который ...
let HTMLWebpackPlugin = require("html-webpack-plugin");
let CleanWebpackPlugin = require("clean-webpack-plugin");

// ================= КОНФИГУРАЦИОННЫЙ ОБЪЕКТ ========================

/**
 *@description Основной объект настроек вебпака 
 */
let JekaWebpackConfiguration = {

	/**
	 * @description Свойство-объект "entry" -- указывает входные точки 
	 */
	entry: {
		index: './src/index.js',
		indexGenre: './src/indexGenre.js',
		indexAuthor: './src/indexAuthor.js'
	},
//----------------------------------------------------------

	/**
	 * @description Свойство-объект "output" -- указывает выходные точки 
	 */
	output:{

			/**
			 * @description Путь, по которому вебпак будет класть собранный проект в эту директорию.(Используем модуль "path" чтобы составить правильный относительный путь)
			 */
			path: path.resolve(__dirname, './dist'), 

			/**
			 * @description Имя итогового файла. (Название бандла после сборки)
			 */
			filename: '[name].js',

			/**
			 * @description Публичный путь. Это относительная ссылка на данный файл, которая будет подставлятся в браузер (webpack-dev-server возьмет эту ссылку и сработает правильно, даже если директории './dist' нет в наличии. Вебпак дев сервер её конкатенирует с остальным путем (добавляет эту строку в конец пути)) (разобраться зачем он нужен) 
			 */
			// publicPath: 'dist/'
		},
//----------------------------------------------------------
	/**
	 * @description Свойство-объеккоторый конфигурирует модули (загрузчики, правила ...)
	 */
	module:{

		/**
		 * @description Свойство-объект "rules" -- описание правил. С каким расширением что необходимо сделать .
		 * Для правил (для каждого правила) нужно указывать регулярное выражение!
		 * ==ЗАМЕТКА==	Так, как вебпак работает в первую очередь именно с ЗАВИСИМОСТЯМИ -- то прописанные ниже правила будут срабатывать каждый раз, когда вебпак встречает строку (оператор) "require()/import" в .js-файле.
		 * Загрузчики выполняются СНИЗУ -> ВВЕРХ (справа -> налево ). 
		 * Порядок подключения загрузчиков ВАЖЕН! 
		 *  Если мы используем несколько загрузчиков ("loader") -- необходимо их добавить массивом в свойство "use".
		 * @tutorial https://webpack.js.org/concepts/loaders/
		 */
		rules:[

			/**
			 * @description Правило для обработки .js -файлов.
			 */
			{
				test:/\.js$/, // регулярное выражение (к какому файлу применить правило)

				/**
				 * @description Указывается массив загрузчиков. Какой загрузчик использовать для данного файла
				 * Описание rules.use @see https://webpack.js.org/configuration/module/#ruleuse
				 * Список загрузчиков для разных нужд @see https://webpack.js.org/loaders/
				 */
				use: [
					{
						loader: 'babel-loader',
					},
					// {
					// 	loader: "source-map-loader",
					// }
				],
				exclude: '/node_modules/',	// Исключение из правил (не нужно папку "node_modules" прогонять через 'babel-loader')
				enforce: "pre",
			},

			
			// // Правило для обработки .html-файлов
			{
				test:/\.html$/,
				use: [{
					loader: 'html-loader',
					// options: {
					// 	attrs: ['img:src'],
					// }
				}]
			},

			/**
			 * @description Правило для обработки .css -файлов. 
			 * Для обработки .css файлов можно воспользоваться 2 подходами: 
			 * 1. Когда применяется 'style-loader' + 'css-loader'. (При этом варианте нам нужно подключить .css-файлы в точку входа (.js-файл) через импорт (import "./css/style1.css";), вебпак сам возьмет стили с .css-файла и поместит их (с помощью JavaScript функций) -- в хедер .html-файла)
			 * 2. Когда применяется специальный плагин "extract-text-webpack-plugin" + 'css-loader' (В этом случае создается отдельный, общий! .css-файл, который нам необходимо подключить в .html-файле)
			 */
			{
				test:/\.s[ac]ss$/i,
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
					use: [
						{
							loader: "css-loader", // Загрузчик, который специальным образом подключает css-файл ( вставляет в .js файл в тег <head>. (.css внутри .js))
							options: {sourceMap: true}
						},
						{
							loader: "sass-loader", // Загрузчик, который специальным образом подключает css-файл ( вставляет в .js файл в тег <head>. (.css внутри .js))
							options: {sourceMap: true}
						}
					], 
				})
			},
			
			/**
			 * @description Правило для обработки .jpg .png .svg .gif-файлов
			 */
			{
				test:/\.(jpg|png|svg|gif)$/,				
				use: [
					{
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
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					'file-loader',
				],
			},


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
	/**
	 * Задаются отдельные настройки для плагинов. 
	 * @description Общая информация -- https://webpack.js.org/concepts/#plugins  
	 * Ещё общая информация -- https://webpack.js.org/concepts/plugins/
	 * Список плагинов -- https://webpack.js.org/plugins/
	 */
	plugins: [

		// Создаем экземпляр плагина "extract-text-webpack-plugin" и передаем 1 параметр -- название выходного файла .css (все настройки указаны в документации)
		new ExtractTextPlugin("styles.css"), 
		// new ExtractTextPlugin("styles.css", {allChunks:true}),

		// // Создаем экземпляр плагина "html-webpack-plugin"
		new HTMLWebpackPlugin({
			filename: 'index.html',
			template: 'src/pages/index.html',
			chunks: ['index', 'commonChunk'],
		}),
		new HTMLWebpackPlugin({
			filename: 'add_genre.html',
			template: 'src/pages/add_genre.html',
			chunks: ['indexGenre', 'commonChunk'],
		}),
		new HTMLWebpackPlugin({
			filename: 'add_author.html',
			template: 'src/pages/add_author.html',
			chunks: ['indexAuthor', 'commonChunk'],
		}),

		// new CleanWebpackPlugin(['dist'])
		
		/**	
		 * Плагин для очистки указанной директории про построении бандла. 
		 */
		new CleanWebpackPlugin({
			// cleanOnceBeforeBuildPatterns: ['**/*', '!*.html'] // Исключаем (не удаляем) файлы .htnl в папке "dist"
		})
	],
//----------------------------------------------------------
	/**
	 * @description Свойство-объек настройки dev-server-а (сервера для разработки)
	 */
	devServer:{
		overlay: true // Свойство, которое дает визуальный вывод ошибки прямо в HTML-страницу (белые буквы на черном фоне). Удобный показ ошибки.
	},
//----------------------------------------------------------
	/**
	 * @description Настройка, которая позволяет создавать sourcemap в итоговой сборке
	 */
	devtool: 'source-map',
//----------------------------------------------------------
	/**
	 *  @description Блок оптимизации
	 */
	optimization: {
		
		/**
		 *  @description Настройка кусков кода (какие куски кода будут выводиться в общие файлы)
		 */
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