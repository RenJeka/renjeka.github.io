(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.$=function(e){return document.querySelector(e)}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Table=void 0;var a=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),i=r(0);t.Table=function(){function e(t,r,a){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.currentTable=(0,i.$)(t),this.formObject=r,this.tableData=a,this.boundForm=r.currentForm,this.localStorageKey=r.localStorageKey,this.arrayOfObservers=[],this.sortMark,this.sortDirection=!0,this.otherRowSelectHandler,this.selectedObject}return a(e,[{key:"addObservers",value:function(){for(var e=this,t=arguments.length,r=Array(t),a=0;a<t;a++)r[a]=arguments[a];r.forEach((function(t){e.arrayOfObservers.push(t)}))}},{key:"notify",value:function(){var e=this;this.arrayOfObservers.forEach((function(t){t.observerUpdate({currentTable:e.currentTable,tableData:e.tableData,selectedObject:e.selectedObject})}))}},{key:"observerUpdate",value:function(){this.otherRowSelectHandler?this.currentTable.onclick=this.otherRowSelectHandler.bind(this):this.currentTable.onclick=this.rowSelectHandler.bind(this)}},{key:"fillTable",value:function(e,t){if(e&&(this.sortMark=e),t&&(this.sortDirection=t),this.currentTable&&this.tableData){for(var r=0;r<this.tableData.length;r++)this.addRows(this.tableData[r]).rowIndex;return this.tableData}if(this.currentTable&&this.localStorageKey){if(this.tableData=this.getTableData(),0==this.tableData)return!1;for(var a=0;a<this.tableData.length;a++)this.addRows(this.tableData[a]).rowIndex;return this.tableData}if(0==this.currentTable)throw"Не найдена связанная HTML-таблица. Пожалуйста добавьте HTML-таблицу в свойство "+this+".currentTable ";if(0==this.localStorageKey&&0==this.tableData)throw"Не найдены данные для заполнения HTML-таблицы. Пожалуйста добавте данные. Если у вас массив с данными -- добавьте этот массив в свойство  "+this+".tableData, если у вас данные в LocalStorage -- добавте ключ к данным в свойство "+this+".localStorageKey"}},{key:"getTableData",value:function(){var e=this,t=localStorage.getItem(this.localStorageKey);if(t){if((t=JSON.parse(t)).some((function(t){return t[e.sortMark]})))return t.sort(this.sortFunc1.bind(this));if(null==this.sortMark)return t;throw"Значение, переданное для сортировки — не верное. Такого свойства у объекта нет."}return!1}},{key:"addRows",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,r=arguments[2],a=[],i=void 0;function n(n){for(var s=0;s<t;s++){i=document.createElement("tr"),n.currentTable.tBodies[0].appendChild(i);for(var o=0;o<r;o++){var l=document.createElement("td");i.appendChild(l)}a.push(i),e&&n.addInfoInRow(i.rowIndex,e)}return a}return null==r&&(r=this.currentTable.rows[0].cells.length),1==t?(a=n(this))[0]:n(this)}},{key:"addInfoInRow",value:function(e,t){for(var r=0;r<this.currentTable.rows[e].cells.length;r++)this.addInfoInCell(t,e,r)}},{key:"addInfoInCell",value:function(e,t,r){for(var a in e)if(e.hasOwnProperty(a)&&a.toLowerCase()===this.getTableColumnHead(r).toLowerCase())return this.currentTable.rows[t].cells[r].innerHTML=e[a],this.currentTable.rows[t].cells[r]}},{key:"getTableColumnHead",value:function(e){return this.currentTable.rows[0].cells[e].dataset.objectKeyBind}},{key:"cleanTable",value:function(e){if(e=parseInt(e)){if(!(e<=this.currentTable.rows.length-1&&e>=0))throw"Невозможно удалить строку. Такой строки не существует. Проверьте правильность передаваемого в параметр значения.";this.currentTable.deleteRow(e)}else for(;this.currentTable.rows.length>1;)this.currentTable.deleteRow(this.currentTable.rows.length-1)}},{key:"search",value:function(e,t){return this.tableData=this.getTableData(),this.tableData?this.tableData.filter((function(r){return r[t].trim().toLowerCase().includes(e.value.trim().toLowerCase())})):(console.log("Не удалось найти массив с данными"),!1)}},{key:"tableClickHandler",value:function(e){this.otherRowSelectHandler=e,this.otherRowSelectHandler?this.currentTable.onclick=this.otherRowSelectHandler.bind(this):this.currentTable.onclick=this.rowSelectHandler.bind(this)}},{key:"rowSelectHandler",value:function(e){var t=void 0;return this.sortMark=e.target.dataset.objectKeyBind,this.sortMark&&"TH"==e.target.tagName?(this.sortDirection=!this.sortDirection,this.tableData.sort(this.sortFunc1.bind(this)),this.cleanTable(),t=this.fillTable(),this.tableData=t,this.selectedObject=null):"TD"==e.target.tagName&&(t=this.tableData[e.target.parentElement.rowIndex-1],this.selectedObject=t,this.formObject.fillForm(this.selectedObject),this.setClassToElement(e.target.parentElement,"row-selected")),this.notify(),t}},{key:"setClassToElement",value:function(e,t){for(var r=0;r<this.currentTable.rows.length;r++)this.currentTable.rows[r].className="",this.currentTable.rows[r]==e&&(this.currentTable.rows[r].className=t)}},{key:"sortFunc1",value:function(e,t){if(this.sortDirection){if(e[this.sortMark]>t[this.sortMark])return 1;if(e[this.sortMark]==t[this.sortMark])return 0;if(e[this.sortMark]<t[this.sortMark])return-1}else{if(e[this.sortMark]<t[this.sortMark])return 1;if(e[this.sortMark]==t[this.sortMark])return 0;if(e[this.sortMark]>t[this.sortMark])return-1}}}]),e}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Form=void 0;var a=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),i=r(4),n=r(5),s=r(6);t.Form=function(){function e(t,r,a){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.currentForm=t,this.idName=r,this.dataArray=[],this.localStorageKey=this.getLocalStorageKey("-library"),this.needAddToLocalStorege=!0,a?(this.dataArray=a,this.needAddToLocalStorege=!1):window.localStorage.getItem(this.localStorageKey)&&(this.dataArray=JSON.parse(window.localStorage.getItem(this.localStorageKey))),this.lastFilledObject={},this.selectedObject}return a(e,[{key:"observerUpdate",value:function(e){e.currentTable,e.tableData;var t=e.selectedObject;this.selectedObject=t}},{key:"addButtonHandler",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.idName;if(0==this.validate())return!1;switch(this.getObjectType()){case"book":this.lastFilledObject=new i.Book;break;case"author":this.lastFilledObject=new s.Author;break;case"genre":this.lastFilledObject=new n.Genre}return this.fillObject(),!this.findDublicate(e)&&(this.cleanInputs(),this.addToDatabase(),this.lastFilledObject)}},{key:"fillObject",value:function(e){var t=this.currentForm.elements,r="";for(var a in this.lastFilledObject)delete this.lastFilledObject[a];this.lastFilledObject[this.idName]=e?parseInt(e):this.getID();for(var i=0;i<t.length;i++)if(0==t[i].hasAttribute("ignore"))if("select-multiple"==t[i].type){for(var n=0;n<t[i].selectedOptions.length;n++)r+=t[i].selectedOptions[n].value+", \n";this.lastFilledObject[t[i].getAttribute("id")]=r}else this.lastFilledObject[t[i].getAttribute("id")]=t[i].value;return Object.assign({},this.lastFilledObject)}},{key:"cleanInputs",value:function(){for(var e=0;e<this.currentForm.elements.length;e++)"hidden"!=this.currentForm.elements[e].type&&"button"!=this.currentForm.elements[e].localName&&(this.currentForm.elements[e].value="",this.currentForm.elements[e].className="inputs-clean")}},{key:"getObjectType",value:function(){for(var e=0;e<this.currentForm.elements.length;e++)if("objtype"==this.currentForm.elements[e].id)return this.currentForm.elements[e].value;throw"Не найдено поле ввода  <input type='hidden'> с указанием типа объекта, который будет передан в базу данный. Добавьте в вашу форму поле <input type='hidden' id='objtype' value=''>  В поле value='' укажите тип объекта, который будет добавлен в базу данных"}},{key:"findDublicate",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.idName,r=void 0;return!!this.dataArray&&((r=this.dataArray.some((function(r){return r[t]==e.lastFilledObject[t]})))&&alert("такая запись уже есть"),r)}},{key:"validate",value:function(){for(var e=0,t=this.currentForm.elements,r=0;r<t.length;r++){var a=t[r].dataset.pattern,i=t[r].dataset.message,n=t[r].dataset.boundId,s=document.querySelector("#"+n),o=t[r].value.search(a);a&&(-1==o?(t[r].className="inputs-invalid",s&&(s.innerHTML=i),e++):t[r].className="inputs-valid")}return!(e>0)}},{key:"overwriteLocalStorage",value:function(e){return this.needAddToLocalStorege?(localStorage.setItem(this.localStorageKey,JSON.stringify(e)),JSON.parse(localStorage.getItem(this.localStorageKey))):(console.warn("Свойство "+this+".needAddToLocalStorege в значении "+this.needAddToLocalStorege+". Не удалось записать в Local Storage"),e)}},{key:"addToDatabase",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.lastFilledObject;return this.dataArray.push(e),this.overwriteLocalStorage(this.dataArray)}},{key:"deleteObject",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.selectedObject;return!!e&&(this.dataArray.splice(this.findObject(e),1),this.overwriteLocalStorage(this.dataArray))}},{key:"editObject",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.selectedObject,t=void 0;return!!e&&(this.fillObject(e[this.idName]),t=Object.assign({},this.lastFilledObject),this.dataArray[this.findObject(e)]=t,this.overwriteLocalStorage(this.dataArray))}},{key:"findObject",value:function(e){var t=this;return this.dataArray.findIndex((function(r){return r[t.idName]==e[t.idName]}))}},{key:"getID",value:function(){var e=this,t=0;return this.dataArray?(this.dataArray.forEach((function(r){parseInt(r[e.idName])>t&&(t=parseInt(r[e.idName]))})),t+1):1}},{key:"getLocalStorageKey",value:function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"-library",t=0;t<this.currentForm.elements.length;t++)if("objtype"==this.currentForm.elements[t].id)return this.currentForm.elements[t].value+e;throw"Метод не смог найти поле с id == 'objtype' и value == '<название вашего объекта>'. Убедитесь что оно есть "}},{key:"checkForm",value:function(){for(var e=void 0,t=void 0,r=void 0,a=0;a<this.currentForm.elements.length;a++)if(e=this.currentForm.elements[a].dataset.localStorageKeyBind,t=this.currentForm.elements[a].dataset.objectPropertyBind,r=JSON.parse(window.localStorage.getItem(e)),e&&t)this.fillInput(this.currentForm.elements[a],r);else{if(e)throw"Нет привязки к свойству объекта. Укажите в HTML элементе атрибут <objectPropertyBind> со значением свойства объекта, которое необходимо выводить.";if(t)throw"Нет привязки к Массиву объектов в LocalStorage. Укажите атрибут <localStorageKeyBind> со значением ключа, из которого необходимо получить данные для привязки."}}},{key:"fillInput",value:function(e,t){var r=e.dataset.objectPropertyBind,a=e.tagName.toLowerCase();if(!t)return!1;switch(a){case"select":for(var i=0;i<t.length;i++){var n=document.createElement("option");n.value=t[i][r],n.innerHTML=t[i][r],e.appendChild(n)}return e}}},{key:"fillForm",value:function(e){for(var t=0;t<this.currentForm.elements.length;t++)if("hidden"!=this.currentForm.elements[t].type&&"button"!=this.currentForm.elements[t].localName)for(var r in e)r==this.currentForm.elements[t].id&&(this.currentForm.elements[t].value=e[r])}}]),e}()},,function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.Book=function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.Genre=function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.Author=function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}},,,,function(e,t){}]]);
//# sourceMappingURL=commonChunk.js.map