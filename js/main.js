window.addEventListener("load", function () {
	function $(query) {
		return document.querySelector(query);
	}

	var mainContainer = $(".container");

	var items = document.querySelectorAll(".item");
	var socialIcons = document.querySelectorAll(".social-icons img");

	mainContainer.style.minHeight = window.innerHeight + "px";

	window.addEventListener("resize", function () {
		mainContainer.style.minHeight = window.innerHeight + "px";
	});

	for (let i = 0; i< items.length; i++) {
		items[i].addEventListener("click", function () {
			window.location.href = this.dataset.href;
		});
	}

	for (let j = 0; j< socialIcons.length; j++) {
		socialIcons[j].addEventListener("click", function () {
			window.location.href = this.dataset.href;
		});
	}
	
});