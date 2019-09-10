window.addEventListener("load", function () {
	function $(query) {
		return document.querySelector(query);
	}

	var mainContainer = $(".container");

	mainContainer.style.minHeight = window.innerHeight + "px";

	window.addEventListener("resize", function () {
		mainContainer.style.minHeight = window.innerHeight + "px";
	});


	
});