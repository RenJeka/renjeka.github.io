
import { tableWorker } from './tableWorker.js';
import { $ } from './myHelperLib.js';
import { formHandler } from './formHandler.js';

window.addEventListener("load", ()=>{
	let currentTable = $("#table-genres");

	tableWorker.fillTable(currentTable,"Genres-Library");

	$("#add").addEventListener("click", (e)=>{

		// Запускаем обработчик события на клик по кнопке "add" и получаем возращаемый объект, который записался в базу данных.
		let returnedObject =  formHandler.addBookHandler(e);

		// Если есть ошибка в валидации — возвращаем "false", и клик не дает результата (не записывает данные и не модифицирует таблицу )
		if (returnedObject == false) {
			return false;
		}

		// Добавляем ряд с данными в таблицу
		tableWorker.addRow(currentTable, returnedObject.addedObject);
		// tableWorker

	})
})