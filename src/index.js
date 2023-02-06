window.addEventListener("load", function () {

	var mainContainer = document.querySelector(".container"),
		items = document.querySelectorAll(".item"),
		socialIcons = document.querySelectorAll(".social-icons img"),
		itemBgImage; 					

	const 	infoIcon = document.querySelector("#infoIcon"),
			modalOverlay = document.querySelector(".modal-overlay"),
			modal = document.querySelector(".modal"),
			modalClose = document.querySelector(".modal-close");

	infoIcon.addEventListener("click", ()=>{
		modalOverlay.classList.add("modal-overlay-visible");
		modal.classList.add("modal-visible");
	});

	modalOverlay.addEventListener("click", (e)=>{
		modalOverlay.classList.remove("modal-overlay-visible");
		modal.classList.remove("modal-visible");
	});

	modalClose.addEventListener("click", ()=>{
		console.log('modal-close');
		modalOverlay.classList.remove("modal-overlay-visible");
		modal.classList.remove("modal-visible");
	});
	// ======================== MAIN UNIT SETUP START ======================
	// We adjust the correct size for the main block of the site so that the adaptation works correctly
	mainContainer.style.minHeight = window.innerHeight + "px";

	window.addEventListener("resize", function () {
		mainContainer.style.minHeight = window.innerHeight + "px";
	});
	// ======================== MAIN UNIT SETUP END ========================


	// ======================== SOCIAL ICONS START  ======================================
	// Click event handler for social media icons
	for (let j = 0; j < socialIcons.length; j++) {

		socialIcons[j].addEventListener("click", function () {
			window.open (this.dataset.href);
		});
	}
	// ======================== SOCIAL ICONS END  =================================
	
});