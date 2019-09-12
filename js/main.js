window.addEventListener("load", function () {
	function $(query) {
		return document.querySelector(query);
	}

	var mainContainer = $(".container");

	var items = document.querySelectorAll(".item");

	mainContainer.style.minHeight = window.innerHeight + "px";

	window.addEventListener("resize", function () {
		mainContainer.style.minHeight = window.innerHeight + "px";
	});

	for (let i = 0; i< items.length; i++) {
		items[i].addEventListener("click", function () {
			window.location.href = this.dataset.href;
		});
	}
	
});