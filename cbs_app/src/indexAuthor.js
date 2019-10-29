
import { tableWorker } from './tableWorker.js';
import { $ } from './myHelperLib.js';
import { formHandler } from './formHandler.js';

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

   	// // ОБРАБОТЧИК ПОИСКА
	// $('#input-search').addEventListener("keyup", (e)=>{

	// 	// Очищаем текущую таблицу
	// 	tableAuthor.cleanTable();

	// 	// Заполняем таблицу тем массивам, который возвращает фун-я "tableWorker.search". Возращаем массив с данными.
	// 	tableAuthor.tableData = tableAuthor.search(e.target, e.target.dataset.searchObjectProperty);
	// 	tableAuthor.notify()
	// 	tableAuthor.fillTable()

	// })

	// ОБРАБОТЧИК ВЫБОРА СТРОК 
	tableAuthor.tableClickHandler()









	// console.dir(document.forms[0])
	// console.dir(document.forms[0].elements)
	// let currentTable = $('#table-authors');
	// let localStorageKey = formHandler.getLocalStorageKey();
	// let sortingFlag = false;

	// tableWorker.fillTable(currentTable,localStorageKey);

	// $('#add').addEventListener("click", function(e) {
		
	// 	// Запускаем обработчик события на клик по кнопке "addBook" и получаем возращаемый объект, который записался в базу данных.
	// 	let returnedObject =  formHandler.addBookHandler(e);

	// 	// Если есть ошибка в валидации — возвращаем "false", и клик не дает результата (не записывает данные и не модифицирует таблицу )
	// 	if (returnedObject == false) {
	// 		return false;
	// 	}

	// 	// Добавляем ряд с данными в таблицу
	// 	tableWorker.addRow(currentTable, returnedObject.addedObject);
	// });

	// // Выбор определенной строки. Тут перебираются все строки и на конкретную строку, которую выбрал пользователь -- вешается обработчик событий. 
	// // TODO Реализовать так, чтобы вся логика находилась в файле "tableWorker.js"
	// for (let i = 0; i < currentTable.rows.length; i++) {
	// 	currentTable.rows[i].addEventListener('click', function (e) {

	// 		let sortMark = e.target.dataset.objectKeyBind;

	// 		if (this.rowIndex == 0) {

	// 			sortingFlag = !sortingFlag;

 	// 			tableWorker.cleanTable(currentTable);
	// 			tableWorker.fillTable(currentTable,localStorageKey, sortMark, sortingFlag);
	// 		}
	// 		console.log(`Индекс строки =  ${this.rowIndex}`);
	// 	});
	// }







})