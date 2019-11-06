import { $ } from './myHelperLib.js';
import { Table } from './table.class';
import { Form } from './form.class';
import './css/style1.css';
import "bootstrap/dist/css/bootstrap.min.css";
// import "./index.html";

window.addEventListener("load", ()=>{

	let formGenre = new Form(document.forms[0], "id");
	let tableGenre = new Table('#table-genres',formGenre);

	formGenre.checkForm();
	tableGenre.addObservers(tableGenre, formGenre);
	tableGenre.fillTable();

	// ОБРАБОТЧИК КНОПКИ "add"
	$('#add').addEventListener("click", function() {

		let returnedObject = formGenre.addButtonHandler();

		if (returnedObject == false) {
			return false;
		}
		tableGenre.addRows(returnedObject);
		tableGenre.notify(); 
   });

    // ОБРАБОТЧИК КНОПКИ "edit"
	$('#edit').addEventListener("click", function() {

		let newArray = formGenre.editObject();
		if (newArray) {
			tableGenre.cleanTable();
			tableGenre.tableData = newArray;
			tableGenre.notify()
			tableGenre.fillTable();
		}else{
			alert("Какую строку вы хотите изменить? Пожалуйста выберите строку.")
		}
	});

	// ОБРАБОТЧИК КНОПКИ "delete"
	$('#delete').addEventListener("click", function() {

		let newArray = formGenre.deleteObject();
		if (newArray) {
			tableGenre.cleanTable();
			tableGenre.tableData = newArray;
			tableGenre.notify()
			tableGenre.fillTable();
		}else{
			alert("Нечего удалять. Выберите пожалуйста строку.")
		}
	});

	// ОБРАБОТЧИК КНОПКИ "clearInputs"
	$('#cleanInputs').addEventListener("click", function() {

		formGenre.cleanInputs();
		
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