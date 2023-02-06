window.addEventListener("load", function () {

	// Helper function to capture the element
	function $(query) {
		return document.querySelector(query);
	}

	var mainContainer = $(".container"),
		items = document.querySelectorAll(".item"),	// An element that points to a specific site
		socialIcons = document.querySelectorAll(".social-icons img"),
		itemBgImage; 

	// ======================== MAIN UNIT SETUP START ==============================
	// We adjust the correct size for the main block of the site so that the adaptation works correctly
	mainContainer.style.minHeight = window.innerHeight + "px";

	window.addEventListener("resize", function () {
		mainContainer.style.minHeight = window.innerHeight + "px";
	});
	// ======================== MAIN UNIT SETUP END ========================


	// =========================== ITEM ELEMENT START ======================================
	// A loop that loops through blocks with websites (blocks with the .item class)
	for (let i = 0; i < items.length; i++) {
		
		// Set the background for each block
		if (items[i].dataset.bg) {
			
			itemBgImage = items[i].dataset.bg.substr(1, items[i].dataset.bg.length -1); // We parse the background path to get rid of the quotes so that we can later place it as a background for the card
			items[i].style.backgroundImage = "url("+itemBgImage+")";  // Помеще
			// items[i].style.backgroundImage = "url("+items[i].dataset.bg+");";
		}
		
		//	Set an event handler for each block (go to the desired site)
		items[i].addEventListener("click", function () {
			window.location.href = this.dataset.href;
		});
	}
	// =========================== ITEM ELEMENT END  ================================
	

	// ======================== SOCIAL ICONS START ======================================
	// Click event handler for social media icons
	for (let j = 0; j < socialIcons.length; j++) {

		socialIcons[j].addEventListener("click", function () {
			window.open (this.dataset.href);
		});
	}
	// ======================== SOCIAL ICONS END =================================
	
});