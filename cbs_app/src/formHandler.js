// Эта библиотека отвечает за обработку данных с форм

import {$} from './myHelperLib';


// Функция для стилизации инпутов в стиль "invalid". Мы передаем на вход массив с инпутами, и функция их стилизует.
function invalidStylist(arrayOfInputs) {

	for (let i = 0; i < arrayOfInputs.length; i++) {
		arrayOfInputs[i].className = "bookInputs-invalid";
	} 
	
}

// Функция добавляет переданный ей объект в локальное хранилище (Local Storage). Функция преображает объект в JSON-объект и создает ключ
function addToLocalStorage(object) {
	let id = getID(object);

	let jsonObject = JSON.stringify(object);

	window.localStorage.setItem(id, jsonObject);
}

// Функция формирует специфический ID для записи в "Local Storage". Используется функцией "addToLocalStorage"
function getID(object) {

	return object.objtype + "-" + object.id;
	
}


export {invalidStylist, addToLocalStorage};