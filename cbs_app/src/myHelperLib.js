//  Моя вспомогательная библиотека. Тут находятся функции-помощники, чтобы не подключать JQuery.
import menuIcon from"./img/arrow-d.svg";
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

	addImage(eventElement, menuIcon, "wrapper-logo-expand-icon");
	eventElement.addEventListener(event, () => {
		for (let i = 0; i < classOpened.length; i++) {
			targetElement.classList.toggle(classOpened[i])
		}
	});
}

/**
 * Функция добавляет дополнительную иконку в раскрывающееся меню после указанного элемента
 * @param {object} element DOM-элемент, после которого необходимо добавить иконку
 * @param {string} src путь к иконке
 * @param {string} cssClass css класс, который необходимо применить к иконке
 * @description Необходимо добавить элемент в "import",чтобы иконка была в наличии.
 */
function addImage(element,src,cssClass) {
	let image = new Image(),
		parent = element.parentNode;
	image.src = src;
	image.classList.add(cssClass);
	parent.appendChild(image);
}

export {$, changeClass};