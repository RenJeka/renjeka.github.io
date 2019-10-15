//  Моя вспомогательная библиотека. Тут находятся функции-помощники, чтобы не подключать JQuery.

function $(selector) {
	return document.querySelector(selector);
}
function tag(tagName) {
	return document.getElementsByTagName(tagName);
}

export {$, tag };