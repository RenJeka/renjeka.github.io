//  Моя вспомогательная библиотека. Тут находятся функции-помощники, чтобы не подключать JQuery.

function $(selector) {
	return document.querySelector(selector);
}

function changeClass(clickedElement, targetElement, ...classOpened){
	clickedElement.addEventListener("click", () => {
		for (let i = 0; i < classOpened.length; i++) {
			targetElement.classList.toggle(classOpened[i])
		}
	});
}

export {$, changeClass};