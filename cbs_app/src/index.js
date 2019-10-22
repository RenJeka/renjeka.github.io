import { tableWorker } from './tableWorker';
import {$, tag} from './myHelperLib'
import { formHandler } from './formHandler';

window.addEventListener("load", () =>{
	console.dir(document.forms[0])
	console.dir(document.forms[0].elements)
	let currentTable 	= $('#table-books'),
		localStorageKey = formHandler.getLocalStorageKey(),
		tableData		// Здесь хранятся данные (массив с объектами), которыми в текущий момент заполнена таблица.

	/*
		// Находим localStorageKey (Ключ для базы данных в LocalStorage)
	for (let i = 0; i < document.forms[0].elements.length; i++) {
		if (document.forms[0].elements[i].dataset.hasOwnProperty("localStorageKey")) {
			localStorageKey = document.forms[0].elements[i].dataset.localStorageKey;
		}
	}
	*/
	
	// Проверяем форму на нужные поля ввода, которые необходимо заполнить по привязке
	formHandler.checkForm();

	// Заполняем текущую таблицу данными из localStorage. Возращаем массив с данными.
	tableData = tableWorker.fillTable(currentTable,localStorageKey);

	// TODO ♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦
	// ♦ Задержка строки (через флаг, после нажатия на строку,  строка будет подсвечиваться (эта строка сейчас активна)). На основе этого будет удаление и изменение текущего объекта.
	// ♦ реализовать перебор объектов с помощью кнопок (данные выводятся в форму). 
	// ♦ Добавить возможность изменить объект (перезаписать) (кнопка "Изменить")
	// ♦ Добавить возможность удалить объект  () (кнопка "Удалить")
	// ♦ Продумать, как будет реализовываться валидация полей по заданным регулярным выражениям (можно РВ поместить в атрибуты).  
	// TODO ♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦

	// Обработчик событий по нажатии на кнопку "addBook"
	$('#addBook').addEventListener("click", function(e) {
		
		//получаем возращаемый объект, который записался в базу данных.
		let returnedObject =  formHandler.addBookHandler(e);

		// Если есть ошибка в валидации — возвращаем "false", и клик не дает результата (не записывает данные и не модифицирует таблицу )
		if (returnedObject == false) {
			return false;
		}
		// Добавляем ряд с данными в таблицу
		tableWorker.addRow(currentTable, returnedObject.addedObject);
	});
//==========================================================================================
	// Запускаем обработчик выбора строк  
	let aaa = tableWorker.rowSelectHandler(currentTable, localStorageKey, tableData, name);
	// let njnj = tableWorker.ff(tableWorker.info);
	console.dir("Результат = " + aaa);
	
	function name(params) {
		console.log(params)
		if (Array.isArray(params)) {
			console.log("Массив");
			
		}else if(params instanceof Object){
			
			console.log("Объект");
		}else{
			
			console.log("Что-то другое");
		}
	}


	// TODO реализовать, чтобы работало (Чтобы if-ы срабатывали после срабатывания функции "tableWorker.rowSelectHandler")
	if (Array.isArray(aaa)) {
		console.log("Массив");
		
	}else if(aaa instanceof Object){
		
		console.log("Объект");
	}else{
		
		console.log("Что-то другое");
	}

	// Обработчик поиска
	$('#input-search').addEventListener("keyup", (e)=>{
		// Очищаем текущую таблицу
		tableWorker.cleanTable(currentTable);

		// Заполняем таблицу тем массивам, который возвращает фун-я "tableWorker.search". Возращаем массив с данными.
		tableData = tableWorker.fillTable(currentTable, tableWorker.search(e.target, localStorageKey, e.target.dataset.searchObjectProperty))
	})
});
