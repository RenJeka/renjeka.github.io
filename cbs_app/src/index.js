import { tableWorker } from './tableWorker';
import {$} from './myHelperLib'
import { Book } from './books';
import { invalidStylist, addToLocalStorage } from './formHandler';

window.addEventListener("load", () =>{

	let myTable1 = $('.myTable1');
	
	// console.dir(myTable1);
	// console.log(myTable1.rows);
	// console.log(tableWorker.addRow(myTable1,3,3, "any"));

	// TODO [Спросить] -Как лучше поместить данный обработчик в отдельный модуль, чтобы он работал корректно.

	// TODO ♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦
	
	// ♦ Продумать, как будет реализовываться проверка на валидность.  
	// ♦ Поместить все объекты "book" в массив и реализовать их перебор с помощью кнопок (данные выводятся в форму). 
	// ♦ Добавить функцию - парсинг объекта с "Local Storage" (объекты записываются в массив arrayOfBooks)
	// ♦ Реализовать заполнение таблицы напрямую с массива "arrayOfBooks"

	// TODO ♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦♦

 	// Обработчик события на клик-----------------------------------------------
	$('#addBook').addEventListener("click", () => {

		let newRow;
		let book = new Book;
		let  arrayOfInputs = document.querySelectorAll('#form-book input');
		console.dir(arrayOfInputs);

		// Проверка, чтобы все необходимые поля были заполнены (минимум 1 символом). Эта проверка (этот цикл) должна запускаться первой!
		for (let i = 0; i < arrayOfInputs.length; i++) {

			// Сама проверка. Если длина "value" хоть одного (первого попавшивося) у инпута == 0 — тогда применяется стиль (invalid) и обработчик завершает работу.
			if(arrayOfInputs[i].value.length == 0){

				invalidStylist(arrayOfInputs);
				return false;
			}
		}

		// Этот цикл заполняет объект "book". Он перебирает все поля для ввода (инпуты), и создает такие-же свойства у объекта book (название свойста соответствует ID инпута)
		for (let i = 0; i < arrayOfInputs.length; i++) {

			book[arrayOfInputs[i].getAttribute("id")] = arrayOfInputs[i].value;

			// Очищение полей. Тут идет проверка на то, чтобы поле не было типа "hidden", так как это системное поле и его нельзя очищать. 
			if (arrayOfInputs[i].type != "hidden") {

				arrayOfInputs[i].value = "";
				arrayOfInputs[i].className = "bookInputs-valid" 
			}
			
		}
		
		console.dir(book);

		addToLocalStorage(book);

		//  В конце работы обработчика мы создаем новую строку с помощью импортированного объекта "tableWorker", и добавляем информацию с настроенного ранее объекта "book"
		newRow = tableWorker.addRow(myTable1);
		tableWorker.addInfoInRow(myTable1,newRow.rowIndex,book)
		
	})// КОНЕЦ обработчика события на клик---------------------------------------------

})