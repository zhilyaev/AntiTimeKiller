/* Определение функций */
function onBlur() { // окно теряет фокус
    chrome.runtime.sendMessage({method: "onBlur",site:sait,time:localStorage[sait]}); // отправка сообщения на background.js
    //localStorage[sait] = 0; //Блочим здесь и через год офигеваем от Кеша Хрома
    session = 0;
}


var sait=window.location.hostname.replace('www.','');
var useful;
chrome.runtime.sendMessage({method: "wlist", domain: sait}, function(response) {
    useful = response.data;
});
var session = 0;
/* Начальные значения */
if(!localStorage[sait] || isNaN(localStorage[sait])){
    localStorage[sait]=0;
}
// Начинается новый день и машины туда сюда
if(localStorage['today']!==new Date()){
    localStorage['today'] = new Date();
    localStorage['session_time'] = 0;
}

window.onblur = onBlur; // если окно теряет фокус

/* Smoke main every sec */
setInterval(function(){
    if(document.webkitVisibilityState == 'visible')//если страница активна
    {

        localStorage[sait]++;
        session++;
        localStorage['session_time']++;
        // Дать пользователю 30 сек, чтобы определить нужен ли ему этот сайт?
        if(localStorage[sait]==30 && useful==0){
            if(confirm(chrome.i18n.getMessage("grade"))){
                chrome.runtime.sendMessage({method: "addGood",site:sait,grade:true});
            }
        }

        // Если сидим на одном сайте в течении 20 минут
        if(useful==-1 && session>1200){
            alert(chrome.i18n.getMessage("go_deal"));
        }

        // Если мы сидим подряд 30 минут или за день 2 часа
        if(useful==-1 && session>1800 || localStorage['session_time']>7200){
            document.write("<h1>"+chrome.i18n.getMessage("quota")+"</h1>");
        }
    }
}, 1000);