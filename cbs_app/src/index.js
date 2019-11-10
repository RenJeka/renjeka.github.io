// TODO ♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦
// ♦ Реализовать множественный выбор строк у Автора (список книг)
// ♦ Продумать, как будет реализовываться валидация полей по заданным регулярным выражениям (можно РВ поместить в атрибуты).  
// TODO ♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦

import {$} from './myHelperLib';
import { Table } from './generalClasses/table.class';
import { Form } from './generalClasses/form.class';
import "./css/style1.scss";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./add_author.html";
// import "./add_genre.html";

window.addEventListener("load", () =>{

	// Создаем объект "formBook" класса "Form"
	// let formBook = new Form(document.forms[0], "id", tableBook);
	let formBook = new Form(document.forms[0], "id");

	// Создаем объект "tableBook" класса "Table" 
	let tableBook = new Table('#table-books',formBook);

	// formBook.tableObject = tableBook;

	// Проверяем форму на нужные поля ввода, которые необходимо заполнить по привязке
	formBook.checkForm();

	// Добавляем наблюдателей по паттерну "Observer"(наблюдателям будет идти рассылка после изменения параметров, изначально параметр "tableData")
	tableBook.addObservers(tableBook, formBook);

	// Заполняем таблицу
	tableBook.fillTable();
	console.dir(tableBook);
	//Сообщаем наблюдателям об изменении
	// tableBook.notify();

	//===========================================================================================
	// ОБРАБОТЧИК КНОПКИ "add"
	$('#add').addEventListener("click", function() {

		let returnedObject = formBook.addButtonHandler();

		if (returnedObject == false) {
			return false;
		}
		tableBook.tableData.push(returnedObject);
		tableBook.addRows(returnedObject);
		tableBook.notify();
		
	});
	
	//===========================================================================================
	// ОБРАБОТЧИК КНОПКИ "edit"
	$('#edit').addEventListener("click", function() {

		let newArray = formBook.editObject();
		if (newArray) {
			tableBook.cleanTable();
			tableBook.tableData = newArray;
			tableBook.notify()
			tableBook.fillTable();
		}else{
			alert("Какую строку вы хотите изменить? Пожалуйста выберите строку.")
		}
	});

	//===========================================================================================
	// ОБРАБОТЧИК КНОПКИ "delete"
	$('#delete').addEventListener("click", function() {

		let newArray = formBook.deleteObject();
		if (newArray) {
			tableBook.cleanTable();
			tableBook.tableData = newArray;
			tableBook.notify()
			tableBook.fillTable();
		}else{
			alert("Нечего удалять. Выберите пожалуйста строку.")
		}
		
	});

	//===========================================================================================
	// ОБРАБОТЧИК КНОПКИ "clearInputs"
	$('#cleanInputs').addEventListener("click", function() {

		formBook.cleanInputs();
		
	});

	//===========================================================================================
	// ОБРАБОТЧИК ПОИСКА
	$('#input-search').addEventListener("keyup", (e)=>{
		// Очищаем текущую таблицу
		tableBook.cleanTable();

		// Заполняем таблицу тем массивам, который возвращает фун-я "tableWorker.search". Возращаем массив с данными.
		tableBook.tableData = tableBook.search(e.target, e.target.dataset.searchObjectProperty);
		tableBook.notify()
		tableBook.fillTable()
	})

	// ОБРАБОТЧИК ВЫБОРА СТРОК 
	tableBook.tableClickHandler()

});
