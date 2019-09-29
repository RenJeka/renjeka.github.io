// Эта библиотека отвечает за обработку данных с форм

import {$} from './myHelperLib';


// Функция для стилизации инпутов в стиль "invalid". Мы передаем на вход массив с инпутами, и функция их стилизует.
export function invalidStylist(arrayOfInputs) {
	for (let i = 0; i < arrayOfInputs.length; i++) {
		arrayOfInputs[i].className = "bookInputs-invalid";
	} 
}
