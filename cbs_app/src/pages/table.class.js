import { $ } from "./myHelperLib";
import { formHandler } from "../formHandler";
import { tableWorker } from "../tableWorker";


/**
 * Класс для создания объекта "Таблица"
 * Объект таблица является Наблюдаемым объектом (Observable)
 * 
 * @constructor
 * 
 * @property {object} currentTable Текущая таблица, которая связывается с объектом
 * @property {} localStorageKey
 * @property {} tableData
 * 
 * @method  fillTable 
 */
export class Table{

	/**
	 * Конструктор. Создает объект -- таблица, которая подвязывается под 1 HTML-таблицу
	 * @param {String} currentTable CSS -селектор для нахождения нужной (связанной таблицы)
	 * @param {String} localStorageKey Ключ от локального храни
	 * @param {Array} tableData -- Массив объектов, которыми будет заполнятся таблица
	 * @param {Array} arrayOfObservers --Список подписчиков
	 */
	constructor(currentTable,localStorageKey,tableData){
		this.currentTable = $(currentTable);
		this.localStorageKey = formHandler.getLocalStorageKey(localStorageKey);
		this.tableData = tableData;
		this.arrayOfObservers = [];
	}

	/**
	 * Метод добавляет подписчика в массив подписчиков (паттерн Observer)
	 * @param {object} observer Подписчик на изменения свойства "tableData"
	 */
	addObserver(observer){
		this.arrayOfObservers.push(observer);
	}

	/**
	 * Метод вызывает метод подписчика (паттерн Observer)
	 */
	notify(){
		this.arrayOfObservers.forEach(element => {
			element.observerUpdate(this.currentTable, this.localStorageKey, this.tableData)
		});
	}

	fillTable(){

		if (this.currentTable && this.localStorageKey) {

			this.tableData = tableWorker.fillTable(this.currentTable, this.localStorageKey)

		}else if (this.currentTable && this.tableData) {

			this.tableData = tableWorker.fillTable(this.currentTable, this.tableData)

		}else{
			if (currentTable == false) {
				throw `Не найдена связанная HTML-таблица. Пожалуйста добавьте HTML-таблицу в свойство ${this}.currentTable `;
			}else if (this.localStorageKey == fasle && this.tableData) {
				
				throw `Не найдены данные для заполнения HTML-таблицы. Пожалуйста добавте данные. Если у вас массив с данными -- добавьте этот массив в свойство  ${this}.tableData, если у вас данные в LocalStorage -- добавте ключ к данным в свойство ${this}.localStorageKey`;
			}
			
		}
		
	}
}