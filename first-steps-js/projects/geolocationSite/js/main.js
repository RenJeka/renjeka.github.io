window.addEventListener("load", function () {
	var arrayOfBtn = document.querySelectorAll('button');

	var iframe = document.querySelector('iframe');

	var whichHotel;


	var hotels ={
		hotel_1:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3540.7897323667758!2d-82.60939350979717!3d27.444662989156537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c3142a5481c95d%3A0x902f1690d2fb1069!2sLegacy%20Hotel%20at%20IMG%20Academy!5e0!3m2!1sru!2sua!4v1567525097046!5m2!1sru!2sua",

		hotel_2:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1343.2525274817747!2d-48.75464736652733!3d-17.777974108799693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94a0cb7786f1e01f%3A0x8decbda7b8ab08f2!2sRio%20Quente%20Cristal%20Resort!5e0!3m2!1sru!2sua!4v1567532675954!5m2!1sru!2sua",

		hotel_3:"https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d8666.77249831367!2d-82.69641271108156!3d27.46323994241093!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x98f2808e17efb1b5!2sBridgeWalk%20-%20A%20Landmark%20Resort!5e0!3m2!1sru!2sua!4v1567529142691!5m2!1sru!2sua",

		hotel_4:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.873779588248!2d-82.70256248471688!3d27.473188642349665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c3119817fb9bb5%3A0xb102de0897302843!2z0KLQvtGA0YLRjtCz0LAg0JjQvdC9INCR0LjRhyDQoNC10LfQvtGA0YI!5e0!3m2!1sru!2sua!4v1567529328376!5m2!1sru!2sua",

		hotel_5:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.4608186630135!2d76.8008472151308!3d30.705443081646607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fed0bc9d5a42f%3A0xe0e8a9bccc7a28ba!2sLemon%20Tree%20Hotel%2C%20Chandigarh!5e0!3m2!1sru!2sua!4v1567529395659!5m2!1sru!2sua",

	};






	// Задаем высоту нашей карты через высоту окна текущего браузера 
	iframe.setAttribute("height", window.innerHeight );

	// Перебор всех кнопок чтобы повесить обработчик события
	for (i = 0; i<arrayOfBtn.length ; i++) {
		
		arrayOfBtn[i].addEventListener("click", function () {
			iframe.style.display = "block";
			window.location.href="#iframe";
			whichHotel = this.dataset.location;
			whichHotel = hotels[whichHotel];
			iframe.setAttribute("src", whichHotel);

			console.log(whichHotel);
			
		});

	}
			


			// arrayOfBtn[this].addEventListener("click", function () {
			// 	console.dir(arrayOfBtn[this]);
			// });
		
});