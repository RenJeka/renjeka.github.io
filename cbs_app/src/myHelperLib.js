//  Моя вспомогательная библиотека. Тут находятся функции-помощники, чтобы не подключать JQuery.

function $(selector) {
	return document.querySelector(selector);
}
function tag(tagName) {
	return document.getElementsByTagName(tagName);
}

function testFunc(returnValue) {
	if (Array.isArray(returnValue)) {
		console.log("Массив");
		console.dir(returnValue);
		
	}else if(returnValue instanceof Object){
		console.log("Объект");
		console.dir(returnValue);

	}else{
		console.log("Что-то другое");
	}
}

export {$, tag, testFunc};