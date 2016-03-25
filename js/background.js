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

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        // Обычный
        if(request.method=="onBlur"){
            localStorage[request.site] = request.time;
        }
        // Добавить в зеленый
        else if(request.method=="addGood"){
            var lsg = JSON.parse(localStorage["GoodList"]);
            // Если его нет в начальных списках
            if(!in_array(request.site,lsg)){
                lsg.push(request.site);
                localStorage["GoodList"] = JSON.stringify(lsg);
            }
        }
        // Получить из background
        else if(request.method=="wlist")
            sendResponse({goodlist: localStorage["GoodList"], badlist: localStorage["BadList"]});

    });

if(!localStorage["BadList"]) localStorage["BadList"] = JSON.stringify([
    // Здесь могла быть ваша реклама
    "vk.com",
    "youtube.com",
    "twitter.com",
    "xvideos.com",
    "facebook.com",
    "instagram.com",
    "pikabu.ru",
    "ok.ru",
    "2ch.hk",
    "hdrezka.me",
    "kinogo.co"
]);

if(!localStorage["GoodList"])  localStorage["GoodList"] = JSON.stringify([
    // Здесь могла быть ваша реклама
    "habrahabr.ru",
    "ru.wikipedia.org",
    "en.wikipedia.org",
    "github.com"
]);


if(!localStorage["UpTime"]){
    localStorage["UpTime"] = 0;
    window.open("readme.html", "_blank");
}
setInterval(function(){
    localStorage["UpTime"]++;
},1000);