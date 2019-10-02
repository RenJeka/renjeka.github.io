// Эта библиотека отвечает за обработку данных с форм
import { tableWorker } from './tableWorker';
import {$} from './myHelperLib';
import { Book, bookLibrary } from './books';


// Функция добавляет переданный ей объект в локальное хранилище (Local Storage). Функция преображает объект в JSON-объект и создает ключ
function addToLocalStorage(object, id) {

	let tempData;
	let tempJSON = localStorage.getItem(id);
	let firstArray = [];

	// Если у нас уже есть такой JSON-объект — функция добавляет наш объект (который мы передали в параметре) — в готовый массив объектов. Если еще нет JSON-объекта — создаем новый.
	if (tempJSON) {
		
		tempData = JSON.parse(tempJSON);
		tempData.push(object);
		tempJSON = JSON.stringify(tempData);
		localStorage.setItem(id,tempJSON);
		return;

	}else{
		firstArray.push(object);
		window.localStorage.setItem(id, JSON.stringify(firstArray));
		return;
	}
	
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

	// Проверка валидации
	if (validate (arrayOfInputs) ==false) {
		return false;
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
	
	// bookLibrary.push(book);
	// console.dir( bookLibrary);

	// console.dir(book);
	// console.log(localStorageKey);

	addToLocalStorage(book, localStorageKey);

	//  В конце работы обработчика мы создаем новую строку с помощью импортированного объекта "tableWorker", и добавляем информацию с настроенного ранее объекта "book"
	// newRow = tableWorker.addRow(table);
	// tableWorker.addInfoInRow(table,newRow.rowIndex,book);
	return localStorageKey;
}


// Функция проверяет чтобы все необходимые поля были заполнены (минимум 1 символом). На вход принимает массив с инпутами
function validate(arrayOfInputs) {
	
	let counterOfInvalid = 0;

	for (let i = 0; i < arrayOfInputs.length; i++) {

		// Сама проверка. Если в инпут не ввели данные— тогда применяется стиль (invalid) и обработчик завершает работу.
		if(arrayOfInputs[i].value.length == 0){

			arrayOfInputs[i].className = "bookInputs-invalid";
			counterOfInvalid++;
		}else{
			
			arrayOfInputs[i].className = "bookInputs-valid";
		}
	}

	// Если счетчик невалидных элементов больше нуля — то и сама форма невалидная (вернуть "false")
	if (counterOfInvalid > 0) {
		return false;
	}else{
		return true;
	}
}


export { addToLocalStorage, addBookHandler};