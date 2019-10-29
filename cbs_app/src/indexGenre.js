
import { tableWorker } from './tableWorker.js';
import { $ } from './myHelperLib.js';
import { formHandler } from './formHandler.js';
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

   	// // ОБРАБОТЧИК ПОИСКА
	// $('#input-search').addEventListener("keyup", (e)=>{

	// 	// Очищаем текущую таблицу
	// 	tableGenre.cleanTable();

	// 	// Заполняем таблицу тем массивам, который возвращает фун-я "tableWorker.search". Возращаем массив с данными.
	// 	tableGenre.tableData = tableGenre.search(e.target, e.target.dataset.searchObjectProperty);
	// 	tableGenre.notify()
	// 	tableGenre.fillTable()

	// })

	// ОБРАБОТЧИК ВЫБОРА СТРОК 
	tableGenre.tableClickHandler()


	// let currentTable = $("#table-genres");
	// let localStorageKey = formHandler.getLocalStorageKey();
	// let sortingFlag = false;

	// tableWorker.fillTable(currentTable,localStorageKey);

	// $("#add").addEventListener("click", (e)=>{

	// 	// Запускаем обработчик события на клик по кнопке "add" и получаем возращаемый объект, который записался в базу данных.
	// 	let returnedObject =  formHandler.addBookHandler(e);

	// 	// Если есть ошибка в валидации — возвращаем "false", и клик не дает результата (не записывает данные и не модифицирует таблицу )
	// 	if (returnedObject == false) {
	// 		return false;
	// 	}

	// 	// Добавляем ряд с данными в таблицу
	// 	tableWorker.addRow(currentTable, returnedObject.addedObject);
	// 	// tableWorker

	// })

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