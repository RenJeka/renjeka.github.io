import { tableWorker } from './tableWorker';
import {$} from './myHelperLib'
import { Book } from './books';
import { invalidStylist, addToLocalStorage, addBookHandler } from './formHandler';

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
	
		tableWorker.fillTable(myTable1,addBookHandler(myTable1));
		
	})

})