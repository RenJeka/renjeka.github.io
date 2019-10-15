import { tableWorker } from './tableWorker';
import {$, tag} from './myHelperLib'
import { Book } from './books';
import { formHandler } from './formHandler';

window.addEventListener("load", () =>{

	let myTable1 = $('.myTable1');
	console.dir(myTable1);
	tableWorker.fillTable(myTable1,"Book-Library");


	// TODO ♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦
	
	// ♦ Продумать, как будет реализовываться проверка на валидность.  
	// ♦ Поместить все объекты "book" в массив и реализовать их перебор с помощью кнопок (данные выводятся в форму). 
	// ♦ Реализовать автоматическое заполнение ID f объекте

	// TODO ♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦

	
	$('#addBook').addEventListener("click", function(e) {
		
		// Запускаем обработчик события на клик по кнопке "addBook" и получаем возращаемый объект, который записался в базу данных.
		let returnedObject =  formHandler.addBookHandler(e);

		// Если есть ошибка в валидации — возвращаем "false", и клик не дает результата (не записывает данные и не модифицирует таблицу )
		if (returnedObject == false) {
			return false;
		}

		// Добавляем ряд с данными в таблицу
		tableWorker.addRow(myTable1, returnedObject.addedObject);
	});

	// Выбор определенной строки. Тут перебираются все строки и на конкретную строку, которую выбрал пользователь -- вешается обработчик событий. 
	for (let i = 1; i < myTable1.rows.length; i++) {
		myTable1.rows[i].addEventListener('click', function () {
			console.dir(this);
		});
	}

});