import { $ } from './myHelperLib.js';
import { Table } from './table.class';
import { Form } from './form.class';

window.addEventListener("load", ()=>{

	let formAuthor = new Form(document.forms[0], "id");
	let tableAuthor = new Table('#table-authors',formAuthor);

	formAuthor.checkForm();
	tableAuthor.addObservers(tableAuthor, formAuthor);
	tableAuthor.fillTable();

	// ОБРАБОТЧИК КНОПКИ "add"
	$('#add').addEventListener("click", function() {

		let returnedObject = formAuthor.addButtonHandler();

		if (returnedObject == false) {
		   return false;
		}
		tableAuthor.addRows(returnedObject);
		tableAuthor.notify();
	   
   });

   	// ОБРАБОТЧИК КНОПКИ "edit"
	$('#edit').addEventListener("click", function() {

		let newArray = formAuthor.editObject();
		if (newArray) {
			tableAuthor.cleanTable();
			tableAuthor.tableData = newArray;
			tableAuthor.notify()
			tableAuthor.fillTable();
		}else{
			alert("Какую строку вы хотите изменить? Пожалуйста выберите строку.")
		}
	});

	// ОБРАБОТЧИК КНОПКИ "delete"
	$('#delete').addEventListener("click", function() {

		let newArray = formAuthor.deleteObject();
		if (newArray) {
			tableAuthor.cleanTable();
			tableAuthor.tableData = newArray;
			tableAuthor.notify()
			tableAuthor.fillTable();
		}else{
			alert("Нечего удалять. Выберите пожалуйста строку.")
		}
	});

	// ОБРАБОТЧИК КНОПКИ "clearInputs"
	$('#cleanInputs').addEventListener("click", function() {

		formAuthor.cleanInputs();
		
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