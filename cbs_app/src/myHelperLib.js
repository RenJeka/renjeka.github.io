//  Моя вспомогательная библиотека. Тут находятся функции-помощники, чтобы не подключать JQuery.

function $(selector) {
	return document.querySelector(selector);
}

function changeClass(clickedElement, targetElement, classOpened){
	clickedElement.addEventListener("click", () => {
			targetElement.classList.toggle(classOpened)
	});
}

export {$, changeClass};