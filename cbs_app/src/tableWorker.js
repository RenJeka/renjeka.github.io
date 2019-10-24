
// Тут находятся все функции для работы с таблицами.
// Добавлять строки, редактировать,удалять, заполнять таблицу

/** @module tableWorker */

export let tableWorker = {

	// ---------------------------------------------------------------------------
	/**
	 * @todo Необходимо реализовать перегрузку функции, чтобы она принимала либо массив, либо строку-"ключ" LocalStorage  (Подробнее — https://habr.com/ru/post/86403/)
	 * @description  Метод заполняет указанную таблицу, взяв данные с LocalStorage по ключу, либо указанным массивом объектов.
	 * @param {Object} table Таблица, кототую необходимо заполнить
	 * @param {String} keyOrArrayOfObjects Ключ либо массив с данными (с объектами)
	 * @param {Array} sort rest-параметр. Для сортировки массива. [<по какому полю сортировка>:string, <прямая или обратная сортировка:boolean>]
	 * @return {void} Возвращает массив с данными, которыми была заполнена таблица.
	 */
	fillTable(table, keyOrArrayOfObjects, ...sort) {
	
		// Если в параметре (№2) указан ключ — метод достает значения из LocalStorage и заполняет таблицу.
		if (typeof keyOrArrayOfObjects == "string") {
			
			let arrayOfData = this.getTableData(keyOrArrayOfObjects, sort);

			// Проверка на незаполненную таблицу
			if (arrayOfData == false) {
				return false;
			}

			for (let i = 0; i < arrayOfData.length; i++) {

				this.addInfoInRow(
					table, 
					this.addRow(table).rowIndex, 
					arrayOfData[i]
				);
			}
			return arrayOfData;
			
		// Если в параметре (№2) указан массив с данными (массив с объектами) — метод заполняет таблицу этим объектом.
		}else if(typeof keyOrArrayOfObjects == "object"){

			for (let i = 0; i < keyOrArrayOfObjects.length; i++) {
				this.addInfoInRow(
					table, 
					this.addRow(table).rowIndex, 
					keyOrArrayOfObjects[i]
				);
			}
			return keyOrArrayOfObjects;
		}
	},

	// ---------------------------------------------------------------------------
	/**
	 * Метод позволяет получить данные с LocalStorage для заполнения таблицы.  
	 * @param {String} key ключ от объекта в LocalStorage
	 * @param {String} sortMark Поле объекта, по которому будет производится сортировка
	 * @param {Boolean} sortDirection Флаг для направления сортировки (прямая или обратная сортировка)
	 * @return {Object} Возвращает распарсенный массив объектов, которым можно заполнить таблицу (jsonObject)
	 */

	getTableData(key, sortArray){ 
		//TODO реализовать три нижние строчки через деструктивное присваивание 
	// getTableData(key, [sortMark, sortDirection]){ 
		let sortMark
		let sortDirection
		if (sortArray) {
			sortMark = sortArray[0];
			sortDirection = sortArray[1]
		}else{
			sortMark = undefined;
			sortDirection = undefined;
		}
		// let isSortMark;

		function compare(a, b) {
			if (sortDirection) {
				if (a[sortMark] > b[sortMark]) return 1; // если первое значение больше второго
				if (a[sortMark] == b[sortMark]) return 0; // если равны
				if (a[sortMark] < b[sortMark]) return -1; // если первое значение меньше второго
			}else{
				if (a[sortMark] < b[sortMark]) return 1; 
				if (a[sortMark] == b[sortMark]) return 0;
				if (a[sortMark] > b[sortMark]) return -1;
			}	
		  }

		// Если есть JSON-данные по переданному ключу (аргумент "key" в LocalStorage) — тогда возвращаем подготовленные данные, если JSON не найден — возвращаем false.
		if (localStorage.getItem(key)) {

			let jsonObject = window.localStorage.getItem(key);

			jsonObject =  JSON.parse(jsonObject);

			// isSortMark = jsonObject.some((element)=>element.hasOwnProperty(sortMark));

			if (sortMark) {
				jsonObject.sort(compare)
				return jsonObject;
			}else if(sortMark == undefined){
				return jsonObject;
				
			}else{
				throw "Ключ, переданный для сортировки — не верный. Такого свойства у объекта нет."
			}

		}else {
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

	addRow(table, data, numberOfRows = 1, numberOfCells) {
		let arrayofRows = [];

		// Эта функция собственно и добавляет ряд, ячейки и текст в таблицу. Принимает контекст, и возвращает массив с созданными строками
		function add(context) {
			// Цикл добавляеи по 1-й строке то кол-во, которое мы укажем (numberOfRows)
			for (let i = 0; i < numberOfRows; i++) {

				let row = document.createElement("tr")
				table.appendChild(row)

				// Цикл добавляет по 1-й ячейке то кол-во, которое мы укажем (numberOfCells)
				for (let j = 0; j < numberOfCells; j++) {

					let cell = document.createElement("td")
					row.appendChild(cell)

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

			let row = add(this)
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
	addInfoInRow(table, indexOfRow, object) {

		for (let k = 0; k < table.rows[indexOfRow].cells.length; k++) {

			this.addInfoInCell(table, object, indexOfRow, k)
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
	addInfoInCell(table, object, indexOfRow, indexOfCell ) {

		for (const key in object) {
			if (object.hasOwnProperty(key)) {

				// Если ключ объекта равняется тому, что вернул метот "whatHead" — значение из объекта заполняется в заранее заданную ячейку
				if (key.toLowerCase() === this.whatObjectKey(table, indexOfCell).toLowerCase()){

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
	whatObjectKey(table, indexOfCell) {

		// Получаем значение из атрибута "data-object-key-bind" в заголовочной ячейки
		let nameOfTableHead = table.rows[0].cells[indexOfCell].dataset.objectKeyBind;
		return nameOfTableHead;
	},
	cleanTable(table){
		while (table.rows.length > 1) {
			table.deleteRow(table.rows.length - 1);
		}
	},

	/**
	 * Метод фильтрует массив по значению input.value, и возвращает отфильтрованный массив
	 * @param {object} input Элемент, в который вводится фильтрирующее значение.
	 * @param {string} localStorageKey Ключ от локального хранилища, где лежат данные для фильтрации
	 * @param {string} objectProperty свойство (название свойства) объекта, по которому будет фильтрация.
	 * @return {Array} Возвращает отфильтнованный массив.
	 */
	search(input, localStorageKey, objectProperty){

		let data = this.getTableData(localStorageKey);
		if(data){
			return data.filter(element => element[objectProperty].includes(input.value.trim().toLocaleLowerCase()))
		}else{
			console.log ("Не удалось найти массив с данными")
			return false;
		}
		
	},

	/**
	 * Метод обрабатывает клик по строке. Его задача отсортировать таблицу, если клик был по заголовку, и вернуть строку, если клик был по любой другой строке
	 * @param {object} table Таблица, на которую необходимо повесить обработчик.
	 * @param {String} localStorageKey Ключ от базы данных (localStorage), с которой берутся данные для заполнения таблицы
	 * @return {object} Возвращщает массив с данными после сортировки, либо объект, на который кликнул пользователь.
	 */
	rowSelectHandler(table, localStorageKey, tableData, callback){
		let sortFlag = false, // Флаг для сортировки таблицы (чтобы сортировка была в 2)
			sortMark, // маркер сортировки (название свойства объекта, по которому будет происходить сортировка)
			tempFunc = callback || function () {},
			returnValue;
			console.log ("tableData in outer", tableData)
			
			// TODO Проблемма: что вернуть? Изначально идея была -- чтобы вернуть объект которым была заполнена строка (объект с массива объектов в Базе данных). Но, если следовать первому условию (мы кликнули на заголовочную ячейку) -- то таблица отсортировалась, и у нас новый массив с данными. Его нужно вернуть туда, откуда этот метод вызывался. А потом при повторном вызове этого метода, но уже когда произошел клик по строке с данными, принять этот массив данных (tableData) и вернуть конкретный объект. Т.е. по идее тут 2 разных return: Один с массивом объектов (при клике по заголовку), и другой -- просто с 1 объектом (при клике на строке с данными)
			
			table.addEventListener("click", (e)=>{
				
				sortMark = e.target.dataset.objectKeyBind;
				// console.dir(e.target.tagName)
				
				// Проверка, если есть атрибут "objectKeyBind" у HTML элемента -- сортируем таблицу
				if (sortMark && e.target.tagName == "TH") {
					sortFlag = !sortFlag;
					// Очищаем всю таблицу
					console.dir(table)
					this.cleanTable(table);
					// Заполняе новыми значениями (с учетом сортировки), и возвращаем массив данных.
					returnValue = this.fillTable(table,localStorageKey, sortMark, sortFlag);
					tableData = returnValue;
					
				}else if(e.target.tagName == "TD"){
					// Если пользователь кликнул по строке с данными -- находим индекс строки и возвращаем объект с массива объектов (по этому индексу)

					// ! Здесь проблемма. "tableData" берется со старых данных, на момент, когда единожды была вызвана ф-я "rowSelectHandler". "tableData" сдесь не обновляется. Такая-же ситуация, если происходит поиск (сортировка). "tableData" остается старым
					console.log ("tableData in inner func", tableData)
					returnValue = tableData[e.target.parentElement.rowIndex -1]
			}

			tempFunc(returnValue);
			
		})	
	},

	observerUpdate(table, localStorageKey, tableData){

		this.rowSelectHandler(table, localStorageKey, tableData);
	}
}

