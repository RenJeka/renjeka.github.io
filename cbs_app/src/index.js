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
			
			console.dir(row);
			// console.dir(cell);
			// row.appendChild(cell)
			table.appendChild(row)
			for (let j = 0; j < numberOfCells; j++) {
				let cell = document.createElement("td")
				row.appendChild(cell)
				cell.innerHTML = textInCell;
	
			}
			
		}
	}

	addRow(myTable1,3,3, "any")

})