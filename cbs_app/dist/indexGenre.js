!function(e){function t(t){for(var r,l,i=t[0],c=t[1],u=t[2],f=0,s=[];f<i.length;f++)l=i[f],Object.prototype.hasOwnProperty.call(a,l)&&a[l]&&s.push(a[l][0]),a[l]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);for(d&&d(t);s.length;)s.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,i=1;i<n.length;i++){var c=n[i];0!==a[c]&&(r=!1)}r&&(o.splice(t--,1),e=l(l.s=n[0]))}return e}var r={},a={3:0},o=[];function l(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.m=e,l.c=r,l.d=function(e,t,n){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},l.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)l.d(n,r,function(t){return e[t]}.bind(null,r));return n},l.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="dist/";var i=window.webpackJsonp=window.webpackJsonp||[],c=i.push.bind(i);i.push=t,i=i.slice();for(var u=0;u<i.length;u++)t(i[u]);var d=c;o.push([7,0]),n()}({7:function(e,t,n){"use strict";var r=n(0),a=n(1),o=n(2);n(9),n(14),window.addEventListener("load",(function(){var e=new o.Form(document.forms[0],"id"),t=new a.Table("#table-genres",e);e.checkForm(),t.addObservers(t,e),t.fillTable(),(0,r.$)("#add").addEventListener("click",(function(){var n=e.addButtonHandler();if(0==n)return!1;t.addRows(n),t.notify()})),(0,r.$)("#edit").addEventListener("click",(function(){var n=e.editObject();n?(t.cleanTable(),t.tableData=n,t.notify(),t.fillTable()):alert("Какую строку вы хотите изменить? Пожалуйста выберите строку.")})),(0,r.$)("#delete").addEventListener("click",(function(){var n=e.deleteObject();n?(t.cleanTable(),t.tableData=n,t.notify(),t.fillTable()):alert("Нечего удалять. Выберите пожалуйста строку.")})),(0,r.$)("#cleanInputs").addEventListener("click",(function(){e.cleanInputs()})),(0,r.$)("#input-search").addEventListener("keyup",(function(e){t.cleanTable(),t.tableData=t.search(e.target,e.target.dataset.searchObjectProperty),t.notify(),t.fillTable()})),t.tableClickHandler()}))}});
//# sourceMappingURL=indexGenre.js.map