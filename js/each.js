/* Определение функций */
function onBlur() { // окно теряет фокус
    chrome.runtime.sendMessage({site:sait,time:localStorage[sait]}); // отправка сообщения на background.js
    //localStorage[sait] = 0; //Блочим здесь и через год офигеваем от Кеша Хрома
}


/* Начальные значения */
// Баг с www/http/https
var sait=window.location.hostname.replace('www.','');
if(!localStorage[sait]){
    localStorage[sait]=0;
    if(confirm("Это Полезный сайт?")){
        chrome.runtime.sendMessage({site:sait,time:0,grade:true});
    }
}

window.onblur = onBlur; // если окно теряет фокус

/* Smoke main every sec */
setInterval(function(){
    if(document.webkitVisibilityState == 'visible')//если страница активна
    {
        localStorage[sait]++;
    }
}, 1000);