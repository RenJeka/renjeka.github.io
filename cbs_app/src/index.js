// TODO ♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦
// ♦ Задержка строки (через флаг, после нажатия на строку,  строка будет подсвечиваться (эта строка сейчас активна)). На основе этого будет удаление и изменение текущего объекта.
// ♦ реализовать перебор объектов с помощью кнопок (данные выводятся в форму). 
// ♦ Добавить возможность изменить объект (перезаписать) (кнопка "Изменить")
// ♦ Добавить возможность удалить объект  () (кнопка "Удалить")
// ♦ Продумать, как будет реализовываться валидация полей по заданным регулярным выражениям (можно РВ поместить в атрибуты).  
// TODO ♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦

import {$} from './myHelperLib'
import { formHandler } from './formHandler';
import { Table } from './table.class';
import { Form } from './form.class';

window.addEventListener("load", () =>{

	// let currentTable 	= $('#table-books'),
	// 	localStorageKey = formHandler.getLocalStorageKey(),
	// 	tableData;		// Здесь хранятся данные (массив с объектами), которыми в текущий момент заполнена таблица.

	// Создаем объект "tableBook" типа "Table"
	let formBook = new Form(document.forms[0], "id");
	let tableBook = new Table('#table-books',formBook.currentForm);

	// Проверяем форму на нужные поля ввода, которые необходимо заполнить по привязке
	formBook.checkForm();

	// Добавляем наблюдателей (наблюдателям будет идти рассылка после изменения параметров, изначально параметр "tableData")
	tableBook.addObserver(tableBook);

	// Заполняем таблицу
	tableBook.fillTable();

	//Сообщаем наблюдателям об изменении
	// tableBook.notify();

	//===========================================================================================
	// ОБРАБОТЧИК КНОПКИ "addBook"
	$('#addBook').addEventListener("click", function() {

		returnedObject = formBook.addBookHandler();

		if (returnedObject == false) {
			return false;
		}
		tableBook.addRows(returnedObject);
		
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

	//! ===============================================================
	/* TODO Работа над методом "rowSelectHandler" / "tableClickHandler"

			При сортировке (поиске и выборе строки) вызывается несколько 
		обработчиков событий на клик.
		Это связано с тем, что я использовал паттерн "Observer",
		и на кождое изменение "tableData" я запускал (оповещение /метод notify), 
		который и запускает эти обработчики.

			Подумать, как можно удалять эти обработчики событий, и ставить новые 
		(перезаписывать их при изменении значения "tableData" )
	*/
	//! ===============================================================


	//#region
	// //===========================================================================================


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
