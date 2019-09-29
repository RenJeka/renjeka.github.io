window.addEventListener("load", () =>{
	function $(selector) {
		return document.querySelector(selector);
	}

	let myTable1 = $('.myTable1');

	console.dir(myTable1);
	console.log(myTable1.rows);

	function addRow(table, numberOfRows, numberOfCells, textInCell) {

		for (let i = 0; i < numberOfRows; i++) {
			let row = document.createElement("tr")
			let cell = document.createElement("td")
			console.dir(row);
			console.dir(cell);
			for (let j = 0; j < numberOfCells; j++) {
				row.cells.push(cell)
				row.cells[j].innerText = textInCell;
				
			}
			table.appendChild(row)
			
		}
	}

	addRow(myTable1,3,3, "any")




})