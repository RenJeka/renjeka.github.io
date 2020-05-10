window.addEventListener("load", function () {

	// Сделаем поиск рандомного числа, но которое будет в пределах ширины либо высоты окна браузера
	function random(pos) {
		// Найдем высоту и ширину текущего элемента (кнопки). В последствии нужно её будет отнять чтобы наш элемент (кнопка) не выходил за пределы окна браузера.
		var inpHeight = window.getComputedStyle(btn1).height;
		var inpWidth = window.getComputedStyle(btn1).width;
		inpHeight = parseFloat(inpHeight.substr(0,inpHeight.length-2));
		inpWidth = parseFloat(inpWidth.substr(0,inpWidth.length-2));

		if (pos == "height") {
			return Math.floor(Math.random()*((window.innerHeight - inpHeight) - 0))+0;
		}else if(pos == "width"){
			return Math.floor(Math.random()*((window.innerWidth - inpWidth) - 0))+0;
		}else{
			return Math.floor(Math.random()*(500 - 0)) + 0;
		}
	}

	// Фнкция для обработчика события по нашему элементу (кнопки), которая двигает его на определенное (рандомное) кол-во пикселей.
	function runOut() {
		btn1.style.top = random("height") + "px";
		btn1.style.left = random("width") + "px";
	}
	
	var btn1 = this.document.getElementById("btn_1");
	btn1.addEventListener("mouseover", runOut);

});