

// Массив, в котором будут храниться все объекты книг. Этот массив будет помещатся в Local Storage как объект JSON.
let bookLibrary = [];


/**
 * Класс для создания объектов "Книги". Каждая книга — объект, свойства которого пользователь заполняет в полях "input" в форме "Добавить книгу"
 * @todo реализовать заполнение объекта с помощью конструктора. (В данный момент объект заполняется formHandler.addBookHandler())
 */
class Book{


	// Конструктор не применялся. Новый объект "book" заполняется с помощью цикла
/* 	constructor(id, name, author){
		this.id = id;
		this.name = name;
		this.author = author;

	} */

	// constructor(array){

	// 	for (let i = 0; i < array.length; i++) {
			
	// 	}
	// 	// array.forEach(element => {
	// 	// 	element.id = id;
	// 	// 	element.name = name;
	// 	// 	element.author = author;
	// 	// });
	// }



}


export {Book, bookLibrary};