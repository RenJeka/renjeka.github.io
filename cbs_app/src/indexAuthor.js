import { $ } from './myHelperLib.js';
import { Table } from './table.class';
import { Form } from './form.class';

window.addEventListener("load", ()=>{

	let formAuthor = new Form(document.forms[0], "id");
	let tableAuthor = new Table('#table-authors',formAuthor);

	formAuthor.checkForm();
	tableAuthor.addObservers(tableAuthor, formAuthor);
	tableAuthor.fillTable();

	// ОБРАБОТЧИК КНОПКИ "addBook"
	$('#add').addEventListener("click", function() {

		let returnedObject = formAuthor.addBookHandler();

		if (returnedObject == false) {
		   return false;
		}
		tableAuthor.addRows(returnedObject);
		tableAuthor.notify();
	   
   });

   	// ОБРАБОТЧИК ПОИСКА
	$('#input-search').addEventListener("keyup", (e)=>{

		// Очищаем текущую таблицу
		tableAuthor.cleanTable();

		// Заполняем таблицу тем массивам, который возвращает фун-я "tableWorker.search". Возращаем массив с данными.
		tableAuthor.tableData = tableAuthor.search(e.target, e.target.dataset.searchObjectProperty);
		tableAuthor.notify()
		tableAuthor.fillTable()

	})

	// ОБРАБОТЧИК ВЫБОРА СТРОК 
	tableAuthor.tableClickHandler()

})