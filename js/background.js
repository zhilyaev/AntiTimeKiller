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

function wlist(sait){
    var lsg = JSON.parse(localStorage["GoodList"]);
    var lsb = JSON.parse(localStorage["BadList"]);
    if(!in_array(site,lsg)){
        return 1;
    }else if(!in_array(site,lsb)){
        return -1;
    }
    else return 0;
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
            sendResponse({data: wlist(request.domain)});

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