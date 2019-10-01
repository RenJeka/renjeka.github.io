// Эта библиотека отвечает за обработку данных с форм
import { tableWorker } from './tableWorker';
import {$} from './myHelperLib';
import { Book, bookLibrary } from './books';


// Функция для стилизации инпутов в стиль "invalid". Мы передаем на вход массив с инпутами, и функция их стилизует.
function invalidStylist(arrayOfInputs) {

	for (let i = 0; i < arrayOfInputs.length; i++) {
		arrayOfInputs[i].className = "bookInputs-invalid";
	} 
	
}

// Функция добавляет переданный ей объект в локальное хранилище (Local Storage). Функция преображает объект в JSON-объект и создает ключ
function addToLocalStorage(object, id) {

	// if () {
		
	// }
	let jsonObject = JSON.stringify(object);

	window.localStorage.setItem(id, jsonObject);
}

// // Функция формирует специфический ID для записи в "Local Storage". Используется функцией "addToLocalStorage"
// function getID(object) {

// 	return object.objtype + "-" + object.id;
	
// }

// Обработчик событий при нажатии на кнопку "addBook". Берет с формы данные и записывает в LocalStorage. Возвращает ключ от данных в LocalStorage.
function addBookHandler(table) {
		let newRow;
		let book = new Book;
		let arrayOfInputs = document.querySelectorAll('#form-book input');
		let localStorageKey = "Book-Library"; // Ключ, по которому записываются значения в LocalStorage
		console.dir(arrayOfInputs);

		// Проверка, чтобы все необходимые поля были заполнены (минимум 1 символом). Эта проверка (этот цикл) должен запускаться первой!
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
		
		bookLibrary.push(book);
		console.dir( bookLibrary);

		console.dir(book);

		addToLocalStorage(bookLibrary, localStorageKey);

		//  В конце работы обработчика мы создаем новую строку с помощью импортированного объекта "tableWorker", и добавляем информацию с настроенного ранее объекта "book"
		// newRow = tableWorker.addRow(table);
		// tableWorker.addInfoInRow(table,newRow.rowIndex,book);
		return localStorageKey;
}


export {invalidStylist, addToLocalStorage, addBookHandler};