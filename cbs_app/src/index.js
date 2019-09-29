import { tableWorker } from './tableWorker';
import {$} from './myHelperLib'
import { Book } from './books';
import { invalidStylist } from './formHandler';

window.addEventListener("load", () =>{
	// Начало программы — вызов функции

	let myTable1 = $('.myTable1');
	
	console.dir(myTable1);
	console.log(myTable1.rows);

	console.log(tableWorker.addRow(myTable1,3,3, "any"));

	// console.log(whatHead(myTable1,3));

	let book1 ={
		id:332,
		name: "book1",
		author: "Jeka",
		pages: 225,
		somedata: "hihihi"

	}
	
	// addInfoInCell(myTable1, book1, 4,3);
	tableWorker.addInfoInRow(myTable1,1,book1);
	


	// // TODO При  нажатии на кнопку первый раз — всё срабатывает как нужно, но кода нажимаю второй раз → не создается 
	// Обработчик события на клик-------------------------------------------------------
	$('#addBook').addEventListener("click", () => {

		let newRow;
		let book = new Book;
		let  arrayOfInputs = document.querySelectorAll('#form-book input');
		console.dir(arrayOfInputs);

		// Проверка, чтобы все необходимые поля были заполнены (минимум 1 символом)
		for (let i = 0; i < arrayOfInputs.length; i++) {

			// Сама проверка
			if(arrayOfInputs[i].value.length == 0){

				invalidStylist(arrayOfInputs);
				return false;
			}
		}

		// Цикл перебирает все поля для ввода (инпуты), и создает такие-же свойства у объекта book (название свойста соответствует ID инпута)
		for (let i = 0; i < arrayOfInputs.length; i++) {

			book[arrayOfInputs[i].getAttribute("id")] = arrayOfInputs[i].value;

			arrayOfInputs[i].value = "";
			arrayOfInputs[i].className = "bookInputs-valid" 
		}
		
		console.dir(book);
		//  В конце работы обработчика мы создаем новую строку с помощью импортированного объекта "tableWorker", и добавляем информацию с настроенного ранее объекта "book"
		newRow = tableWorker.addRow(myTable1);
		tableWorker.addInfoInRow(myTable1,newRow.rowIndex,book)
		
	})// КОНЕЦ обработчика события на клик---------------------------------------------

})