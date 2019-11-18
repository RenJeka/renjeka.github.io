import { $, changeClass } from './myHelperLib';
import { Table } from './generalClasses/table.class';
import { Form } from './generalClasses/form.class';
import './css/style1.scss';

window.addEventListener("load", ()=>{

	let formGenre = new Form(document.forms[0], "id"),
		tableGenre = new Table('#table-genres',formGenre);

	formGenre.checkForm();
	tableGenre.addObservers(tableGenre, formGenre);
	tableGenre.fillTable();

	// Всплывающее меню
	changeClass("click", $(".image-logo"), $(".wrapper-logo"), "wrapper-logo-open");

	// ОБРАБОТЧИК КНОПКИ "add"
	$('#add').addEventListener("click", function() {

		let returnedObject = formGenre.addButtonHandler();

		if (returnedObject == false) {
			return false;
		}
		tableGenre.tableData.push(returnedObject);
		tableGenre.addRows(returnedObject);
		tableGenre.nullifySelection();
		tableGenre.notify(); 
   });

    // ОБРАБОТЧИК КНОПКИ "edit"
	$('#edit').addEventListener("click", function() {

		let currentArray = formGenre.editObject();
		if (currentArray) {
			tableGenre.cleanTable();
			tableGenre.tableData = currentArray;
			tableGenre.notify()
			tableGenre.fillTable();
		}else{
			alert("Какую строку вы хотите изменить? Пожалуйста выберите строку.")
		}
	});

	// ОБРАБОТЧИК КНОПКИ "delete"
	$('#delete').addEventListener("click", function() {

		let currentArray = formGenre.deleteObject();
		if (currentArray) {
			tableGenre.cleanTable();
			tableGenre.tableData = currentArray;
			tableGenre.nullifySelection();
			tableGenre.notify()
			tableGenre.fillTable();
		}else{
			alert("Нечего удалять. Выберите пожалуйста строку.")
		}
	});

	// ОБРАБОТЧИК КНОПКИ "clearInputs"
	$('#cleanInputs').addEventListener("click", function() {

		formGenre.cleanInputs();
		tableGenre.nullifySelection();
		
	});

   	// ОБРАБОТЧИК ПОИСКА
	$('#input-search').addEventListener("keyup", (e)=>{

		// Очищаем текущую таблицу
		tableGenre.cleanTable();

		tableGenre.tableData = tableGenre.search(e.target, e.target.dataset.searchObjectProperty);
		tableGenre.notify()
		tableGenre.fillTable()
	})

	// ОБРАБОТЧИК ВЫБОРА СТРОК 
	tableGenre.tableClickHandler()

})