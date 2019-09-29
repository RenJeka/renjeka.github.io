
// Тут находятся все функции для работы с таблицами.
// Добавлять строки, редактировать, ...

export let tableWorker = {
	// Метод, который добавляет ряды с ячейками в таблицу
	addRow(table, numberOfRows = 1, numberOfCells, textInCell = "") {
		
		let arrayofRows = [];

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

		if (numberOfCells == undefined) {
			numberOfCells = table.rows[0].cells.length;
		}

		if (numberOfRows == 1) {

			let row = add()
			return row[0];
			
		}
		
		return add();
		
		// Нучно, чтобы эта функция возвращала индекс ряда
		// return indexOfThisRow
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

	addInfoInRow(table, indexOfRow, object) {

		for (let k = 0; k < table.rows[indexOfRow].cells.length; k++) {
			
			this.addInfoInCell(table, object, indexOfRow, k)
		}
	}
	// -----------------------------------------------------------------------------------


}

