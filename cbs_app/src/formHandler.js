// Эта библиотека отвечает за обработку данных с форм
import {$} from './myHelperLib';
import { Book, bookLibrary } from './books';
import {tableWorker} from './tableWorker';


export let formHandler = {
	
	// --------------------------------------------------------------------------
	/**
	 * Обработчик событий при нажатии на кнопку "addBook". Берет с формы данные и записывает в LocalStorage.
	 * @param {object} event Объект события
	 * @return {object}  Возвращает объект с ключом от данных в LocalStorage и добавленным объектом.{localStorageKey: localStorageKey, addedObject: book}. Возвращает "false", если форма не валидная либо есть такая-же запись в LocalStorage.
	 */
	addBookHandler(event) {

		let currentForm = event.target.form;
		let formElements = currentForm.elements;

		// Проверка валидации. Если валидация вернула "false" — то закончить выполнение текущего метода
		if (this.validate(formElements) == false) {
			return false;
		}

		let currentObject = this.getObjectType(currentForm); 
		let object;
		let localStorageKey = currentObject.localStorageKey; // Ключ, по которому записываются значения в LocalStorage


		switch (currentObject.objtype) {

			case "book":
				object =  new Book;
				break;

			case "author":
				object =  new Author;
				break;

		}

		// Этот цикл заполняет объект "object". Он перебирает все поля для ввода (инпуты), и создает такие-же свойства у объекта object (название свойста соответствует ID инпута). Можно реализовать заполнение объекта через конструктор класса Book в book.js
		for (let i = 0; i < formElements.length; i++) {

			object[formElements[i].getAttribute("id")] = formElements[i].value;

		}
		if (this.findDublicate(object, localStorageKey)) {
			return false;
		}
		
		this.cleanInput(currentForm);
		// Добавляем настроенный объект в "localStorage"
		this.addToLocalStorage(object, localStorageKey);

		return {localStorageKey: localStorageKey, addedObject: object};
	},
	// --------------------------------------------------------------------------
	/**
	 * Метод очищает поля в указанной форме.
	 * @todo Передлелать этот метод через цикл "forEach" или "for in "
	 * @param {object} form форма, поля в которой необходимо очистить
	 * @return Ничего не возвращает
	 */
	cleanInput(form){

		for (let i = 0; i < form.elements.length; i++) {
			if (form.elements[i].type != "hidden" ||form.elements[i].localName != "button") {
				form.elements[i].value = "";
				form.elements[i].className = "bookInputs-clean" ;
			}
		}

		// Если поле скрытое, или элемент формы — кнопка, то пропускаем и не очищаем эти элементы

		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Вариант1
		// for (const key in form.elements) {
		// 	if (form.elements.hasOwnProperty(key)) {
		// 		if (key.type != "hidden" || key.localName != "button") {
		// 			key.value = "";
		// 			key.className = "bookInputs-clean" 
		// 		}
		// 	}
		// }
		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Вариант2
		// form.elements.forEach(element => {
		// 	if (element.type != "hidden" || element.localName != "button") {
		// 		element.value = "";
		// 		element.className = "bookInputs-clean" 
		// 	}
		// });


	},
	// --------------------------------------------------------------------------
	/**
	 * Метод устанавливает, какой объект должен заполнятся в форме. Для работы метода в форме должно быть поле <input type='hidden' id='objtype' value=''>, иначе метод выбросит исключение.
	 * @param {object} form форма, которая предназначена для ввода данных об объекте.
	 * @return {object} Возвращает объект, c 2-мя свойствами: названием объекта и ключ для localStorage.
	 */
	getObjectType(form){
		for (let i = 0; i < form.elements.length; i++) {
			if (form.elements[i].id == "objtype") {
				return {objtype:form.elements[i].value , localStorageKey:form.elements[i].dataset.localStorageKey }   //form.elements[i].value
			}
		}
		throw "Не найдено поле ввода  <input type='hidden'> с указанием типа объекта, который будет передан в базу данный. Добавьте в вашу форму поле <input type='hidden' id='objtype' value=''>  В поле value='' укажите тип объекта, который будет добавлен в базу данных"
	},

	/**
	 * Метод проверяет дубликаты объектов. В случае нахождения дубликата выводит ошибку.
	 * @param {object} object 
	 * @param {string} localStorageKey 
	 * @return {boolean} true, если метод нашел повторную запись, false — если не нашел.
	 */
	findDublicate(object, localStorageKey){
		let localStorageArray = tableWorker.getTableData(localStorageKey);

		// Тут производится сравнение по полю "id". Если есть совподение — считается, что найден дубликат и метод выводит сообщение.
		let flag = localStorageArray.some(item =>item.id == object.id);
		if (flag) {
			alert ("такая запись уже есть");
		}
		return flag;
	},
	// --------------------------------------------------------------------------
	/**
	 * Метод проверяет чтобы все необходимые поля были заполнены (минимум 1 символом). 
	 * 
	 * @param {arrayOfElements[]} arrayOfElements Массив с DOM-элементами,  полями ввода (input) формы 
	 * @return {boolean} "true", если все поля валидные. "false", если хотя-бы 1 поле не прошло проверку (тогда и форма считается не валидной)
	 */
	validate(arrayOfElements) {
		
		let counterOfInvalid = 0;

		for (let i = 0; i < arrayOfElements.length; i++) {

			//Этим "if" обрабатывается исключение (те элементы формы, которые не нужно валидировать)
			if (arrayOfElements[i].localName == "button") {
				continue;
			}
			// Сама проверка. Если в инпут не ввели данные— тогда применяется стиль (invalid) и обработчик завершает работу.
			if(arrayOfElements[i].value.length == 0){

				arrayOfElements[i].className = "bookInputs-invalid";
				counterOfInvalid++;
			}else{
				
				arrayOfElements[i].className = "bookInputs-valid";
			}
		}

		// Если счетчик невалидных элементов больше нуля — то и сама форма невалидная (вернуть "false")
		if (counterOfInvalid > 0) {
			return false;
		}else{
			return true;
		}
	},

	// --------------------------------------------------------------------------
	/**
	 * Метод  добавляет переданный ей объект в локальное хранилище (Local Storage).
	 * @param {object} object Объект, который нужно записать в LocalStorage
	 * @param {string} id Ключ, по которому будет записываться объект
	 * @return {void} Ничего не возвращает
	 */
	addToLocalStorage(object, id) {

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
}

// --------------------------------------------------------------------------
	// TODO — Реализовать уникальный ID
	// // Функция формирует специфический ID для записи в "Local Storage". Используется функцией "addToLocalStorage"
	// function getID(object) {

	// 	return object.objtype + "-" + object.id;
		
	// }

// --------------------------------------------------------------------------
