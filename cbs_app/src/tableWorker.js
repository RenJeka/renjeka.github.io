
// Тут находятся все функции для работы с таблицами.
// Добавлять строки, редактировать, ...

export let tableWorker = {
	// -----------------------------------------------------------------------------------
	// Метод, который добавляет ряды с ячейками в таблицу
	addRow(table, numberOfRows = 1, numberOfCells, textInCell = "") {
		
		let arrayofRows = [];

		// Эта функция собственно и добавляет ряд, ячейки и текст в таблицу
		// (Не знаю, как сделать этот метод без внутренней функции)
		function add() {
			// Цикл добавляеи по 1-й строке то кол-во, которое мы укажем (numberOfRows)
			for (let i = 0; i < numberOfRows; i++) {
				let row = document.createElement("tr")
				table.appendChild(row)

				// Цикл добавляет по 1-й ячейке то кол-во, которое мы укажем (numberOfCells)
				for (let j = 0; j < numberOfCells; j++) {
					let cell = document.createElement("td")
					row.appendChild(cell)

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

			let row = add()
			return row[0];
		}
		
		// Метод возвращает массив с созданными рядами (массив созданных рядов)
		return add();
	},
	// -----------------------------------------------------------------------------------
	// Метод заполняет одну указанную ячейку в указанном ряде таблицы. Данные берутся с переданного объекта. Функция переберает объект на подходящее свойство и помещает значение этого свойства в ячейку таблицы. Нужна для функции addInfoInRow
	addInfoInCell(table, object, indexOfRow, indexOfCell ) {

		for (const key in object) {
			if (object.hasOwnProperty(key)) {
				if (key.toLowerCase() === this.whatHead(table, indexOfCell).toLowerCase()){
					table.rows[indexOfRow].cells[indexOfCell].innerHTML = object[key];
					console.dir(key);
				}
			}
		}
	},
	// -----------------------------------------------------------------------------------
	// Метод вычисляет, какой заголовок находиться над указанной ячейкой (Заголовок колонки). Нужна для функции "addInfoInCell"
	whatHead(table, indexOfCell) {

		let nameOfTableHead = table.rows[0].cells[indexOfCell].innerHTML;
		return nameOfTableHead;
	},
	// -----------------------------------------------------------------------------------
	// Это основной метод, который заполняет целый ряд таблицы. Использует метод "addInfoInCell".
	addInfoInRow(table, indexOfRow, object) {

		for (let k = 0; k < table.rows[indexOfRow].cells.length; k++) {

			this.addInfoInCell(table, object, indexOfRow, k)
		}
	},
	// -----------------------------------------------------------------------------------

	fillTable(table) {

		let arrayOfObjects
	}



}

