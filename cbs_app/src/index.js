import { tableWorker } from './tableWorker';
import {$} from './myHelperLib'
import { Book } from './books';
import { addToLocalStorage, addBookHandler } from './formHandler';

window.addEventListener("load", () =>{

	let myTable1 = $('.myTable1');

	console.dir(myTable1);
	tableWorker.fillTable(myTable1,"Book-Library");
	
	// TODO ♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦
	
	// ♦ Продумать, как будет реализовываться проверка на валидность.  
	// ♦ Поместить все объекты "book" в массив и реализовать их перебор с помощью кнопок (данные выводятся в форму). 
	// ♦ Добавить функцию - парсинг объекта с "Local Storage" (объекты записываются в массив arrayOfBooks)
	// ♦ Реализовать заполнение таблицы напрямую с массива "arrayOfBooks"
	// ♦ Реализовать автоматическое заполнение ID f объекте

	// TODO ♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦

 	// Обработчик события на клик по кнопке "addBook"
	$('#addBook').addEventListener("click", () => {
	
		let returnedObject =  addBookHandler(myTable1);

		// Тут прописывается логика, если есть ошибка в валидации
		if (returnedObject == false) {
			return false;
		}
		tableWorker.addRow(myTable1, returnedObject.addedObject);
		
	})

});