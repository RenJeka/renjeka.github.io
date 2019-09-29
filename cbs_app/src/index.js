import { tableWorker } from './module1';
window.addEventListener("load", () =>{
	function $(selector) {
		return document.querySelector(selector);
	}


	//============================================================================
	// Начало программы — вызов функции

	let myTable1 = $('.myTable1');
	
	console.dir(myTable1);
	console.log(myTable1.rows);

	tableWorker.addRow(myTable1,3,3, "any")

	
	// console.log(whatHead(myTable1,3));

	let book1 ={
		id:332,
		name: "book1",
		author: "Jeka",
		pages: 225,
		somedata: "hihihi"

	}
	
	// addInfoInCell(myTable1, book1, 4,3);
	tableWorker.addInfoInRow(myTable1,1,book1);
	
})