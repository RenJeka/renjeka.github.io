import { $, changeClass } from './myHelperLib';
import { Table } from './generalClasses/table.class';
import { Form } from './generalClasses/form.class';
import "./css/style1.scss";

window.addEventListener("load", ()=>{

	let formAuthor = new Form(document.forms[0], "id"),
		tableAuthor = new Table('#table-authors',formAuthor);

	formAuthor.checkForm();
	tableAuthor.addObservers(tableAuthor, formAuthor);
	tableAuthor.fillTable();

	// Всплывающее меню
	changeClass("click", $(".image-logo"), $(".wrapper-logo"), "wrapper-logo-open"); 

	// ОБРАБОТЧИК КНОПКИ "add"
	$('#add').addEventListener("click", function() {

		let returnedObject = formAuthor.addButtonHandler();

		if (returnedObject == false) {
		   return false;
		}
		tableAuthor.tableData.push(returnedObject);
		tableAuthor.addRows(returnedObject);
		tableAuthor.nullifySelection();
		tableAuthor.notify();   
   });

   	// ОБРАБОТЧИК КНОПКИ "edit"
	$('#edit').addEventListener("click", function() {

		let currentArray = formAuthor.editObject();
		if (currentArray) {
			tableAuthor.cleanTable();
			tableAuthor.tableData = currentArray;
			tableAuthor.notify()
			tableAuthor.fillTable();
		}else{
			alert("Пожалуйста выберите строку и заполните правильно поля!")
		}
	});

	// ОБРАБОТЧИК КНОПКИ "delete"
	$('#delete').addEventListener("click", function() {

		let currentArray = formAuthor.deleteObject();
		if (currentArray) {
			tableAuthor.cleanTable();
			tableAuthor.tableData = currentArray;
			tableAuthor.nullifySelection();
			tableAuthor.notify()
			tableAuthor.fillTable();
		}else{
			alert("Нечего удалять. Выберите пожалуйста строку.")
		}
	});

	// ОБРАБОТЧИК КНОПКИ "clearInputs"
	$('#cleanInputs').addEventListener("click", function() {

		formAuthor.cleanInputs();
		tableAuthor.nullifySelection();
		
	});

   	// ОБРАБОТЧИК ПОИСКА
	$('#input-search').addEventListener("keyup", (e)=>{

		// Очищаем текущую таблицу
		tableAuthor.cleanTable();

		tableAuthor.tableData = tableAuthor.search(e.target, e.target.dataset.searchObjectProperty);
		tableAuthor.notify()
		tableAuthor.fillTable()
	})

	// ОБРАБОТЧИК ВЫБОРА СТРОК 
	tableAuthor.tableClickHandler()

})