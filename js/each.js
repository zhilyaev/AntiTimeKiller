/* Определение функций */
function in_array(needle, haystack, argStrict) {

    var key = '',
        strict = !! argStrict;

    if (strict) {
        for (key in haystack) {
            if (haystack[key] === needle) {
                return true;
            }
        }
    } else {
        for (key in haystack) {
            if (haystack[key] == needle) {
                return true;
            }
        }
    }

    return false;
}
function formatDate(date) {

    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    var yy = date.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;

    return dd + '.' + mm + '.' + yy;
}
function onBlur() { // окно теряет фокус
    chrome.runtime.sendMessage({method: "onBlur",site:sait,time:localStorage[sait]}); // отправка сообщения на background.js
    //localStorage[sait] = 0; //Блочим здесь и через год офигеваем от Кеша Хрома
}


var sait=window.location.hostname.replace('www.','');

var useful;
chrome.runtime.sendMessage({method: "wlist"}, function(response) {
        var lsg = JSON.parse(response.goodlist);
        var lsb = JSON.parse(response.badlist);
        if(in_array(sait,lsg)){
            useful = 1;
        }else if(in_array(sait,lsb)){
            useful = -1;
        }
        else useful = 0;
});
/* Начальные значения */
if(!localStorage[sait] || isNaN(localStorage[sait])){
    localStorage[sait]=0;
}
// Начинается новый день и машины туда сюда
if(localStorage['today']!==formatDate(new Date())){
    localStorage['today'] = formatDate(new Date());
    localStorage['session_time'] = 0;
}

window.onblur = onBlur; // если окно теряет фокус

/* Smoke main every sec */
setInterval(function(){
    if(document.webkitVisibilityState == 'visible')//если страница активна
    {

        localStorage[sait]++;
        localStorage['session_time']++;
        // Дать пользователю 30 сек, чтобы определить нужен ли ему этот сайт?
        if(localStorage[sait]==30 && useful==0){
            if(confirm(chrome.i18n.getMessage("grade"))){
                chrome.runtime.sendMessage({method: "addGood",site:sait,grade:true});
            }
        }

        // Если сидим на одном сайте в течении 20 минут
        if(useful==-1 && localStorage['session_time']==1800){
            alert(chrome.i18n.getMessage("go_deal"));
        }

        // Если мы сидим за день 2 часа
        if(useful==-1 && localStorage['session_time']==7200){
            document.write("<h1>"+chrome.i18n.getMessage("quota")+"</h1>");
        }
    }
}, 1000);