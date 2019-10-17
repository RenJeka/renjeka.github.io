
// Тут находятся все функции для работы с таблицами.
// Добавлять строки, редактировать,удалять, заполнять таблицу

/** @module tableWorker */

export let tableWorker = {

	// ---------------------------------------------------------------------------
	/**
	 * @todo Необходимо реализовать перегрузку функции, чтобы она принимала либо массив, либо строку-"ключ" LocalStorage  (Подробнее — https://habr.com/ru/post/86403/)
	 * @description  Метод заполняет указанную таблицу, взяв данные с LocalStorage по ключу, либо указанным массивом объектов.
	 * @param {Object} table Таблица, кототую необходимо заполнить
	 * @param {Array} keyOrArrayOfObjects Ключ либо массив с данными (с объектами)
	 * @return {void} Ничего не возвращает
	 */
	fillTable(table, keyOrArrayOfObjects, filterMark) {

		// Если в параметре (№2) указан ключ — метод достает значения из LocalStorage и заполняет таблицу.
		if (typeof keyOrArrayOfObjects == "string") {
			
			// Проверка на незаполненную таблицу
			if (this.getTableData(keyOrArrayOfObjects, filterMark) ===false) {
				return false;
			}

			let arrayofData = this.getTableData(keyOrArrayOfObjects);

			for (let i = 0; i < arrayofData.length; i++) {

				this.addInfoInRow(
					table, 
					this.addRow(table).rowIndex, 
					arrayofData[i]
				);
			}
			return;
			
		// Если в параметре (№2) указан объект с данными — метод заполняет таблицу этим объектом.
		}else if(typeof keyOrArrayOfObjects == "object"){

			for (let i = 0; i < keyOrArrayOfObjects.length; i++) {
				this.addInfoInRow(
					table, 
					this.addRow(table).rowIndex, 
					arrayofData[i]
				);
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
	getTableData(key, filterMark = 'id'){

		// ! Закончил тут. Вернуть этой функцией отсотрированный массив по критерию "filterMark" 
		// function compare(a, b) {
		// 	if (a > b) return 1; // если первое значение больше второго
		// 	if (a == b) return 0; // если равны
		// 	if (a < b) return -1; // если первое значение меньше второго
		//   }


		// Если есть JSON-данные по переданному ключу (аргумент "key" в LocalStorage) — тогда возвращаем подготовленные данные, если JSON не найден — возвращаем false.
		if (localStorage.getItem(key)) {

			let jsonObject = window.localStorage.getItem(key);

			jsonObject =  JSON.parse(jsonObject);

			jsonObject.sort()
			return jsonObject;

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
}

