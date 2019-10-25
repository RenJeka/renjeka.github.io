import { $ } from "./myHelperLib";
import { formHandler } from "./formHandler";


/**
 * Класс для создания объекта "Таблица"
 * Объект таблица является Наблюдаемым объектом (Observable)
 * 
 * @constructor
 * 
 * @property {object} currentTable Текущая таблица, которая связывается с объектом
 * @property {} localStorageKey
 * @property {} tableData
 * 
 * @method  fillTable 
 */
export class Table{

	/**
	 * Конструктор. Создает объект -- таблица, которая подвязывается под 1 HTML-таблицу
	 * @param {String} currentTable CSS -селектор для нахождения нужной (связанной таблицы)
	 * @param {object} form форма, к которой привязана данная таблица.
	 * @param {Array} tableData -- Массив объектов, которыми будет заполнятся таблица
	 * @param {Array} arrayOfObservers --Список подписчиков
	 */
	constructor(currentTable,form,tableData){
		this.currentTable = $(currentTable);
		this.boundForm = form;
		this.localStorageKey = formHandler.getLocalStorageKey(form);
		this.tableData = tableData;
		this.arrayOfObservers = [];
	}

	/**
	 * Метод добавляет подписчика в массив подписчиков (паттерн Observer)
	 * @param {object} observer Подписчик на изменения свойства "tableData"
	 */
	addObserver(observer){
		this.arrayOfObservers.push(observer);
	}

	/**
	 * Метод вызывает метод подписчика (паттерн Observer)
	 */
	notify(){
		this.arrayOfObservers.forEach(element => {
			element.observerUpdate(this.currentTable, this.localStorageKey, this.tableData)
		});
	}


// ---------------------------------------------------------------------------
	/**
	 * @todo Необходимо реализовать перегрузку функции, чтобы она принимала либо массив, либо строку-"ключ" LocalStorage  (Подробнее — https://habr.com/ru/post/86403/)
	 * @description  Метод заполняет указанную таблицу, взяв данные с LocalStorage по ключу, либо указанным массивом объектов.
	 * @return {void} Возвращает массив с данными, которыми была заполнена таблица.
	 */
	fillTable(sortMark,sortDirection) {
	
		// Если у нас есть связанная таблица и готовый массив с данными для заполнения таблицы
		if (this.currentTable && this.tableData) {
			
			// Заполняем таблицу данными
			for (let i = 0; i < this.tableData.length; i++) { // ? ForEach? 
				this.addRows(this.tableData[i]).rowIndex; 
			}

			//Возвращаем массив, которым заполнили таблицу
			return this.tableData;

		// Если у нас есть связанная таблица и ключ от localStorage
		}else if (this.currentTable && this.localStorageKey) {

			// Достаем данные из localStorage
			this.tableData = this.getTableData(sortMark,sortDirection); // ! sort --> [sortMark,sortDirection]

			// Проверка на наличие данных в localStorage //TODO Проверить, правильная ли проверка
			if (this.tableData == false) {

				// Если в localStorage пустой массив -- возвращаем false
				return false; 
			}

			// Заполняем таблицу данными
			for (let i = 0; i < this.tableData.length; i++) { // ? ForEach? 
				this.addRows(this.tableData[i]).rowIndex; 
			}

			//Возвращаем массив, которым заполнили таблицу
			return this.tableData;

		}else{

			// Если таблица не подвязана -- выброс исключения
			if (currentTable == false) {
				throw `Не найдена связанная HTML-таблица. Пожалуйста добавьте HTML-таблицу в свойство ${this}.currentTable `;

			// Если у нас нет ни массива с данными, ни ключа localStorage -- выброс исключения
			}else if (this.localStorageKey == fasle && this.tableData == fasle) {
				
				throw `Не найдены данные для заполнения HTML-таблицы. Пожалуйста добавте данные. Если у вас массив с данными -- добавьте этот массив в свойство  ${this}.tableData, если у вас данные в LocalStorage -- добавте ключ к данным в свойство ${this}.localStorageKey`;
			}
		}
	}
// ---------------------------------------------------------------------------
	/**
	 * Метод позволяет получить данные с LocalStorage для заполнения таблицы.  
	 * @param {String} sortMark Поле объекта, по которому будет производится сортировка
	 * @param {Boolean} sortDirection Флаг для направления сортировки (прямая или обратная сортировка)
	 * @return {Object} Возвращает распарсенный массив объектов, которым можно заполнить таблицу (jsonObject)
	 */
	getTableData(sortMark,sortDirection) { 

		let jsonObject = window.localStorage.getItem(this.localStorageKey);
		let flag;

		

		// Определяем функцию для сравнения (как будет сортироваться массив)
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

		// Если есть JSON-данные по переданному ключу — тогда возвращаем подготовленные данные, если JSON не найден — возвращаем false.
		if (jsonObject) {

			// Парсим данные из localStorage. Получаем массив с объектами
			jsonObject = JSON.parse(jsonObject);

			// Если поле для сортировки "sortMark" соответствует свойству в объекте
			if (jsonObject.some((elem)=>elem[sortMark])) {

				//Возвращаем отсортированный массив по заранее заданной функции
				return jsonObject.sort(compare) // !>>>>>>>>

			// Если мы не передали поле для сортировки "sortMark" — Возвращаем неотсортированный массив.
			}else if(sortMark == undefined){
				return jsonObject;

			// Если поле для сортировки "sortMark" не верное — выбрасываем исключение. 
			}else{
				throw "Значение, переданное для сортировки — не верное. Такого свойства у объекта нет."
			}

		}else {
			return false;
		}
	}

// ---------------------------------------------------------------------------
	/**
	 * Метод, который добавляет ряды с ячейками в таблицу
	 * @todo Реализовать эту функцию так, чтобы не получалось замыкание. (Чтобы не использовалась внутреняя функция)
	 * @param {Object} table Таблица, в которую необходимо добавить ряд(ы)
	 * @param {object} dataInRow Данные для 1 строки (1 объект)	 
	 * @param {Number} numberOfRows Кол-во рядов (по умолчанию = 1)
	 * @param {Number} numberOfCells Кол-во ячеек в ряде (По умолчанию высчитывается по кол-ву ячеек в заголовке (thead))
	 * @return {arrayofRows} Возвращает созданный массив строк (либо 1 строку) с данными.
	 */
	addRows(dataInRow, numberOfRows = 1, numberOfCells) {
		
		let arrayofRows = [], // Массив будущих строк
			row; // Текущая строка

		// Эта функция собственно и добавляет ряд, ячейки и текст в таблицу. Принимает контекст, и возвращает массив с созданными строками
		function add(context) {
			
			// Цикл добавляеи по 1-й строке то кол-во, которое мы укажем (numberOfRows)
			for (let i = 0; i < numberOfRows; i++) {

				row = document.createElement("tr")
				context.currentTable.appendChild(row)

				// Цикл добавляет по 1-й ячейке то кол-во, которое мы укажем (numberOfCells)
				for (let j = 0; j < numberOfCells; j++) {

					let cell = document.createElement("td")
					row.appendChild(cell)
				}

				arrayofRows.push(row);
				
				if (dataInRow) {
					context.addInfoInRow(row.rowIndex, dataInRow);
				}
			}

			return arrayofRows;
		}

		// Проверка на наличие аргумента "numberOfCells", если его нет— за количестко ячеек высчитывается из количества ячеек первого ряда (из "thead");
		if (numberOfCells == undefined) {
			numberOfCells = this.currentTable.rows[0].cells.length;
		}

		// Этот способ будет использоваться чаще всего и возвращать 1 созданный ряд с данными.
		if (numberOfRows == 1) {

			arrayofRows = add(this) // ? return add(this)[0] -- попробовать вернуть это
			return arrayofRows[0];
		}
		return add(this);
	}


// ---------------------------------------------------------------------------
	/**
	 * Это основной метод, который заполняет целый ряд таблицы. Использует метод "addInfoInCell", который заполняет каждую ячейку
	 * @param {Number} indexOfRow Индекс ряда в таблице, который будет заполнятся данными 
	 * @param {Object} object Объект с данными для заполнения ряда. 
	 * @return {void} Ничего не возвращает
	*/
	addInfoInRow(indexOfRow, object) {

		for (let i = 0; i < this.currentTable.rows[indexOfRow].cells.length; i++) {
			this.addInfoInCell(object, indexOfRow, i)
		}
	}

// ---------------------------------------------------------------------------
	/**
	 * Метод заполняет одну указанную ячейку в указанном ряде таблицы.Метод переберает объект на подходящее свойство и помещает значение этого свойства в ячейку таблицы. Нужен для работы метода addInfoInRow
	 * @param {Object} object Объект с данными для заполнения ячейки.
	 * @param {Number} indexOfRow Индекс ряда, в котором находится нужная для заполнения ячейка
	 * @param {Number} indexOfCell Индекс ячейки, которая будет заполнятся.
	 * @return {void} Ничего не возвращает
	 */
	addInfoInCell(object, indexOfRow, indexOfCell) {

		for (const key in object) {
			if (object.hasOwnProperty(key)) {

				// Если ключ объекта равняется тому, что вернул метот "getTableColumnHead" — значение из объекта заполняется в заранее заданную ячейку
				if (key.toLowerCase() === this.getTableColumnHead(indexOfCell).toLowerCase()){

					this.currentTable.rows[indexOfRow].cells[indexOfCell].innerHTML = object[key];

					// Возвращаем заполненную ячейку
					return this.currentTable.rows[indexOfRow].cells[indexOfCell]
				}
			}
		}
	}

// -----------------------------------------------------------------------------
	/**
	 * Метод вычисляет, какой заголовок находиться над указанной ячейкой (Заголовок колонки). Нужен для работы метода "addInfoInCell"
	 * @param {Number} indexOfCell Индекс ячейки
	 * @return {String} Возвращает название заголовка над ячейкой.
	 * @see addInfoInCell
	 */
	getTableColumnHead(indexOfCell) {

		// Получаем значение из атрибута "data-object-key-bind" в заголовочной ячейки
		let nameOfTableHead = this.currentTable.rows[0].cells[indexOfCell].dataset.objectKeyBind;
		return nameOfTableHead;
	}


}