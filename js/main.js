window.addEventListener("load", function () {
	function $(query) {
		return document.querySelector(query);
	}

	var mainContainer = $(".container");

	var items = document.querySelectorAll(".item");
	var socialIcons = document.querySelectorAll(".social-icons img");
	var itemBgImage;

	mainContainer.style.minHeight = window.innerHeight + "px";

	window.addEventListener("resize", function () {
		mainContainer.style.minHeight = window.innerHeight + "px";
	});


	//Цикл, который перебирает блоки с сайтами (блоки с классом .item)
	for (let i = 0; i< items.length; i++) {
		
		// Устанавливаем фон для каждого блока
		if (items[i].dataset.bg) {

			console.dir(items[i].style);
			itemBgImage = items[i].dataset.bg.substr(1, items[i].dataset.bg.length -1);
			items[i].style.backgroundImage = "url("+itemBgImage+")";
			// items[i].style.backgroundImage = "url("+items[i].dataset.bg+");";
			
			console.dir(items[i].style.backgroundImage);
			


		}
		
		//	Установлавливаем обработчик событий для каждого блока (переход на нужный сайт)
		items[i].addEventListener("click", function () {
			window.location.href = this.dataset.href;
		});
	}

	for (let j = 0; j< socialIcons.length; j++) {
		socialIcons[j].addEventListener("click", function () {
			window.open (this.dataset.href);
		});
	}
	
});