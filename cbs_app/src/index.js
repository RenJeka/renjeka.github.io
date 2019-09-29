window.addEventListener("load", () =>{
	function $(selector) {
		return document.querySelector(selector);
	}

	// Функция, которая добавляет ряды и ячейки в таблицу
	function addRow(table, numberOfRows, numberOfCells, textInCell) {

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
	}

	// Функция заполняет одну указанную ячейку в указанном ряде таблицы. Данные берутся с переданного объекта. Функция переберает объект на подходящее свойство и помещает значение этого свойства в ячейку таблицы.
	function addInfo(table, object, numberOfRow, numberOfCell  ) {

		for (const key in object) {
			if (object.hasOwnProperty(key)) {
				if (key.toLowerCase() === whatHead(table, numberOfCell).toLowerCase()){
					table.rows[numberOfRow].cells[numberOfCell-1].innerHTML = object[key];
					console.dir(key);
				}
			}
		}
	}

	// Функция вычисляет, какой заголовок находиться над указанной ячейкой (Заголовок колонки)
	function whatHead(table, NumberOfCell) {
		let nameOfTableHead;

		nameOfTableHead = table.rows[0].cells[NumberOfCell-1].innerHTML;

		return nameOfTableHead;

	}


	//============================================================================
	// Начало программы — вызов функции

	let myTable1 = $('.myTable1');
	
	console.dir(myTable1);
	console.log(myTable1.rows);

	addRow(myTable1,3,3, "any")

	
	console.log(whatHead(myTable1,3));

	let book1 ={
		id:332,
		name: "book1",
		author: "Jeka",
		pages: 225,
		somedata: "hihihi"

	}
	
	addInfo(myTable1, book1, 4,3);
	
})