window.onload = function () {
	var btn_left = document.getElementById("btn_left");	
	var btn_top = document.getElementById("btn_top");	
	var btn_bottom = document.getElementById("btn_bottom");	
	var btn_right = document.getElementById("btn_right");
	var changeImg = document.getElementById("changeImg");
	var div1 = document.querySelector(".div1");	
	// Эти флаги нужны  для того, чтобы одна анимация не "налазила" на другую
	var flagLR = false;
	var flagTB = false;
	var animationSpeed = 1;

	// Первоначальную позицию нашего элемента "div" нужно задать так, чтобы он был четко посредине текущего экрана, учитывая кнопки вверху. Нижние шесть строк делают это.
	var divWidth = parseInt(window.getComputedStyle(div1).width);
	var divHeight = parseInt(window.getComputedStyle(div1).height);
	var currentPosX = window.innerWidth / 2 -(divWidth/2);
	var currentPosY = window.innerHeight / 2 -(divHeight);
	div1.style.left = currentPosX + "px";
	div1.style.top = currentPosY + "px";
	div1.classList.add("ufo1");


	// обработчики событий на "клик" 
	btn_left.onclick = fMoveLeft;
	btn_top.onclick = fMoveTop;
	btn_bottom.onclick = fMoveBottom;
	btn_right.onclick = fMoveRight;
	changeImg.onclick = ftoggleImage;

	function ftoggleImage() {
		div1.classList.toggle("ufo1");
		div1.classList.toggle("ufo2");
	}

//=============================================
//     	Функция ДВИЖЕНИЕ ВПРАВО
// Нижние функции делают одно и то же, просто в разные стороны. Берем текущую позицию и изменяем её, записываем текущую позицию в стили элемента "div".
//=============================================
	
	function fMoveRight() {
		// Эту сложную проверку ниже (if- else) я сделал, чтобы наша картинка дошла точно к краю окна браузера, а не заходила за него. 
		if (currentPosX < window.innerWidth-(divWidth *2)) {
			if (!flagLR) {
				flagLR = true;
				var pos = currentPosX;
				var animation = setInterval(move, animationSpeed);
				
				// функция движения
				function move() {
					if (pos == currentPosX+100) {
						clearInterval(animation);
						currentPosX = pos ;
						flagLR = false;
					} else {
						div1.style.left = ++pos + "px";
					}
				}	
			}
		}else   {
			if (!flagLR) {
				flagLR = true;
				var pos = currentPosX;
				currentPosX+=window.innerWidth -currentPosX-divWidth-10;
				var animation = setInterval(move, animationSpeed);
				
				function move() {
					if (pos == currentPosX) {
						clearInterval(animation);
						currentPosX = pos ;
						flagLR = false;
					} else {
						div1.style.left = ++pos + "px";
					}
				}	
			}
		}
	}
//=============================================
//     Функция ДВИЖЕНИЕ ВЛЕВО
//=============================================
	function fMoveLeft() {
		// функция движения
		function move() {
			if (pos == currentPosX-100) {
				clearInterval(animation);
				currentPosX = pos ;
				flagLR = false;
			} else {
				div1.style.left = --pos + "px";
			}
		}	

		// проверка не зашел ли "div" за граници экрана
		if (currentPosX > 0) {
			if (!flagLR) {
				flagLR = true;
				var pos = currentPosX;
				var animation = setInterval(move, animationSpeed);
			}
		}	
	}
//=============================================
//     Функция ДВИЖЕНИЕ ВВЕРХ
//=============================================
	function fMoveTop() {
		// функция движения
		function move() {
			if (pos == currentPosY-100) {
				clearInterval(animation);
				currentPosY = pos ;
				flagTB = false;
			} else {
				div1.style.top = --pos + "px";
			}
		}
		
		// проверка не зашел ли "div" за граници экрана
		if (currentPosY > 0) {
			if (!flagTB) {
				flagTB = true;
				var pos = currentPosY;
				var animation = setInterval(move, animationSpeed);	
			}
		}
		
	}
//=============================================
//     Функция ДВИЖЕНИЕ ВНИЗ 
//=============================================
	function fMoveBottom() {
		// функция движения
		function move() {
			if (pos == currentPosY+100) {
				clearInterval(animation);
				currentPosY = pos ;
				flagTB = false;
			} else {
				div1.style.top = ++pos + "px";
			}
		}

		// проверка не зашел ли "div" за граници экрана
		if (currentPosY < window.innerHeight-(divHeight *3) ) {
			if (!flagTB) {
				flagTB = true;
				var pos = currentPosY;
				var animation = setInterval(move, animationSpeed);

			}
		}
	}

};