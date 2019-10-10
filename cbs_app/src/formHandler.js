// Эта библиотека отвечает за обработку данных с форм
import {$} from './myHelperLib';
import { Book, bookLibrary } from './books';


export let formHandler = {
	
	// --------------------------------------------------------------------------
	/**
	 * Обработчик событий при нажатии на кнопку "addBook". Берет с формы данные и записывает в LocalStorage.
	 * @param {object} event Объект события
	 * @return {object}  Возвращает объект с ключом от данных в LocalStorage и добавленным объектом.{localStorageKey: localStorageKey, addedObject: book}. Возвращает "false", если форма не валидная
	 */
	addBookHandler(event) {

		let currentForm = event.target.form;
		let arrayOfInputs = currentForm.elements;
		
		// Проверка валидации. Если валидация вернула "false" — то закончить выполнение текущего метода
		if (this.validate(arrayOfInputs) == false) {
			return false;
		}

		let currentObject = this.getObjectType(currentForm); 
		let object;
		console.log(arrayOfInputs);
		let localStorageKey = currentObject.localStorageKey; // Ключ, по которому записываются значения в LocalStorage


		switch (currentObject.objtype) {

			case "book":
				object =  new Book;
				break;

			case "author":
				object =  new Author;
				break;
		
			default:
				break;
		}

		// Этот цикл заполняет объект "object". Он перебирает все поля для ввода (инпуты), и создает такие-же свойства у объекта object (название свойста соответствует ID инпута)
		for (let i = 0; i < arrayOfInputs.length; i++) {

			object[arrayOfInputs[i].getAttribute("id")] = arrayOfInputs[i].value;

			// Очищение полей. Тут идет проверка на то, чтобы поле не было типа "hidden", так как это системное поле и его нельзя очищать. 
			if (arrayOfInputs[i].type != "hidden" || arrayOfInputs[i].localName != "button") {

				arrayOfInputs[i].value = "";
				arrayOfInputs[i].className = "bookInputs-valid" 
			}
		}

		// Добавляем настроенный объект в "localStorage"
		this.addToLocalStorage(object, localStorageKey);

		return {localStorageKey: localStorageKey, addedObject: object};
	},
	// --------------------------------------------------------------------------

	cleanInput(form){

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


	// --------------------------------------------------------------------------
	/**
	 * Метод проверяет чтобы все необходимые поля были заполнены (минимум 1 символом). 
	 * 
	 * @param {arrayOfInputs[]} arrayOfInputs Массив с DOM-элементами,  полями ввода (input) формы 
	 * @return {boolean} "true", если все поля валидные. "false", если хотя-бы 1 поле не прошло проверку (тогда и форма считается не валидной)
	 */
	validate(arrayOfInputs) {
		
		let counterOfInvalid = 0;

		for (let i = 0; i < arrayOfInputs.length; i++) {

			//Этим "if" обрабатывается исключение (те элементы формы, которые не нужно валидировать)
			if (arrayOfInputs[i].localName == "button") {
				continue;
			}
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
