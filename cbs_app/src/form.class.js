import { Book} from './books.class';
import { Genre } from './genres.class';
import { Author } from './authors.class';

export class Form{

	/**
	 * @constructor Конструктор класса "Form". Создает объект -- Форма
	 * @param {object} currentForm  Текущая <HTML>-форма, которая привязывается к данному объекту
	 * @param {String} idName название ID для идентификации каждого объекта
	 * @param {Array} dataArray (не обязательный) Массив данных, (набор объектов, что заполняется в форме). По умолчанию данные записываются в  localStorage.
	 */
	constructor(currentForm, idName, dataArray){
		this.currentForm = currentForm;
		this.idName = idName;
		this.dataArray = [];
		this.localStorageKey = this.getLocalStorageKey("-library");
		this.needAddToLocalStorege = true;

		if (dataArray) {
			this.dataArray = dataArray;
			this.needAddToLocalStorege = false;

		}else if(window.localStorage.getItem(this.localStorageKey)){
			this.dataArray = JSON.parse(window.localStorage.getItem(this.localStorageKey));
		}

		this.currentObject; // Текущий (последний) объект, который заполнялся.
	}

// --------------------------------------------------------------------------

	/**
	 * Метод подписчика, обновляет данные "this.dataArray"
	 */
	observerUpdate(dataArray){
		this.dataArray = dataArray;
	}

// --------------------------------------------------------------------------
	/**
	 * Обработчик событий при нажатии на кнопку "addBook". Берет с формы данные и записывает в базу данных.
	 * @param {string} dublicateKey Ключ, по которому будет происходить поиск дубликатов (по умолчанию дубликатом считается объект с таким-же ID)
	 * @return {object} Возвращает заполненный объект;
	 */
	addBookHandler(dublicateKey = this.idName) {

		// Проверка валидации. Если валидация вернула "false" — то закончить выполнение текущего метода
		if (this.validate() == false) {
			return false;
		}

		// Проверка и создание объекта нужного типа. 
		switch (this.getObjectType()) {

			case "book":
				this.currentObject =  new Book;
				break;

			case "author":
				this.currentObject =  new Author;
				break;

			case "genre":
				this.currentObject =  new Genre;
				break;

		}

		// Заполняем созданный объект
		this.fillObject();

		// Поиск дубликатов. Если находим дубликат объекта - метод заканчивает работу.
		if (this.findDublicate(dublicateKey)) { 
			return false;
		}
		
		// Очистка полей ввода формы
		this.cleanInput();
		
		// Добавляем настроенный объект в базу данных.
		this.addToDatabase();

		//Возвращаем созданный объект
		return this.currentObject;
	}
	

// --------------------------------------------------------------------------
	/**
	 * Метод для заполнения объекта значениями с полей ввода в форме (input)
	 * @param {object} currentObject Пустой объект, который необходимо заполнить
	 * @return {void} Ничего не возвращает
	 */
	fillObject(){

		let elements = this.currentForm.elements;

		// Создаем и заполняем ID объекта
		this.currentObject[this.idName] = this.getID(this.idName);

		// Перебираем все поля ввода
		for (let i = 0; i < elements.length; i++) {

			// Если элемент формы не имеет атрибута 'ignore'-- заполняем объект, если атрибут имеется -- игнорируем заполнения объекта
			if (elements[i].hasAttribute('ignore') == false) {

				// Создаем свойство у объекта с таким же именем, как и значение "id" в input
				this.currentObject[elements[i].getAttribute("id")] = elements[i].value;
			} 
		}
	}

// --------------------------------------------------------------------------
	/**
	 * Метод очищает все поля текущей формы.
	 * @todo Передлелать этот метод через цикл "forEach" или "for in "
	 * @return Ничего не возвращает
	 */

	cleanInput(){

		for (let i = 0; i < this.currentForm.elements.length; i++) {

			// Если поле скрытое, или элемент формы — кнопка, то пропускаем и не очищаем эти элементы
			if (!(this.currentForm.elements[i].type == "hidden" || this.currentForm.elements[i].localName == "button" )) {
				this.currentForm.elements[i].value = "";
				this.currentForm.elements[i].className = "inputs-clean" ;
			}
		}

		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Вариант1
		// for (const key in form.elements) {
		// 	if (form.elements.hasOwnProperty(key)) {
		// 		if (key.type != "hidden" || key.localName != "button") {
		// 			key.value = "";
		// 			key.className = "inputs-clean" 
		// 		}
		// 	}
		// }
		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Вариант2
		// form.elements.forEach(element => {
		// 	if (element.type != "hidden" || element.localName != "button") {
		// 		element.value = "";
		// 		element.className = "inputs-clean" 
		// 	}
		// });


	}

// --------------------------------------------------------------------------
	/**
	 * Метод устанавливает, объект какого типа заполнятся в форме. Для работы метода в форме должно быть поле <input type='hidden' id='objtype' value=''>, иначе метод выбросит исключение.
	 * @return {string} Возвращает тип объекта, который заполняется в текущую форму
	 */
	getObjectType(){
		for (let i = 0; i < this.currentForm.elements.length; i++) {
			if (this.currentForm.elements[i].id == "objtype") {
				return this.currentForm.elements[i].value
			}
		}
		throw "Не найдено поле ввода  <input type='hidden'> с указанием типа объекта, который будет передан в базу данный. Добавьте в вашу форму поле <input type='hidden' id='objtype' value=''>  В поле value='' укажите тип объекта, который будет добавлен в базу данных"
	}

// --------------------------------------------------------------------------
	/**
	 * Метод проверяет дубликаты объектов. В случае нахождения дубликата выводит сообщение.
	 * @param {string} dublicateKey название поля объекта, по которобу будет происходить поиск дубликатов. 
	 * @return {boolean} true, если дубликат найден, false — если не нашел.
	 */
	findDublicate(dublicateKey = this.idName){

		let flag;

		if (!(this.dataArray)) {
			return false;
		}
		// Тут производится сравнение по полю "dublicateKey". Если есть совпадение — считается, что найден дубликат и метод выводит сообщение.
		flag = this.dataArray.some(item =>item[dublicateKey] == this.currentObject[dublicateKey]);
		if (flag) {
			alert ("такая запись уже есть");
		}
		return flag;
	}

// --------------------------------------------------------------------------

	//TODO Посмотреть метод validate
	/**
	 * Метод проверяет чтобы все необходимые поля были заполнены (минимум 1 символом). 
	 * 
	 * @return {boolean} "true", если все поля валидные. "false", если хотя-бы 1 поле не прошло проверку (тогда и форма считается не валидной)
	 */
	validate() {
		
		let counterOfInvalid = 0;
		let elements = this.currentForm.elements;

		for (let i = 0; i < elements.length; i++) {

			//Этим "if" обрабатывается исключение (те элементы формы, которые не нужно валидировать)
			if (elements[i].localName == "button") {
				continue;
			}
			// Сама проверка. Если в инпут не ввели данные— тогда применяется стиль (invalid) и обработчик завершает работу.
			if(elements[i].value.length == 0){

				elements[i].className = "inputs-invalid";
				counterOfInvalid++;
			}else{
				
				elements[i].className = "inputs-valid";
			}
		}

		// Если счетчик невалидных элементов больше нуля — то и сама форма невалидная (вернуть "false")
		if (counterOfInvalid > 0) {
			return false;
		}else{
			return true;
		}
	}

// --------------------------------------------------------------------------
	/**
	 * Метод  добавляет переданный ей объект в локальное хранилище (Local Storage).
	 * @return {void} Ничего не возвращает
	 */
	addToDatabase() {

		this.dataArray.push(this.currentObject);

		if (this.needAddToLocalStorege) {
			localStorage.setItem(this.localStorageKey, JSON.stringify(this.dataArray));
		}
	}

// --------------------------------------------------------------------------
	/**
	 *  Метод формирует уникальный  id  для нового объекта.
	 * @return {number} Возращает новое значение "id", которого еще не было (самое большое текущее "id" +1)
	 */
	getID() {

		let currentId = 0;

		// Если у нас присудствует массив с данными, то...
		if (this.dataArray) {
			// ...ищем самое большое значение "id"
			this.dataArray.forEach(element => {
				
				if( parseInt(element[this.idName])  > currentId){
					currentId  = parseInt(element[this.idName])
				}
			});
			// И возвращаем на 1 больше
			return currentId + 1;

		// Если данных нет -- возвращаем просто 1 (предпологается что это запрос перед созданием массива с данными)
		}else{
			return 1;
		}
		
	}

// --------------------------------------------------------------------------

	/**
	 * Метод формирует ключ для LocalStorage.
	 * @param {string} postfix Часть, которая указывается в названии ключа после типа объекта для создания имени ключа LocalStorage (по умолчанию "-library")
	 * @return {string} Возвращает созданный ключ для LocalStorage.
	 */
	getLocalStorageKey(postfix = "-library"){

		//Находим в форме поле ввода с id == "objtype" (это поле типа  "hidden")
		for (let i = 0; i < this.currentForm.elements.length; i++) {
			if (this.currentForm.elements[i].id == "objtype") {
				
				// Возвращаем созданный  ключ
				return this.currentForm.elements[i].value + postfix;
			}
		}

		throw "Метод не смог найти поле с id == 'objtype' и value == '<название вашего объекта>'. Убедитесь что оно есть "
	}

// --------------------------------------------------------------------------

	/**
	 * Метод находит поле для ввода, у которого есть привязка к данным в базе данных и заполняет данными.
	 * @return {void} Метод ничего не возвращает
	 */
	checkForm(){

		let localStorageKeyBind,
			objectPropertyBind ,
			arrayOfObjects;

		// Перебираем все элементы формы
		for (let i = 0; i < this.currentForm.elements.length; i++) {

			localStorageKeyBind = this.currentForm.elements[i].dataset.localStorageKeyBind;
			objectPropertyBind = this.currentForm.elements[i].dataset.objectPropertyBind;
			arrayOfObjects = JSON.parse(window.localStorage.getItem(localStorageKeyBind));

			// Если перебираемое поле для ввода содержит какую -либо из привязок -- тогда заполняем это поле объектами 
			if (localStorageKeyBind && objectPropertyBind) {
				this.fillInput(this.currentForm.elements[i], arrayOfObjects);

			// Если пользователь привязал что-то одно (из двух необходимых атрибутов) -- выбрасываем исключение
			} else if(localStorageKeyBind){
				throw "Нет привязки к свойству объекта. Укажите в HTML элементе атрибут <objectPropertyBind> со значением свойства объекта, которое необходимо выводить."
			} else if(objectPropertyBind){
				throw "Нет привязки к Массиву объектов в LocalStorage. Укажите атрибут <localStorageKeyBind> со значением ключа, из которого необходимо получить данные для привязки."
			}
		}
	}

// --------------------------------------------------------------------------
	/**
	 * Метод заполняет элемент формы значениями с массива.
	 * @param {object} element Елемент формы, который необходимо заполнить
	 * @param {Array} arrayOfObjects Массив объектов, из которых нужно взять необходимое значение
	 * @return {object} возвращает заполненный элемент
	 */
	fillInput(element, arrayOfObjects){

		let bindingKey = element.dataset.objectPropertyBind;
		let elementType = element.tagName.toLowerCase();

		if (arrayOfObjects) {
			switch (elementType) {

				// пока метод реализован только чтобы заполнять <select> 
				case "select":
					for (let i = 0; i < arrayOfObjects.length; i++) {
						let optionElement = document.createElement("option");
	
						// todo Сделать, чтобы в свойство "value" помещалось id_genre свойство. (Привязка осуществлялась по id объекта а не по его свойству)
						// optionElement.value = arrayOfObjects[i].idd
						optionElement.value = arrayOfObjects[i][bindingKey];
						optionElement.innerHTML = arrayOfObjects[i][bindingKey];
						element.appendChild(optionElement);
					}
					return element;
					break;
	
				default:
					break;
			}
		}else{
			return false;
		}
		
	}
}