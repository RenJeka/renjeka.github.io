
import { tableWorker } from './tableWorker.js';
import { $ } from './myHelperLib.js';
import { formHandler } from './formHandler.js';

window.addEventListener("load", ()=>{
	console.dir(document.forms[0])
	console.dir(document.forms[0].elements)
	let currentTable = $('#table-authors');
	let localStorageKey = formHandler.getLocalStorageKey();

	tableWorker.fillTable(currentTable,localStorageKey);

	$('#add').addEventListener("click", function(e) {
		
		// Запускаем обработчик события на клик по кнопке "addBook" и получаем возращаемый объект, который записался в базу данных.
		let returnedObject =  formHandler.addBookHandler(e);

		// Если есть ошибка в валидации — возвращаем "false", и клик не дает результата (не записывает данные и не модифицирует таблицу )
		if (returnedObject == false) {
			return false;
		}

		// Добавляем ряд с данными в таблицу
		tableWorker.addRow(currentTable, returnedObject.addedObject);
	});

	// Выбор определенной строки. Тут перебираются все строки и на конкретную строку, которую выбрал пользователь -- вешается обработчик событий. 
	// TODO Реализовать так, чтобы вся логика находилась в файле "tableWorker.js"
	for (let i = 0; i < currentTable.rows.length; i++) {
		currentTable.rows[i].addEventListener('click', function (e) {

			if (this.rowIndex == 0) {

 				tableWorker.cleanTable(currentTable);
				tableWorker.fillTable(currentTable,localStorageKey, e.target.dataset.objectKeyBind);
			}
			console.log(`Индекс строки =  ${this.rowIndex}`);
		});
	}


})