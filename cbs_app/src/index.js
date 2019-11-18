import {$, changeClass} from './myHelperLib';
import { Table } from './generalClasses/table.class';
import { Form } from './generalClasses/form.class';
import "./css/style1.scss";

window.addEventListener("load", () =>{

	// Создаем объект  класса "Form"
	// ? Нужна ли двухсторонняя зависимость formBook и tableBook.
	// let formBook = new Form(document.forms[0], "id", tableBook);
	let formBook = new Form(document.forms[0], "id");
	
	// Создаем объект "tableBook" класса "Table" 
	let tableBook = new Table('#table-books',formBook);
	
	// Проверяем форму на нужные поля ввода, которые необходимо заполнить по привязке
	formBook.checkForm();

	// Добавляем наблюдателей по паттерну "Observer"(наблюдателям будет идти рассылка после изменения параметров, изначально параметр "tableData")
	tableBook.addObservers(tableBook, formBook);

	// Заполняем таблицу
	tableBook.fillTable();
	////Сообщаем наблюдателям об изменении
	// tableBook.notify();

	// Всплывающее меню
	changeClass("click", $(".image-logo"), $(".wrapper-logo"), "wrapper-logo-open"); 
	
	//===========================================================================================
	// ОБРАБОТЧИК КНОПКИ "add" (Добавить объект)
	$('#add').addEventListener("click", function() {

		// Создаем переменную -- возвращаемый объект, которым в последствии заполним строку таблицы
		let returnedObject = formBook.addButtonHandler();

		if (returnedObject == false) {
			return false;
		}
		tableBook.tableData.push(returnedObject);
		tableBook.addRows(returnedObject);
		tableBook.nullifySelection();
		tableBook.notify();
	});
	
	//===========================================================================================
	// ОБРАБОТЧИК КНОПКИ "edit" (Изменить объект)
	$('#edit').addEventListener("click", function() {

		let currentArray = formBook.editObject();
		if (currentArray) {
			tableBook.cleanTable();
			tableBook.tableData = currentArray;
			tableBook.notify()
			tableBook.fillTable();

			// TODO Реализовать стилизацию при нажатии кнопки "edit". Выбранная строка должна сохранять стиль нажатого ряда.
			// tableBook.currentTable.rows[tableBook.selectedRowIndex].className = "row-selected"
		}else{
			alert("Какую строку вы хотите изменить? Пожалуйста выберите строку.")
		}
	});

	//===========================================================================================
	// ОБРАБОТЧИК КНОПКИ "delete" (удалить объект)
	$('#delete').addEventListener("click", function() {

		let currentArray = formBook.deleteObject();
		if (currentArray) {
			tableBook.cleanTable();
			tableBook.tableData = currentArray;
			tableBook.nullifySelection();
			tableBook.notify()
			tableBook.fillTable();
		}else{
			alert("Нечего удалять. Выберите пожалуйста строку.")
		}
		
	});

	//===========================================================================================
	// ОБРАБОТЧИК КНОПКИ "clearInputs" (Очистить поля формы)
	$('#cleanInputs').addEventListener("click", function() {

		formBook.cleanInputs();
		tableBook.nullifySelection();
		
	});

	//===========================================================================================
	// ОБРАБОТЧИК ПОЛЯ ПОИСКА
	$('#input-search').addEventListener("keyup", (e)=>{
		// Очищаем текущую таблицу
		tableBook.cleanTable();

		// Заполняем таблицу новым массивом, который возвращает метод "search" класса "Table"
		tableBook.tableData = tableBook.search(e.target, e.target.dataset.searchObjectProperty);
		tableBook.notify()
		tableBook.fillTable()
	})

	// ОБРАБОТЧИК ВЫБОРА СТРОК 
	tableBook.tableClickHandler()

});
