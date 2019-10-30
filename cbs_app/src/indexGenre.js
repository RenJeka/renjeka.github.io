import { $ } from './myHelperLib.js';
import { Table } from './table.class';
import { Form } from './form.class';

window.addEventListener("load", ()=>{

	let formGenre = new Form(document.forms[0], "id");
	let tableGenre = new Table('#table-genres',formGenre);

	formGenre.checkForm();
	tableGenre.addObservers(tableGenre, formGenre);
	tableGenre.fillTable();

	// ОБРАБОТЧИК КНОПКИ "addBook"
	$('#add').addEventListener("click", function() {

		let returnedObject = formGenre.addBookHandler();

		if (returnedObject == false) {
			return false;
		}
		tableGenre.addRows(returnedObject);
		tableGenre.notify();
	   
   });
	// ОБРАБОТЧИК КНОПКИ "delete"
	$('#delete').addEventListener("click", function() {

		tableGenre.cleanTable();
		tableGenre.tableData = formGenre.deleteObject();
		tableGenre.notify()
		tableGenre.fillTable();
	});

   	// ОБРАБОТЧИК ПОИСКА
	$('#input-search').addEventListener("keyup", (e)=>{

		// Очищаем текущую таблицу
		tableGenre.cleanTable();

		// Заполняем таблицу тем массивам, который возвращает фун-я "tableWorker.search". Возращаем массив с данными.
		tableGenre.tableData = tableGenre.search(e.target, e.target.dataset.searchObjectProperty);
		tableGenre.notify()
		tableGenre.fillTable()

	})

	// ОБРАБОТЧИК ВЫБОРА СТРОК 
	tableGenre.tableClickHandler()

})