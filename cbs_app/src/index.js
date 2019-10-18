import { tableWorker } from './tableWorker';
import {$, tag} from './myHelperLib'
import { formHandler } from './formHandler';

window.addEventListener("load", () =>{
	console.dir(document.forms[0])
	console.dir(document.forms[0].elements)
	let currentTable = $('#table-books');
	let localStorageKey = formHandler.getLocalStorageKey();
	let sortingFlag = false;

	// // Находим localStorageKey (Ключ для базы данных в LocalStorage)
	// for (let i = 0; i < document.forms[0].elements.length; i++) {
	// 	if (document.forms[0].elements[i].dataset.hasOwnProperty("localStorageKey")) {
	// 		localStorageKey = document.forms[0].elements[i].dataset.localStorageKey;
	// 	}
	// }

	tableWorker.fillTable(currentTable,localStorageKey);


	// TODO ♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦
	// ♦ Задержка строки (через флаг, после нажатия на строку,  строка будет подсвечиваться (эта строка сейчас активна)). На основе этого будет удаление и изменение текущего объекта.
	// ♦ Подвязать жанры, значениее которых будет передаваться в поля ввода
	// ♦ реализовать перебор объектов с помощью кнопок (данные выводятся в форму). 
	// ♦ Добавить возможность изменить объект (перезаписать) (кнопка "Изменить")
	// ♦ Добавить возможность удалить объект  () (кнопка "Удалить")
	// ♦ Реализовать поиск . Пока по 1 полю. Фун-я fillTable перезаполняет таблицу с учетом поиска на каждое событие onKeyPress. Посмотреть как это реализовывалось на практической по ангуляру.
	// ♦ Продумать, как будет реализовываться валидация полей по заданным регулярным выражениям (можно РВ поместить в атрибуты).  

	// TODO ♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦

	
	$('#addBook').addEventListener("click", function(e) {
		

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

			let sortMark = e.target.dataset.objectKeyBind;

			if (this.rowIndex == 0) {

				sortingFlag = !sortingFlag;

 				tableWorker.cleanTable(currentTable);
				tableWorker.fillTable(currentTable,localStorageKey, sortMark, sortingFlag);
			}
			console.log(`Индекс строки =  ${this.rowIndex}`);
		});
	}

});