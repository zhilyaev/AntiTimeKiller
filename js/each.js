/* Определение функций */
function onBlur() { // окно теряет фокус
    chrome.runtime.sendMessage({site:sait,time:localStorage[sait]}); // отправка сообщения на background.js
    //localStorage[sait] = 0;
}
window.onblur = onBlur; // если окно теряет фокус

/* Начальные значения */
// Баг с www/http/https
var sait=location.hostname; // на каком сайте находится скрипт
if(!localStorage[sait]){
    localStorage[sait]=0;
    if(confirm("Это Полезный сайт?")){
        chrome.runtime.sendMessage({site:sait,grade:true});
    }
}

/* Smoke main every sec */
setInterval(function(){
    if(document.webkitVisibilityState == 'visible')//если страница активна
    {
        localStorage[sait]++; // обновляем данные о сайте в локальном хранилище
    }
}, 1000);// запускать функцию каждую секунду