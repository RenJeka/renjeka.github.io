
import { tableWorker } from './tableWorker.js';
import { $ } from './myHelperLib.js';
import { formHandler } from './formHandler.js';

window.addEventListener("load", ()=>{
	let currentTable = $("#table-genres");
	let localStorageKey = formHandler.getLocalStorageKey();
	let sortingFlag = false;

	tableWorker.fillTable(currentTable,localStorageKey);

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

	for (let i = 0; i < currentTable.rows.length; i++) {
		currentTable.rows[i].addEventListener('click', function (e) {

			let sortMark = e.target.dataset.objectKeyBind;

			if (this.rowIndex == 0) {

				sortingFlag = !sortingFlag;

 				tableWorker.cleanTable(currentTable);
				tableWorker.fillTable(currentTable,localStorageKey, sortMark, sortingFlag);
			}
			console.log(`Индекс строки =  ${this.rowIndex}`);
		});
	}
})