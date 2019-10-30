import { $ } from "./myHelperLib";

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
	 * @param {object} formObject Объект формы, созданный классом "Form"
	 * @param {Array} tableData -- Массив объектов, которыми будет заполнятся таблица
	 * @param {Array} arrayOfObservers --Список подписчиков
	 */
	constructor(currentTable,formObject,tableData){
		this.currentTable = $(currentTable);
		this.formObject = formObject;
		this.boundForm = formObject.currentForm;
		this.localStorageKey = formObject.localStorageKey
		this.tableData = tableData;
		this.arrayOfObservers = [];
		this.sortMark;
		this.sortDirection = true;
		this.otherRowSelectHandler;
		this.selectedObject;
	}

	/**
	 * Метод добавляет подписчика в массив подписчиков (паттерн Observer)
	 * @param {object} observers (rest-параметр) Подписчики (наблюдатели) за изменениями
	 */
	addObservers(...observers){
		observers.forEach(element => {
			this.arrayOfObservers.push(element);
		});
		
	}

	/**
	 * Метод вызывает метод подписчика (паттерн Observer). Этот метод создаваля для синхронизации параметра "tableData" и обработчика выбора строки "rowSelectHandler". Здесь объект класа Table ОДНОВРЕМЕННО и ИЗДАТЕЛЬ и ПОДПИСЧИК.
	 */
	notify(){
		this.arrayOfObservers.forEach(element => {
			element.observerUpdate({currentTable: this.currentTable, localStorageKey: this.localStorageKey, tableData: this.tableData, selectedObject: this.selectedObject})
		});
		// console.log(`selectedObject = `, this.selectedObject);
	}
	
// -----------------------------------------------------------------------------
	/**
	 * Метод update паттерна Observer
	 */
	observerUpdate(){

		// this.currentTable.removeEventListener("click", this.rowSelectHandler)

		if (this.otherRowSelectHandler) {
			this.currentTable.onclick = this.otherRowSelectHandler.bind(this);
		}else{
			this.currentTable.onclick = this.rowSelectHandler.bind(this);
		}

		// TODO Разобраться с обработчиком событий. 
		// Необходимо поставить обработчик событий на нажатие строчки, но с обновлением через Observer. 
		// Необходимо удалить старый и установить новый обработчик, как только данные в таблице изменятся. (меняется значение TableData)
		// Необходимо установить маркер на количество обработчиков событий, чтобы понять -- сколько я запускаю иенно ОБРАБОТЧИКОВ а не фенкция, которую этот обработчик запускает. 
		// Попробовать поэксперементировать со стрелочной функцией и контекстом, чтобы он не терялся.
		
	}

// ---------------------------------------------------------------------------
	/**
	 * @todo Необходимо реализовать перегрузку функции, чтобы она принимала либо массив, либо строку-"ключ" LocalStorage  (Подробнее — https://habr.com/ru/post/86403/)
	 * @description  Метод заполняет указанную таблицу, взяв данные с LocalStorage по ключу, либо указанным массивом объектов.
	 * @return {void} Возвращает массив с данными, которыми была заполнена таблица.
	 */
	fillTable(sortMark,sortDirection) {
	
		if (sortMark) {
			this.sortMark = sortMark;
		}
		if (sortDirection) {
			this.sortDirection = sortDirection;
		}
		
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
			this.tableData = this.getTableData();

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
			if (this.currentTable == false) {
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
	getTableData() { 

		let jsonObject = localStorage.getItem(this.localStorageKey);

		// Если есть JSON-данные по переданному ключу — тогда возвращаем подготовленные данные, если JSON не найден — возвращаем false.
		if (jsonObject) {

			// Парсим данные из localStorage. Получаем массив с объектами
			jsonObject = JSON.parse(jsonObject);

			// Если поле для сортировки "this.sortMark" соответствует свойству в объекте
			if (jsonObject.some((elem)=>elem[this.sortMark])) {

				//Возвращаем отсортированный массив по заранее заданной функции
				return jsonObject.sort(this.sortFunc1.bind(this)) 

			// Если нет значения для сортировки "this.sortMark" — Возвращаем неотсортированный массив.
			}else if(this.sortMark == undefined){
				return jsonObject;

			// Если значения для сортировки "this.sortMark" не верное — выбрасываем исключение. 
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

// -----------------------------------------------------------------------------
	/**
	 * Метод полностью очищает таблицу 
	 * @param {number} indexOfRow Индекс строки, которую нужно удалить
	 */
	cleanTable(indexOfRow){

		indexOfRow = parseInt(indexOfRow);

		if (indexOfRow) {
			// Проверка, правильно ли введен индекс строки
			if (indexOfRow <= this.currentTable.rows.length -1  && indexOfRow >= 0) {

				// Удаляем строку по индексу "indexOfRow"
				this.currentTable.deleteRow(indexOfRow)
			}else{
				throw "Невозможно удалить строку. Такой строки не существует. Проверьте правильность передаваемого в параметр значения."
			}
		}else{
			// Запускаем цикл на иттераций равную кол-во строк в таблице. Каждый раз удаляем последнюю строку.
			while (this.currentTable.rows.length > 1) {
				this.currentTable.deleteRow(this.currentTable.rows.length - 1);
			}
		}
	}

// -----------------------------------------------------------------------------
	/**
	 * Метод поиска. Фильтрует массив по значению input.value, и возвращает его.
	 * @param {object} input Элемент, в который вводится фильтрирующее значение.
	 * @param {string} objectProperty свойство (название свойства) объекта, по которому будет фильтрация.
	 * @return {Array} Возвращает отфильтнованный массив.
	 */
	search(input, objectProperty){
		let tempVariable;
		this.tableData = this.getTableData();

		if(this.tableData){

			tempVariable = this.tableData.filter(element => {

				// Переводим значение свойства объекта в нижний регистр 
				let tempProperty = element[objectProperty].trim().toLowerCase();
				// Если "tempProperty" содержит то, что мы ввели в "input" -- значит это искомое значение.
				return tempProperty.includes(input.value.trim().toLowerCase());
			});
			return tempVariable;
			  
		}else{
			console.log ("Не удалось найти массив с данными")
			return false;
		}
		
	}


// -----------------------------------------------------------------------------

	/**
	 * Метод запускает обработчик события по клику на строку. Можно подвесить свой обработчик (callbackHandler)
	 * @callback callbackHandler Функция, которая ставится в качестве обработчика на нажатие по таблице. (По умолчанию this.rowSelectHandler)
	 */
	tableClickHandler(callbackHandler){

		this.otherRowSelectHandler = callbackHandler;

		if (this.otherRowSelectHandler) {
			this.currentTable.onclick = this.otherRowSelectHandler.bind(this);
		}else{
			this.currentTable.onclick = this.rowSelectHandler.bind(this);
		}
	}

// -----------------------------------------------------------------------------
	/**
	 * Метод обрабатывает клик по строке. Его задача отсортировать таблицу, если клик был по заголовку, и вернуть строку, если клик был по любой другой строке
	 * @todo Ножна ли тут переменная "returnedValue" ?
	 * @param {object} eventObject Объект события, который передается при клике.
	 * @return {object} Возвращщает массив с данными после сортировки, либо объект, на который кликнул пользователь.
	 */
	rowSelectHandler(eventObject){

		let returnedValue; // Значение, которое возвращает этот метод.
		
		this.sortMark = eventObject.target.dataset.objectKeyBind;
			
		// Проверка, если есть атрибут "objectKeyBind" у HTML элемента -- сортируем таблицу
		if (this.sortMark && eventObject.target.tagName == "TH") {

			this.sortDirection = !this.sortDirection;
			
			// Сортируем текущие данные. (Учитывая потерю контекста)
			this.tableData.sort(this.sortFunc1.bind(this));

			// Очищаем всю таблицу
			this.cleanTable();

			// Заполняе новыми значениями (с учетом сортировки)
			returnedValue = this.fillTable();
			this.tableData = returnedValue;
			this.selectedObject = null;

		// Если пользователь кликнул по строке с данными -- находим индекс строки и возвращаем объект с массива объектов (по этому индексу)
		}else if(eventObject.target.tagName == "TD"){
			returnedValue = this.tableData[eventObject.target.parentElement.rowIndex -1];
			this.selectedObject = returnedValue;
			this.formObject.fillForm(this.selectedObject)

			this.setClassToElement(eventObject.target.parentElement, "row-selected")
		}

		// по окончанию метода запускаем метод паттерна "observer" -- notify() чтобы обновить все данные.
		this.notify();

		// ! При первом добавлении объектов, и при дальнейшем выборе их возвращается "returnedValue" = underfined
		console.log(returnedValue);
		return returnedValue;

	}

	/**
	 * Метод, который проходится по таблице и применяет стиль к 1 конкретному ряду (строке).
	 * @param {object} row Ряд к которому необходимо применить клас
	 * @param {string} applyingСlass css клас, который нужно применить к ряду.
	 */
	setClassToElement(row, applyingСlass){
		for (let i = 0; i<this.currentTable.rows.length ; i++) {
			this.currentTable.rows[i].className = "";
			if (this.currentTable.rows[i] == row) {
				this.currentTable.rows[i].className = applyingСlass;
			}
		}
	}


	//=============================================
	//  TODO Как установить правильно класс элементу,    
	//=============================================

	/**
	 * Метод, который передается в сортировку массива. Сортирует значения по возрастанию, либо по убыванию в зависимости от значения "this.sortDirection".
	 * 
	 * @param {object} a Первый параметр для сравнения со вторым
	 * @param {object} b Второй параметр для сравнения с первым.
	 */
	sortFunc1(a, b) { 

		if (this.sortDirection) {
			if (a[this.sortMark] >  b[this.sortMark]) return 1; // если первое значение больше второго
			if (a[this.sortMark] == b[this.sortMark]) return 0; // если равны
			if (a[this.sortMark] <  b[this.sortMark]) return -1; // если первое значение меньше второго
		}else{
			if (a[this.sortMark] <  b[this.sortMark]) return 1; 
			if (a[this.sortMark] == b[this.sortMark]) return 0;
			if (a[this.sortMark] >  b[this.sortMark]) return -1;
		}	
	}


}