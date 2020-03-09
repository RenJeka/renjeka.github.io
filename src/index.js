window.addEventListener("load", function () {

	var mainContainer = document.querySelector(".container"), // Главный контейнер
		items = document.querySelectorAll(".item"),	// Элемент, который указывакт на определенный сайт
		socialIcons = document.querySelectorAll(".social-icons img"), // Массив с иконками соц-сетей
		itemBgImage; 					

	// ======================== НАСТРОЙКА ГЛАВНОГО БЛОКА ==============================
	// Подгоняем правильный размер для главного блока сайта, чтобы корректно работала адаптация
	mainContainer.style.minHeight = window.innerHeight + "px";

	window.addEventListener("resize", function () {
		mainContainer.style.minHeight = window.innerHeight + "px";
	});
	// ======================== КОНЕЦ НАСТРОЙКИ ГЛАВНОГО БЛОКА ========================


	/* 
	// =========================== ЭЛЕМЕНТ ITEM  ======================================
	//Цикл, который перебирает блоки с сайтами (блоки с классом .item)
	for (let i = 0; i < items.length; i++) {
		
		// Устанавливаем фон для каждого блока
		if (items[i].dataset.bg) {
			
			itemBgImage = items[i].dataset.bg.substr(1, items[i].dataset.bg.length -1); // Парсим строку, чтобы избавиться от кавычек, чтобы потом поместить его как фон для 
			items[i].style.backgroundImage = "url("+itemBgImage+")";  // Помеще
			// items[i].style.backgroundImage = "url("+items[i].dataset.bg+");";
		}
		
		//	Установлавливаем обработчик событий для каждого блока (переход на нужный сайт)
		items[i].addEventListener("click", function () {
			window.location.href = this.dataset.href;
		});
	}
	// =========================== КОНЕЦ ЭЛЕМЕНТ ITEM  ================================ 
	*/


	// ======================== ИКОНКИ СОЦ-СЕТЕЙ ======================================
	// Обработчик событий на нажатие по иконкам соцсетей
	for (let j = 0; j < socialIcons.length; j++) {

		socialIcons[j].addEventListener("click", function () {
			window.open (this.dataset.href);
		});
	}
	// ======================== КОНЕЦ ИКОНКИ СОЦ-СЕТЕЙ =================================
	
});