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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/indexAuthor.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/books.class.js":
/*!****************************!*\
  !*** ./src/books.class.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Массив, в котором будут храниться все объекты книг. Этот массив будет помещатся в Local Storage как объект JSON.
var bookLibrary = [];

/**
 * Класс для создания объектов "Книги". Каждая книга — объект, свойства которого пользователь заполняет в полях "input" в форме "Добавить книгу"
 * @todo реализовать заполнение объекта с помощью конструктора. (В данный момент объект заполняется formHandler.addBookHandler())
 */

var Book = function Book() {
	_classCallCheck(this, Book);
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
exports.formHandler = undefined;

var _myHelperLib = __webpack_require__(/*! ./myHelperLib */ "./src/myHelperLib.js");

var _books = __webpack_require__(/*! ./books.class */ "./src/books.class.js");

var _genres = __webpack_require__(/*! ./genres.class */ "./src/genres.class.js");

var _tableWorker = __webpack_require__(/*! ./tableWorker */ "./src/tableWorker.js");

var formHandler = exports.formHandler = {

	// --------------------------------------------------------------------------
	/**
  * Обработчик событий при нажатии на кнопку "addBook". Берет с формы данные и записывает в LocalStorage.
  * @param {object} event Объект события
  * @return {object}  Возвращает объект с ключом от данных в LocalStorage и добавленным объектом.{localStorageKey: localStorageKey, addedObject: book}. Возвращает "false", если форма не валидная либо есть такая-же запись в LocalStorage.
  */
	addBookHandler: function addBookHandler(event) {

		var currentForm = event.target.form;
		var formElements = currentForm.elements;
		var dublicateKey = "idd"; // Ключ, по которому будет происходить поиск дубликатов (по умолчанию = 'idd')
		var localStorageKey = this.getLocalStorageKey(currentForm); // Ключ, по которому записываются значения в LocalStorage

		// Проверка валидации. Если валидация вернула "false" — то закончить выполнение текущего метода
		if (this.validate(formElements) == false) {
			return false;
		}

		var currentObject = this.getObjectType(currentForm);
		var object = void 0;

		switch (currentObject.objtype) {

			case "book":
				object = new _books.Book();
				break;

			case "author":
				object = new _genres.Author();
				break;

			case "genre":
				object = new _genres.Genre();
				break;

		}

		this.fillObject(object, formElements, localStorageKey);

		//Если находим дубликат объекта - метод заканчивает работу.
		if (this.findDublicate(object, localStorageKey, dublicateKey)) {
			return false;
		}

		//Чистим все поля для заполнения
		this.cleanInput(currentForm);

		// Добавляем настроенный объект в "localStorage"
		this.addToLocalStorage(object, localStorageKey);

		return { localStorageKey: localStorageKey, addedObject: object };
	},


	// --------------------------------------------------------------------------
	/**
  * Метод для заполнения объекта значениями с полей ввода в форме (input)
  * @todo реализовать заполнение объекта через конструктор класса Book в book.js
  * @param {object} object Пустой объект, который необходимо заполнить
  * @param {formElements[]} formElements Массив элементов, с которых берется значения
  * @param {string} localStorageKey Ключ от локального хранилища (для нахождения ID)
  * @return {object} Возвращает заполненный объект
  */
	fillObject: function fillObject(object, formElements, localStorageKey) {

		// Добавляем новый "id"
		var currentId = "idd";
		object[currentId] = this.getID(localStorageKey, currentId);

		// Перебор значений массива formElements чтобы взять с каждого элемента значение "value"
		// TODO Переделать этот перебор через forEach(или подобную), если это возможно.
		for (var i = 0; i < formElements.length; i++) {

			// Если элемент формы не имеет атрибута 'ignore'-- заполняем объект, если атрибут имеется -- игнорируем заполнения объекта
			if (formElements[i].hasAttribute('ignore') == false) {
				// Создаем свойство у объекта с таким же именем, как и значение "id" в input
				object[formElements[i].getAttribute("id")] = formElements[i].value;
			}
		}
		return object;
	},

	// --------------------------------------------------------------------------
	/**
  * Метод очищает поля в указанной форме.
  * @todo Передлелать этот метод через цикл "forEach" или "for in "
  * @param {object} form форма, поля в которой необходимо очистить
  * @return Ничего не возвращает
  */

	cleanInput: function cleanInput(form) {

		for (var i = 0; i < form.elements.length; i++) {

			// Если поле скрытое, или элемент формы — кнопка, то пропускаем и не очищаем эти элементы
			if (!(form.elements[i].type == "hidden" || form.elements[i].localName == "button")) {
				form.elements[i].value = "";
				form.elements[i].className = "bookInputs-clean";
			}
		}

		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Вариант1
		// for (const key in form.elements) {
		// 	if (form.elements.hasOwnProperty(key)) {
		// 		if (key.type != "hidden" || key.localName != "button") {
		// 			key.value = "";
		// 			key.className = "bookInputs-clean" 
		// 		}
		// 	}
		// }
		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Вариант2
		// form.elements.forEach(element => {
		// 	if (element.type != "hidden" || element.localName != "button") {
		// 		element.value = "";
		// 		element.className = "bookInputs-clean" 
		// 	}
		// });

	},

	// --------------------------------------------------------------------------
	/**
  * Метод устанавливает, какой объект должен заполнятся в форме. Для работы метода в форме должно быть поле <input type='hidden' id='objtype' value=''>, иначе метод выбросит исключение.
  * @param {object} form форма, которая предназначена для ввода данных об объекте.
  * @return {object} Возвращает объект, c 2-мя свойствами: названием объекта и ключ для localStorage.
  */
	getObjectType: function getObjectType(form) {
		for (var i = 0; i < form.elements.length; i++) {
			if (form.elements[i].id == "objtype") {
				return { objtype: form.elements[i].value, localStorageKey: this.getLocalStorageKey(form) //form.elements[i].value
				};
			}
		}
		throw "Не найдено поле ввода  <input type='hidden'> с указанием типа объекта, который будет передан в базу данный. Добавьте в вашу форму поле <input type='hidden' id='objtype' value=''>  В поле value='' укажите тип объекта, который будет добавлен в базу данных";
	},


	/**
  * Метод проверяет дубликаты объектов. В случае нахождения дубликата выводит ошибку.
  * @param {object} object 
  * @param {string} localStorageKey 
  * @return {boolean} true, если метод нашел повторную запись, false — если не нашел.
  */
	findDublicate: function findDublicate(object, localStorageKey) {
		var dublicateKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "idd";

		var localStorageArray = _tableWorker.tableWorker.getTableData(localStorageKey);

		if (localStorageArray == false) {
			return false;
		}
		// Тут производится сравнение по полю "dublicateKey". Если есть совпадение — считается, что найден дубликат и метод выводит сообщение.
		var flag = localStorageArray.some(function (item) {
			return item[dublicateKey] == object[dublicateKey];
		});
		if (flag) {
			alert("такая запись уже есть");
		}
		return flag;
	},

	// --------------------------------------------------------------------------
	/**
  * Метод проверяет чтобы все необходимые поля были заполнены (минимум 1 символом). 
  * 
  * @param {arrayOfElements[]} arrayOfElements Массив с DOM-элементами,  полями ввода (input) формы 
  * @return {boolean} "true", если все поля валидные. "false", если хотя-бы 1 поле не прошло проверку (тогда и форма считается не валидной)
  */
	validate: function validate(arrayOfElements) {

		var counterOfInvalid = 0;

		for (var i = 0; i < arrayOfElements.length; i++) {

			//Этим "if" обрабатывается исключение (те элементы формы, которые не нужно валидировать)
			if (arrayOfElements[i].localName == "button") {
				continue;
			}
			// Сама проверка. Если в инпут не ввели данные— тогда применяется стиль (invalid) и обработчик завершает работу.
			if (arrayOfElements[i].value.length == 0) {

				arrayOfElements[i].className = "bookInputs-invalid";
				counterOfInvalid++;
			} else {

				arrayOfElements[i].className = "bookInputs-valid";
			}
		}

		// Если счетчик невалидных элементов больше нуля — то и сама форма невалидная (вернуть "false")
		if (counterOfInvalid > 0) {
			return false;
		} else {
			return true;
		}
	},


	// --------------------------------------------------------------------------
	/**
  * Метод  добавляет переданный ей объект в локальное хранилище (Local Storage).
  * @param {object} object Объект, который нужно записать в LocalStorage
  * @param {string} id Ключ, по которому будет записываться объект
  * @return {void} Ничего не возвращает
  */
	addToLocalStorage: function addToLocalStorage(object, id) {

		var tempData = void 0;
		var tempJSON = localStorage.getItem(id);
		var firstArray = [];

		// Если у нас уже есть такой JSON-объект — функция добавляет наш объект (который мы передали в параметре) — в готовый массив объектов. Если еще нет JSON-объекта — создаем новый.
		if (tempJSON) {

			tempData = JSON.parse(tempJSON);
			tempData.push(object);
			tempJSON = JSON.stringify(tempData);
			localStorage.setItem(id, tempJSON);
			return;
		} else {
			firstArray.push(object);
			window.localStorage.setItem(id, JSON.stringify(firstArray));
			return;
		}
	},

	/**
  *  Метод формирует уникальный  id  для нового объекта.
  * @param {string} localStorageKey ключ от локального хранилища.
  * @param {string} field поле у объекта, по которому считается уникальное значение. (Сейчас подразумевается, что поле типа {number})
  * @return {number} Возращает новое значение "id", которого еще не было (самое большое текущее "id" +1)
  */
	getID: function getID(localStorageKey, field) {

		var tableData = _tableWorker.tableWorker.getTableData(localStorageKey);
		var currentId = 0;
		if (tableData) {
			// ищем самое большое значение "id"
			tableData.forEach(function (element) {

				if (parseInt(element[field]) > currentId) {
					currentId = parseInt(element[field]);
				}
			});
			return currentId + 1;
		} else {
			return 1;
		}
	},


	/**
  * Метод формирует ключ для LocalStorage.
  * @param {object} form Форма, в которую вводятся данные об объекте (1 форма - 1 объект). По умолчанию "document.forms[0]"
  * @return {string} Возвращает созданный ключ для LocalStorage.
  */
	getLocalStorageKey: function getLocalStorageKey() {
		var form = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.forms[0];


		//Находим в форме поле ввода с id == "objtype" (это поле типа  "hidden")
		for (var i = 0; i < form.elements.length; i++) {
			if (form.elements[i].id == "objtype") {

				// Возвращаем созданный  ключ
				return form.elements[i].value + "-library";
			}
		}

		throw "Метод не смог найти поле с id == 'objtype' и value == '<название вашего объекта>'. Убедитесь что оно есть ";
	}

	// --------------------------------------------------------------------------

};

// --------------------------------------------------------------------------
// // TODO — Реализовать уникальный ID
// // // Функция формирует специфический ID для записи в "Local Storage". Используется функцией "addToLocalStorage"
// Эта библиотека отвечает за обработку данных с форм

/***/ }),

/***/ "./src/genres.class.js":
/*!*****************************!*\
  !*** ./src/genres.class.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Класс для создания объектов "Книги". Каждая книга — объект, свойства которого пользователь заполняет в полях "input" в форме "Добавить книгу"
 * @todo реализовать заполнение объекта с помощью конструктора. (В данный момент объект заполняется formHandler.addBookHandler())
 */
var Genre = exports.Genre = function Genre() {
  _classCallCheck(this, Genre);
};

/***/ }),

/***/ "./src/indexAuthor.js":
/*!****************************!*\
  !*** ./src/indexAuthor.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _tableWorker = __webpack_require__(/*! ./tableWorker.js */ "./src/tableWorker.js");

var _myHelperLib = __webpack_require__(/*! ./myHelperLib.js */ "./src/myHelperLib.js");

var _formHandler = __webpack_require__(/*! ./formHandler.js */ "./src/formHandler.js");

window.addEventListener("load", function () {
	console.dir(document.forms[0]);
	console.dir(document.forms[0].elements);
	var currentTable = (0, _myHelperLib.$)('#table-author');
	var localStorageKey = _formHandler.formHandler.getLocalStorageKey();

	_tableWorker.tableWorker.fillTable(currentTable, localStorageKey);

	(0, _myHelperLib.$)('#add').addEventListener("click", function (e) {

		// Запускаем обработчик события на клик по кнопке "addBook" и получаем возращаемый объект, который записался в базу данных.
		var returnedObject = _formHandler.formHandler.addBookHandler(e);

		// Если есть ошибка в валидации — возвращаем "false", и клик не дает результата (не записывает данные и не модифицирует таблицу )
		if (returnedObject == false) {
			return false;
		}

		// Добавляем ряд с данными в таблицу
		_tableWorker.tableWorker.addRow(currentTable, returnedObject.addedObject);
	});

	// Выбор определенной строки. Тут перебираются все строки и на конкретную строку, которую выбрал пользователь -- вешается обработчик событий. 
	// TODO Реализовать так, чтобы вся логика находилась в файле "tableWorker.js"
	for (var i = 0; i < currentTable.rows.length; i++) {
		currentTable.rows[i].addEventListener('click', function (e) {

			if (this.rowIndex == 0) {

				_tableWorker.tableWorker.cleanTable(currentTable);
				_tableWorker.tableWorker.fillTable(currentTable, localStorageKey, e.target.dataset.objectKeyBind);
			}
			console.log('\u0418\u043D\u0434\u0435\u043A\u0441 \u0441\u0442\u0440\u043E\u043A\u0438 =  ' + this.rowIndex);
		});
	}
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
function tag(tagName) {
	return document.getElementsByTagName(tagName);
}

exports.$ = $;
exports.tag = tag;

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
// Добавлять строки, редактировать,удалять, заполнять таблицу

/** @module tableWorker */

var tableWorker = exports.tableWorker = {

	// ---------------------------------------------------------------------------
	/**
  * @todo Необходимо реализовать перегрузку функции, чтобы она принимала либо массив, либо строку-"ключ" LocalStorage  (Подробнее — https://habr.com/ru/post/86403/)
  * @description  Метод заполняет указанную таблицу, взяв данные с LocalStorage по ключу, либо указанным массивом объектов.
  * @param {Object} table Таблица, кототую необходимо заполнить
  * @param {Array} keyOrArrayOfObjects Ключ либо массив с данными (с объектами)
  * @param {string} sortMark поле, по которому будет происходить сортировка объектов
  * @return {void} Ничего не возвращает
  */
	fillTable: function fillTable(table, keyOrArrayOfObjects, sortMark) {

		// Если в параметре (№2) указан ключ — метод достает значения из LocalStorage и заполняет таблицу.
		if (typeof keyOrArrayOfObjects == "string") {

			var _arrayofData = this.getTableData(keyOrArrayOfObjects, sortMark);

			// Проверка на незаполненную таблицу
			if (_arrayofData == false) {
				return false;
			}

			for (var i = 0; i < _arrayofData.length; i++) {

				this.addInfoInRow(table, this.addRow(table).rowIndex, _arrayofData[i]);
			}
			return;

			// Если в параметре (№2) указан объект с данными — метод заполняет таблицу этим объектом.
		} else if ((typeof keyOrArrayOfObjects === "undefined" ? "undefined" : _typeof(keyOrArrayOfObjects)) == "object") {

			for (var _i = 0; _i < keyOrArrayOfObjects.length; _i++) {
				this.addInfoInRow(table, this.addRow(table).rowIndex, arrayofData[_i]);
			}
			return;
		}
	},


	// ---------------------------------------------------------------------------
	/**
  * Метод позволяет получить данные с LocalStorage для заполнения таблицы.  
  * @param {String} key ключ от объекта в LocalStorage
  * @return {Object} Возвращает распарсенный массив объектов, которым можно заполнить таблицу (jsonObject)
  */
	getTableData: function getTableData(key, sortMark) {

		var flag = void 0;

		// ! Закончил тут. Вернуть этой функцией отсотрированный массив по критерию "sortMark" 
		function compare(a, b) {
			if (a[sortMark] > b[sortMark]) return 1; // если первое значение больше второго
			if (a[sortMark] == b[sortMark]) return 0; // если равны
			if (a[sortMark] < b[sortMark]) return -1; // если первое значение меньше второго
		}

		// Если есть JSON-данные по переданному ключу (аргумент "key" в LocalStorage) — тогда возвращаем подготовленные данные, если JSON не найден — возвращаем false.
		if (localStorage.getItem(key)) {

			var jsonObject = window.localStorage.getItem(key);

			jsonObject = JSON.parse(jsonObject);

			flag = jsonObject.some(function (element) {
				return element.hasOwnProperty(sortMark);
			});

			if (flag) {
				jsonObject.sort(compare);
				return jsonObject;
			} else if (sortMark == undefined) {
				return jsonObject;
			} else {
				throw "Ключ, переданный для сортировки — не верный. Такого свойства у объекта нет.";
			}
		} else {
			return false;
		}
	},


	// ---------------------------------------------------------------------------
	/**
  * Метод, который добавляет ряды с ячейками в таблицу
  * @todo Реализовать эту функцию так, чтобы не получалось замыкание. (Чтобы не использовалась внутреняя функция)
  * @param {Object} table Таблица, в которую необходимо добавить ряд(ы)	 
  * @param {Object} data Данные, которые необходимо добавить в ряд(ы)
  * @param {Number} numberOfRows Кол-во рядов (по умолчанию = 1)
  * @param {Number} numberOfCells Кол-во ячеек в ряде (По умолчанию высчитывается по кол-ву ячеек в заголовке (thead))
  * @return {arrayofRows} Возвращает созданный массив строк (либо 1 строку) с данными.
  */

	addRow: function addRow(table, data) {
		var numberOfRows = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
		var numberOfCells = arguments[3];

		var arrayofRows = [];

		// Эта функция собственно и добавляет ряд, ячейки и текст в таблицу. Принимает контекст, и возвращает массив с созданными строками
		function add(context) {
			// Цикл добавляеи по 1-й строке то кол-во, которое мы укажем (numberOfRows)
			for (var i = 0; i < numberOfRows; i++) {

				var row = document.createElement("tr");
				table.appendChild(row);

				// Цикл добавляет по 1-й ячейке то кол-во, которое мы укажем (numberOfCells)
				for (var j = 0; j < numberOfCells; j++) {

					var cell = document.createElement("td");
					row.appendChild(cell);

					// Добавляем текст в ячейку переданным параметром
					// cell.innerHTML = textInCell;
				}
				arrayofRows.push(row);

				if (data) {

					context.addInfoInRow(table, row.rowIndex, data);
				}
			}
			return arrayofRows;
		}

		// Проверка на наличие аргумента "numberOfCells", если его нет— за количестко ячеек считается количество ячеек в самом первом ряду (в "thead");
		if (numberOfCells == undefined) {
			numberOfCells = table.rows[0].cells.length;
		}

		// Этот способ будет использоваться чаще всего и возвращать 1 созданный ряд с данными.
		if (numberOfRows == 1) {

			var row = add(this);
			return row[0];
		}
		return add(this);
	},


	// ---------------------------------------------------------------------------
	/**
  * Это основной метод, который заполняет целый ряд таблицы. Использует метод "addInfoInCell", который заполняет каждую ячейку
  * @param {Object} table Таблица, в которой будет заполнятся ряд
  * @param {Number} indexOfRow Индекс ряда в таблице, который будет заполнятся данными 
  * @param {Object} object Объект с данными для заполнения ряда. 
  * @return {void} Ничего не возвращает
 */
	addInfoInRow: function addInfoInRow(table, indexOfRow, object) {

		for (var k = 0; k < table.rows[indexOfRow].cells.length; k++) {

			this.addInfoInCell(table, object, indexOfRow, k);
		}
	},


	// ---------------------------------------------------------------------------
	/**
  * Метод заполняет одну указанную ячейку в указанном ряде таблицы.Метод переберает объект на подходящее свойство и помещает значение этого свойства в ячейку таблицы. Нужен для работы метода addInfoInRow
  * @param {Object} table Таблица, в которой будет заполнятся ячейка
  * @param {Object} object Объект с данными для заполнения ячейки.
  * @param {Number} indexOfRow Индекс ряда, в котором находится нужная для заполнения ячейка
  * @param {Number} indexOfCell Индекс ячейки, которая будет заполнятся.
  * @return {void} Ничего не возвращает
  */
	addInfoInCell: function addInfoInCell(table, object, indexOfRow, indexOfCell) {

		for (var key in object) {
			if (object.hasOwnProperty(key)) {

				// Если ключ объекта равняется тому, что вернул метот "whatHead" — значение из объекта заполняется в заранее заданную ячейку
				if (key.toLowerCase() === this.whatObjectKey(table, indexOfCell).toLowerCase()) {

					table.rows[indexOfRow].cells[indexOfCell].innerHTML = object[key];
				}
			}
		}
	},

	// -----------------------------------------------------------------------------
	/**
  * Метод вычисляет, какой заголовок находиться над указанной ячейкой (Заголовок колонки). Нужен для работы метода "addInfoInCell"
  * @param {Object} table Таблица, в которой необходимо вычислить заголовок для указанной ячейки
  * @param {Number} indexOfCell Индекс ячейки
  * @return {String}  Возвращает название заголовка над ячейкой.
  * @see addInfoInCell
  */
	whatObjectKey: function whatObjectKey(table, indexOfCell) {

		// Получаем значение из атрибута "data-object-key-bind" в заголовочной ячейки
		var nameOfTableHead = table.rows[0].cells[indexOfCell].dataset.objectKeyBind;
		return nameOfTableHead;
	},
	cleanTable: function cleanTable(table) {
		while (table.rows.length > 1) {
			table.deleteRow(table.rows.length - 1);
		}
	}
};

/***/ })

/******/ });
//# sourceMappingURL=indexAuthor.js.map