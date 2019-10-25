// TODO ♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦
// ♦ Задержка строки (через флаг, после нажатия на строку,  строка будет подсвечиваться (эта строка сейчас активна)). На основе этого будет удаление и изменение текущего объекта.
// ♦ реализовать перебор объектов с помощью кнопок (данные выводятся в форму). 
// ♦ Добавить возможность изменить объект (перезаписать) (кнопка "Изменить")
// ♦ Добавить возможность удалить объект  () (кнопка "Удалить")
// ♦ Продумать, как будет реализовываться валидация полей по заданным регулярным выражениям (можно РВ поместить в атрибуты).  
// TODO ♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦

import { tableWorker } from './tableWorker';
import {$} from './myHelperLib'
import { formHandler } from './formHandler';
import { Table } from './table.class';

window.addEventListener("load", () =>{

	// let currentTable 	= $('#table-books'),
	// 	localStorageKey = formHandler.getLocalStorageKey(),
	// 	tableData;		// Здесь хранятся данные (массив с объектами), которыми в текущий момент заполнена таблица.

	// Создаем объект "tableBook" типа "Table"
	let tableBook = new Table('#table-books',document.forms[0]);

	// Добавляем наблюдателей (наблюдателям будет идти рассылка после изменения параметров, изначально параметр "tableData")
	tableBook.addObserver(tableWorker);

	// Проверяем форму на нужные поля ввода, которые необходимо заполнить по привязке
	formHandler.checkForm();

	// Заполняем таблицу
	tableBook.fillTable();

	//Сообщаем наблюдателям об изменении
	// tableBook.notify();


	// // Заполняем текущую таблицу данными из localStorage. Возращаем массив с данными.
	// tableData = tableWorker.fillTable(currentTable,localStorageKey);

	////===========================================================================================
	// // ОБРАБОТЧИК КНОПКИ "addBook"
	// $('#addBook').addEventListener("click", function(e) {
		
	// 	//получаем возврат функции в виде объекта с 2-мя свойствами (ключ от LocalStorage и новый (созданный) объект )
	// 	let returnedObject =  formHandler.addBookHandler(e);
	// 	// Если есть ошибка в валидации — возвращаем "false", и клик не дает результата (не записывает данные и не модифицирует таблицу )
	// 	if (returnedObject == false) {
	// 		return false;
	// 	}
	// 	// Добавляем ряд с данными в таблицу
	// 	tableWorker.addRow(tableBook.currentTable, returnedObject.addedObject);
	// });

	//===========================================================================================
	// // ОБРАБОТЧИК ПОИСКА
	// $('#input-search').addEventListener("keyup", (e)=>{
	// 	// Очищаем текущую таблицу
	// 	tableWorker.cleanTable(tableBook.currentTable);

	// 	// Заполняем таблицу тем массивам, который возвращает фун-я "tableWorker.search". Возращаем массив с данными.
	// 	tableBook.tableData = tableWorker.search(e.target, tableBook.localStorageKey, e.target.dataset.searchObjectProperty);
	// 	tableBook.notify()
	// 	tableBook.fillTable()
	// })

	//#region
	// //===========================================================================================
	// // ОБРАБОТЧИК ВЫБОРА СТРОК 
	// tableWorker.rowSelectHandler(tableBook.currentTable, tableBook.localStorageKey,tableData, testFunc)

	// // TODO реализовать, чтобы работало (Чтобы if-ы срабатывали после срабатывания функции "tableWorker.rowSelectHandler")
	// function testFunc(returnValue) {

	// 	if (Array.isArray(returnValue)) {
	// 		console.log("Массив");
	// 		console.dir("returnValue = ");
	// 		console.dir(returnValue);
	// 		console.dir("tableData = ");
	// 		console.dir(tableData);
	// 		tableData = returnValue;
	// 		console.dir("Changed tableData = ");
	// 		console.dir(tableData);
			
	// 	}else if(returnValue instanceof Object){
	// 		console.log("Объект");
	// 		console.dir("returnValue = ");
	// 		console.dir(returnValue);
	// 		console.dir("tableData = ");
	// 		console.dir(tableData);

	// 	}else{
	// 		console.log("Что-то другое");
	// 	}
	// }
	//#endregion



});
