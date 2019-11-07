import { Book} from '../objectsClasses/books.class';
import { Genre } from '../objectsClasses/genres.class';
import { Author } from '../objectsClasses/authors.class';

/**
 * Класс для создания объекта "Форма"
 */
export class Form{

	/**
	 * Конструктор класса "Form". Создает объект -- Форма, который подвязывается под под 1 HTML -форму.
	 * @param {object} currentForm  Текущая <HTML>-форма, которая привязывается к данному объекту
	 * @param {String} idName название ID для идентификации каждого объекта
	 * @param {Array} dataArray (не обязательный) Массив данных, (набор объектов, что заполняется в форме). По умолчанию данные записываются в  localStorage.
	 */
	constructor(currentForm, idName, dataArray){
		this.currentForm = currentForm;
		this.idName = idName;
		this.dataArray = [];

		/**	
		 * Ключ от localStorage, где хранится массив данных с объектами, которые которые обрабатывает данная форма.
		 */
		this.localStorageKey = this.getLocalStorageKey("-library");

		/**	
		 * Нужно ли добавлять данные в LocalStorege (true -нужно, false -не нужно)
		 */
		this.needAddToLocalStorege = true;

		// TODO Как сделать так, чтобы объекты 2 разных классов знали друг о друге сразу, через конструктор. (И нужно ли вообще это?)
		// this.tableObject = tableObject;
		// this.tableObject;

		if (dataArray) {
			this.dataArray = dataArray;
			this.needAddToLocalStorege = false;

		}else if(window.localStorage.getItem(this.localStorageKey)){
			this.dataArray = JSON.parse(window.localStorage.getItem(this.localStorageKey));
		}
		/**	
		 * Последний (текущий) объект, который заполнялся.
		 */
		this.lastFilledObject = {}; 

		/**	
		 * Объект, который в текущий момент выбран в таблице.
		 */
		this.selectedObject;
	}

// --------------------------------------------------------------------------

	/**
	 * @param {object} Принимает объект с 4 свойсвами (свойства объекта класса Table) : currentTable - текущая таблица, tableData - текущий массив, которым заполнена таблица, selectedObject - текущий выбранный объект в таблице
	 * Метод подписчика, обновляет данные "this.selectedObject"
	 * @return {void} Ничего не возвращает
	 */
	observerUpdate({currentTable, tableData, selectedObject}){
		this.selectedObject = selectedObject
	}

// --------------------------------------------------------------------------
	/**
	 * Обработчик событий при нажатии на кнопку добавления объекта в базу данных. Берет с формы данные и записывает в базу данных.
	 * @param {string} dublicateKey Ключ, по которому будет происходить поиск дубликатов (по умолчанию дубликатом считается объект с таким-же ID)
	 * @return {object} Возвращает заполненный объект;
	 */
	addButtonHandler(dublicateKey = this.idName) {

		// Проверка валидации. Если валидация вернула "false" — то закончить выполнение текущего метода
		if (this.validate() == false) {
			return false;
		}

		// Проверка и создание объекта нужного типа. 
		switch (this.getObjectType()) {

			case "book":
				this.lastFilledObject =  new Book;
				break;

			case "author":
				this.lastFilledObject =  new Author;
				break;

			case "genre":
				this.lastFilledObject =  new Genre;
				break;
		}

		// Заполнение созданного объекта
		this.fillObject();

		// Поиск дубликатов. Если находим дубликат объекта - метод заканчивает работу.
		if (this.findDublicate(dublicateKey)) { 
			return false;
		}
		
		// Очистка полей ввода формы
		this.cleanInputs();
		
		// Добавляем настроенный объект в базу данных.
		this.addToDatabase();

		//Возвращаем созданный объект
		return this.lastFilledObject;
	}
	

// --------------------------------------------------------------------------
	/**
	 * Метод для заполнения объекта значениями с полей ввода в форме (input)
	 * @param {number} id id объекта, который будет заполняется. (По умолчанию генерируется новый)
 	 * @return {object} Возвращает заполненный объект
	 */
	fillObject(id){
		
		let elements = this.currentForm.elements, // Список эллементов формы
			fillableObject, // Объект, который будет заполнен и возвращен методом.
			accumulateValues = ""; // Переменная, куда будут накапливаться значения в случае множественного выбора из <select>


		// Очищаем свойство "this.lastFilledObject" от старых значений. 
		for (var prop in this.lastFilledObject) delete this.lastFilledObject[prop];

		// Если мы передали "id" заполняемого объекта -- используем его в качестве id, если нет --генерируем новый id
		if (id) {
			this.lastFilledObject[this.idName] = parseInt(id);
		}else{
			// Создаем и заполняем ID объекта
			this.lastFilledObject[this.idName] = this.getID();
		}
		
		// Перебираем все поля ввода
		for (let i = 0; i < elements.length; i++) {
			// console.dir(elements[i]);
			// Если элемент формы не имеет атрибута 'ignore'-- заполняем объект, если атрибут имеется -- игнорируем заполнения объекта
			if (elements[i].hasAttribute('ignore') == false) {

				// Если элемент типа "select" имеет атрибут "multiple" (Если присутствует множественный выбор)
				if (elements[i].type == "select-multiple") {
					
					// Перебираем в данном элементы все выбранные <option>
					for (let k = 0; k < elements[i].selectedOptions.length; k++) {

						// и конкатенируем их в переменную "accumulateValues"
						accumulateValues += `${elements[i].selectedOptions[k].value}, \n`;
					}
					// После этого создаем свойство в объекте и записываем результат конкатенации в это свойство.
					this.lastFilledObject[elements[i].getAttribute("id")] = accumulateValues;

				// Иначе просто создаем свойство у объекта с таким же именем, как и значение "id" в input
				}else{
					this.lastFilledObject[elements[i].getAttribute("id")] = elements[i].value;
				}
				
			} 
		}

		// Клонируем объект, чтобы метод смог его вернуть;
		fillableObject = Object.assign({},this.lastFilledObject)
		return fillableObject;
	}

// --------------------------------------------------------------------------
	/**
	 * Метод очищает все поля текущей формы.
	 * @todo Передлелать этот метод через цикл "forEach" или "for in "
	 * @return Ничего не возвращает
	 */

	cleanInputs(){

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
		flag = this.dataArray.some(item =>item[dublicateKey] == this.lastFilledObject[dublicateKey]);
		if (flag) {
			alert ("такая запись уже есть");
		}
		return flag;
	}

// --------------------------------------------------------------------------

	//TODO Посмотреть метод validate
	/**
	 * Метод проверяет форму на валидность (чтобы все необходимые поля были заполнены минимум 1 символом). 
	 * @return {boolean} "true", если все поля валидные. "false", если хотя-бы 1 поле не прошло проверку (тогда и форма считается не валидной)
	 */
	validate() {
		
		let counterOfInvalid = 0, // Счетчик полей, которые не прошли валидацию
			elements = this.currentForm.elements; // Список элементов формы

		for (let i = 0; i < elements.length; i++) {

			let pattern 	 = elements[i].dataset.pattern, // регуляр. выраж., по которому будет происходить проверка валидации.
				message 	 = elements[i].dataset.message, // Сообщение, которое выводится в случае невалидности элемента
				boundId		 = elements[i].dataset.boundId, // id элемента, в который выводить сообщении
				boundElement = document.querySelector(`#${boundId}`), // элемент, в который будет выводится сообщение
				valid 		 = elements[i].value.search(pattern); // соответствие введеного значения -- паттерну

			// Валидацию будет проходить только тот элемент, у которого имеется свойство "pattern"
			if (pattern) {

				if (valid == -1) {

					elements[i].className = "inputs-invalid"

					if (boundElement) boundElement.innerHTML = message;
				
					counterOfInvalid++;
				}else{
					elements[i].className = "inputs-valid"
				}
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
	 * Метод перезаписывает Local Storage переданным в параметре объектом.
	 * @param {Array} newArray новый массив данных, которым нужно перезаписать Local Storage
	 * @return {Array} Возращает новый, перезаписанный массив с Local Storage
	 */
	overwriteLocalStorage(newArray){

		if (this.needAddToLocalStorege) {
			localStorage.setItem(this.localStorageKey, JSON.stringify(newArray));
			return JSON.parse(localStorage.getItem(this.localStorageKey))
		}else{ // Случай, если мы не работаем с localStorage, но метод был вызван.
			console.warn(`Свойство ${this}.needAddToLocalStorege в значении ${this.needAddToLocalStorege}. Не удалось записать в Local Storage`); 
			return newArray;
		}
	}

// --------------------------------------------------------------------------
	/**
	 * Метод  добавляет переданный в параметре объект -- в Local Storage.
	 * @return {void} Ничего не возвращает
	 */
	addToDatabase(object = this.lastFilledObject) {

		// Добавляем переданный объект "object" в масиив данных "this.dataArray"
		this.dataArray.push(object);

		// Перезаписываем LocalStorage
		return this.overwriteLocalStorage(this.dataArray);
	}

// --------------------------------------------------------------------------
	/**
	 * Метод, который удаляет объект из базы данных, который был передан в параметре.
	 * @param {object} object Объект, который необходимо удалить. По умолчанию "this.selectedObject"
	 * @return {Array} Возвращает актуальный массив данных. (или false, если нет объекта для удаления)
	 */
	deleteObject(object = this.selectedObject){
		
		if (object) {
			this.dataArray.splice(this.findObject(object), 1);
			return this.overwriteLocalStorage(this.dataArray);
		}else{
			return false;
		}
	}
	
// --------------------------------------------------------------------------
	/**
	 * Метод, который изменяет объект в базе данных, который был передан в параметре.
	 * @param {object} object Объект, который необходимо изменить. По умолчанию "this.selectedObject"
	 * @return {Array} Возвращает актуальный массив данных. 
	 */
	editObject(object = this.selectedObject){

		let copiedObject; // Переменная, чтобы склонировать объект "this.lastFilledObject"
		
		if (object) {
			this.fillObject(object[this.idName])

			// Клонируем объект "this.lastFilledObject", для того, чтобы избавиться от копирования по ссылке.
			copiedObject = Object.assign({},this.lastFilledObject)

			this.dataArray[this.findObject(object)] = copiedObject; 
			return this.overwriteLocalStorage(this.dataArray);
		} else {
			return false;
		}

	}
	
// --------------------------------------------------------------------------
	/**
	 * Метод находит индекс переданного в параметре объекта в текущем массиве данных (dataArray)
	 * @param {object} object Объект, который нужно найти в массиве данных.
	 * @return {number} Возвращает индекс объекта, который был передан в параметр.
	 */
	findObject(object){

		return  this.dataArray.findIndex((item)=>{
			// Если совпадают значения "id" в переданном объекте и в массиве данных -- возращаем индекс. 
			return item[this.idName] == object[this.idName]
		})
	}

// --------------------------------------------------------------------------
	/**
	 *  Метод формирует уникальный идентификатор для нового объекта.
	 * @return {number} Возращает новое значение "id", которого еще не было (самое большое текущее "id" +1)
	 */
	getID() {

		let currentId = 0; // Текущий "id"

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
	 * @param {string} postfix Постфикс (Часть, которая указывается в названии ключа после типа объекта для создания имени ключа LocalStorage (по умолчанию "-library"))
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
	 * @return {void} Ничего не возвращает
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

		let bindingKey = element.dataset.objectPropertyBind; // Свойство объекта, из которого необходимо взять значение и заполнить в элемент.
		let elementType = element.tagName.toLowerCase(); // Тип  DOM-элемента

		if (arrayOfObjects) {
			switch (elementType) {

				// пока метод реализован только чтобы заполнять <select> 
				case "select":
					for (let i = 0; i < arrayOfObjects.length; i++) {
						let optionElement = document.createElement("option");

						optionElement.value = arrayOfObjects[i][bindingKey];
						optionElement.innerHTML = arrayOfObjects[i][bindingKey];
						element.appendChild(optionElement);
					}
					return element;
				default:
					break;
			}
		}else{
			return false;
		}	
	}

	/**
	 * Метод заполняет поля текущей формы (всей формы) значениями из объекта
	 * @param {object} fillingObject Объект для заполнения формы. 
	 * @return {void} Ничего не возвращает
	 */
	fillForm(fillingObject){

		// Перебираем все элементы формы
		for (let i = 0; i < this.currentForm.elements.length; i++) {

			// Если поле не скрытое, или элемент формы — не кнопка
			if (!(this.currentForm.elements[i].type == "hidden" || this.currentForm.elements[i].localName == "button" )) {

				// перебираем все свойства объекта "fillingObject"
				for (const key in fillingObject) {

					// Если название свойства объекта соответсвует значению "id" в input-те
					if (key == this.currentForm.elements[i].id){

						// тогда заполняем поле значением со свойсва объекта.
						this.currentForm.elements[i].value = fillingObject[key];
					}
				}
			}
		}
	}
}