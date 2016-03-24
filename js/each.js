/* Определение функций */
function onBlur() { // окно теряет фокус
    chrome.runtime.sendMessage({site:sait,time:localStorage[sait]}); // отправка сообщения на background.js
    //localStorage[sait] = 0; //Блочим здесь и через год офигеваем от Кеша Хрома
}


/* Начальные значения */
var sait=window.location.hostname.replace('www.','');
if(!localStorage[sait] || isNaN(localStorage[sait])){
    localStorage[sait]=0;
}

window.onblur = onBlur; // если окно теряет фокус

/* Smoke main every sec */
setInterval(function(){
    if(document.webkitVisibilityState == 'visible')//если страница активна
    {
        localStorage[sait]++;

        // Дать пользователю 30 сек, чтобы определить нужен ли ему этот сайт?
        if(localStorage[sait]==30){
            if(confirm("Считаете ли вы, что на этом сайте вы проводите время с пользой?")){
                chrome.runtime.sendMessage({site:sait,time:localStorage[sait],grade:true});
            }
        }
    }
}, 1000);