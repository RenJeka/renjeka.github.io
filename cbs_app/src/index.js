	// TODO ♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦
	
	// ♦ Продумать, как будет реализовываться проверка на валидность.  
	// ♦ реализовать перебор с помощью кнопок (данные выводятся в форму). 

	// TODO ♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦


import { tableWorker } from './tableWorker';
import {$} from './myHelperLib'
import { formHandler } from './formHandler';

window.addEventListener("load", () =>{

	let table = $('#table-books');

	console.dir(table);
	tableWorker.fillTable(table,"Book-Library");
	
	
	$('#add').addEventListener("click", function(e) {
		
		// Запускаем обработчик события на клик по кнопке "add" и получаем возращаемый объект, который записался в базу данных.
		let returnedObject =  formHandler.addBookHandler(e);

		// Если есть ошибка в валидации — возвращаем "false", и клик не дает результата (не записывает данные и не модифицирует таблицу )
		if (returnedObject == false) {
			return false;
		}

		// Добавляем ряд с данными в таблицу
		tableWorker.addRow(table, returnedObject.addedObject);
	})

	$
});


