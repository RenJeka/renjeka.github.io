

// Массив, в котором будут храниться все объекты книг. Этот массив будет помещатся в Local Storage как объект JSON.
let bookLibrary = [];

class Book{

	// Конструктор не применялся. Новый объект "book" заполняется с помощью цикла
	constructor(id, name, author){
		this.id = id;
		this.name = name;
		this.author = author;

	}

}


export {Book, bookLibrary};