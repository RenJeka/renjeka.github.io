//  Моя вспомогательная библиотека. Тут находятся функции-помощники, чтобы не подключать JQuery.

/**
 * Функция захвата DOM-элемента
 * @param {string} selector Селектор, по которому необходимо вернуть элемент
 * @return {object} Первый найденный элемент DOM-дерева.
 */
function $(selector) {
	return document.querySelector(selector);
}

/**
 * Функция, которая меняет (переключает) указанные классы (в ...rest -параметре) указанного DOM-элемента.
 * @description С помощью CSS классов невозможно изменить стили родительского элемента. Для решении этого применяется данная функция
 * @param {string} event Событие, по которому функция меняет класс.
 * @param {object} eventElement Элемент, на котором происходит событие.
 * @param {object} targetElement Целевой элемент, чьи классы должны изменится
 * @param {...any} classOpened Классы, которые должны поменятся (rest-параметр)
 * @return {void} Ничего не возвращает
 */
function changeClass(event, eventElement, targetElement, ...classOpened){
	eventElement.addEventListener(event, () => {
		for (let i = 0; i < classOpened.length; i++) {
			targetElement.classList.toggle(classOpened[i])
		}
	});
}

export {$, changeClass};