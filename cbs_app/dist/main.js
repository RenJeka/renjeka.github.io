/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/books.js":
/*!**********************!*\
  !*** ./src/books.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Массив, в котором будут храниться все объекты книг. Этот массив будет помещатся в Local Storage как объект JSON.
var bookLibrary = [];

var Book =

// Конструктор не применялся. Новый объект "book" заполняется с помощью цикла
function Book(id, name, author) {
	_classCallCheck(this, Book);

	this.id = id;
	this.name = name;
	this.author = author;
};

exports.Book = Book;
exports.bookLibrary = bookLibrary;

/***/ }),

/***/ "./src/formHandler.js":
/*!****************************!*\
  !*** ./src/formHandler.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
		value: true
});
exports.addBookHandler = exports.addToLocalStorage = exports.invalidStylist = undefined;

var _tableWorker = __webpack_require__(/*! ./tableWorker */ "./src/tableWorker.js");

var _myHelperLib = __webpack_require__(/*! ./myHelperLib */ "./src/myHelperLib.js");

var _books = __webpack_require__(/*! ./books */ "./src/books.js");

// Функция для стилизации инпутов в стиль "invalid". Мы передаем на вход массив с инпутами, и функция их стилизует.
function invalidStylist(arrayOfInputs) {

		for (var i = 0; i < arrayOfInputs.length; i++) {
				arrayOfInputs[i].className = "bookInputs-invalid";
		}
}

// Функция добавляет переданный ей объект в локальное хранилище (Local Storage). Функция преображает объект в JSON-объект и создает ключ
// Эта библиотека отвечает за обработку данных с форм
function addToLocalStorage(object, id) {

		var jsonObject = JSON.stringify(object);

		window.localStorage.setItem(id, jsonObject);
}

// // Функция формирует специфический ID для записи в "Local Storage". Используется функцией "addToLocalStorage"
// function getID(object) {

// 	return object.objtype + "-" + object.id;

// }

// Обработчик событий при нажатии на кнопку "addBook". Берет с формы данные и записывает в LocalStorage. Возвращает ключ от данных в LocalStorage.
function addBookHandler(table) {
		var newRow = void 0;
		var book = new _books.Book();
		var arrayOfInputs = document.querySelectorAll('#form-book input');
		var localStorageKey = "Book-Library"; // Ключ, по которому записываются значения в LocalStorage
		console.dir(arrayOfInputs);

		// Проверка, чтобы все необходимые поля были заполнены (минимум 1 символом). Эта проверка (этот цикл) должен запускаться первой!
		for (var i = 0; i < arrayOfInputs.length; i++) {

				// Сама проверка. Если длина "value" хоть одного (первого попавшивося) у инпута == 0 — тогда применяется стиль (invalid) и обработчик завершает работу.
				if (arrayOfInputs[i].value.length == 0) {

						invalidStylist(arrayOfInputs);
						return false;
				}
		}

		// Этот цикл заполняет объект "book". Он перебирает все поля для ввода (инпуты), и создает такие-же свойства у объекта book (название свойста соответствует ID инпута)
		for (var _i = 0; _i < arrayOfInputs.length; _i++) {

				book[arrayOfInputs[_i].getAttribute("id")] = arrayOfInputs[_i].value;

				// Очищение полей. Тут идет проверка на то, чтобы поле не было типа "hidden", так как это системное поле и его нельзя очищать. 
				if (arrayOfInputs[_i].type != "hidden") {

						arrayOfInputs[_i].value = "";
						arrayOfInputs[_i].className = "bookInputs-valid";
				}
		}

		_books.bookLibrary.push(book);
		console.dir(_books.bookLibrary);

		console.dir(book);

		addToLocalStorage(_books.bookLibrary, localStorageKey);

		//  В конце работы обработчика мы создаем новую строку с помощью импортированного объекта "tableWorker", и добавляем информацию с настроенного ранее объекта "book"
		newRow = _tableWorker.tableWorker.addRow(table);
		_tableWorker.tableWorker.addInfoInRow(table, newRow.rowIndex, book);
		return localStorageKey;
}

exports.invalidStylist = invalidStylist;
exports.addToLocalStorage = addToLocalStorage;
exports.addBookHandler = addBookHandler;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _tableWorker = __webpack_require__(/*! ./tableWorker */ "./src/tableWorker.js");

var _myHelperLib = __webpack_require__(/*! ./myHelperLib */ "./src/myHelperLib.js");

var _books = __webpack_require__(/*! ./books */ "./src/books.js");

var _formHandler = __webpack_require__(/*! ./formHandler */ "./src/formHandler.js");

window.addEventListener("load", function () {

	var myTable1 = (0, _myHelperLib.$)('.myTable1');

	_tableWorker.tableWorker.fillTable(myTable1, "Book-Library");

	// console.dir(myTable1);
	// console.log(myTable1.rows);
	// console.log(tableWorker.addRow(myTable1,3,3, "any"));

	// TODO [Спросить] -Как лучше поместить данный обработчик в отдельный модуль, чтобы он работал корректно.

	// TODO ♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦

	// ♦ Продумать, как будет реализовываться проверка на валидность.  
	// ♦ Поместить все объекты "book" в массив и реализовать их перебор с помощью кнопок (данные выводятся в форму). 
	// ♦ Добавить функцию - парсинг объекта с "Local Storage" (объекты записываются в массив arrayOfBooks)
	// ♦ Реализовать заполнение таблицы напрямую с массива "arrayOfBooks"
	// ♦ Реализовать автоматическое заполнение ID f объекте

	// TODO ♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦

	// Обработчик события на клик по кнопке "addBook"
	(0, _myHelperLib.$)('#addBook').addEventListener("click", function () {

		_tableWorker.tableWorker.fillTable(myTable1, (0, _formHandler.addBookHandler)(myTable1));
	});
});

/***/ }),

/***/ "./src/myHelperLib.js":
/*!****************************!*\
  !*** ./src/myHelperLib.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
//  Моя вспомогательная библиотека. Тут находятся функции-помощники, чтобы не подключать JQuery.

function $(selector) {
	return document.querySelector(selector);
}

exports.$ = $;

/***/ }),

/***/ "./src/tableWorker.js":
/*!****************************!*\
  !*** ./src/tableWorker.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Тут находятся все функции для работы с таблицами.
// Добавлять строки, редактировать, ...

var tableWorker = exports.tableWorker = {
	// -----------------------------------------------------------------------------------
	// Метод, который добавляет ряды с ячейками в таблицу
	addRow: function addRow(table) {
		var numberOfRows = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
		var numberOfCells = arguments[2];
		var textInCell = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";


		var arrayofRows = [];

		// Эта функция собственно и добавляет ряд, ячейки и текст в таблицу
		// (Не знаю, как сделать этот метод без внутренней функции)
		function add() {
			// Цикл добавляеи по 1-й строке то кол-во, которое мы укажем (numberOfRows)
			for (var i = 0; i < numberOfRows; i++) {
				var row = document.createElement("tr");
				table.appendChild(row);

				// Цикл добавляет по 1-й ячейке то кол-во, которое мы укажем (numberOfCells)
				for (var j = 0; j < numberOfCells; j++) {
					var cell = document.createElement("td");
					row.appendChild(cell);

					// Добавляем текст в ячейку переданным параметром
					cell.innerHTML = textInCell;
				}
				arrayofRows.push(row);
			}
			return arrayofRows;
		}

		// Проверка на наличие аргумента "numberOfCells", если его нет— за количестко ячеек считается количество ячеек в самом первом ряду (в "thead");
		if (numberOfCells == undefined) {
			numberOfCells = table.rows[0].cells.length;
		}

		// Если ряд не указан (ряд по умолчанию = 1 ) — метод возвращает объект — созданный ряд 
		// Этот способ будет использоваться чаще всего (для создания только 1-го ряда)
		if (numberOfRows == 1) {

			var row = add();
			return row[0];
		}

		// Метод возвращает массив с созданными рядами (массив созданных рядов)
		return add();
	},

	// -----------------------------------------------------------------------------------
	// Метод заполняет одну указанную ячейку в указанном ряде таблицы. Данные берутся с переданного объекта. Функция переберает объект на подходящее свойство и помещает значение этого свойства в ячейку таблицы. Нужна для функции addInfoInRow
	addInfoInCell: function addInfoInCell(table, object, indexOfRow, indexOfCell) {

		for (var key in object) {
			if (object.hasOwnProperty(key)) {
				if (key.toLowerCase() === this.whatHead(table, indexOfCell).toLowerCase()) {
					table.rows[indexOfRow].cells[indexOfCell].innerHTML = object[key];
					console.dir(key);
				}
			}
		}
	},

	// -----------------------------------------------------------------------------------
	// Метод вычисляет, какой заголовок находиться над указанной ячейкой (Заголовок колонки). Нужна для функции "addInfoInCell"
	whatHead: function whatHead(table, indexOfCell) {

		var nameOfTableHead = table.rows[0].cells[indexOfCell].innerHTML;
		return nameOfTableHead;
	},

	// -----------------------------------------------------------------------------------
	// Это основной метод, который заполняет целый ряд таблицы. Использует метод "addInfoInCell".
	addInfoInRow: function addInfoInRow(table, indexOfRow, object) {

		for (var k = 0; k < table.rows[indexOfRow].cells.length; k++) {

			this.addInfoInCell(table, object, indexOfRow, k);
		}
	},

	// -----------------------------------------------------------------------------------

	// Метод заполняет указанную таблицу, указанным массивом объектов. Получает на вход таблицу и массив с данными, либо ключ (по которому лежит массив с данными в LocalStorage).
	// TODO • Необходимо реализовать перегрузку функции, чтобы она принимала либо массив, либо строку-"ключ" LocalStorage  (Подробнее — https://habr.com/ru/post/86403/)
	fillTable: function fillTable(table, keyOrArrayOfObjects) {

		if (typeof keyOrArrayOfObjects == "string") {

			var arrayofData = this.getTableData(keyOrArrayOfObjects);

			for (var i = 0; i < arrayofData.length; i++) {
				this.addInfoInRow(table, i, arrayofData[i]);
			}
		} else if ((typeof keyOrArrayOfObjects === "undefined" ? "undefined" : _typeof(keyOrArrayOfObjects)) == "object") {

			for (var _i = 0; _i < arrayOfObjects.length; _i++) {
				this.addInfoInRow(table, _i, arrayOfObjects[_i]);
			}
		}
	},


	// Метод получает данные с LocalStorage для заполнения таблицы. Нужно передать ключ от объекта в LocalStorage. Возвращает распарсенный массив объектов, которым можно заполнить таблицу.
	getTableData: function getTableData(key) {

		var jsonObject = window.localStorage.getItem(key);

		return JSON.parse(jsonObject);
	}
};

/***/ })

/******/ });
//# sourceMappingURL=main.js.map