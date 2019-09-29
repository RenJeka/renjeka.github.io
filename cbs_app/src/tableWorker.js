
// Тут находятся все функции для работы с таблицами.
// Добавлять строки, редактировать, ...

export let tableWorker = {
	// Функция, которая добавляет ряды и ячейки в таблицу
	addRow(table, numberOfRows, numberOfCells, textInCell) {

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
		}
	},
	// -----------------------------------------------------------------------------------
	// Функция заполняет одну указанную ячейку в указанном ряде таблицы. Данные берутся с переданного объекта. Функция переберает объект на подходящее свойство и помещает значение этого свойства в ячейку таблицы. Нужна для функции addInfoInRow
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
	// Функция вычисляет, какой заголовок находиться над указанной ячейкой (Заголовок колонки). Нужна для функции "addInfoInCell"
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

