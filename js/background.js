chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        localStorage[request.site] = request.time;

        // Если мы были первй раз на сайте
        if(request.grade){
            var lsg = JSON.parse(localStorage["GoodList"]);
            lsg.push(request.site);
            localStorage["GoodList"] = JSON.stringify(lsg);
        }
    });

if(!localStorage["UpTime"]) localStorage["UpTime"] = 0;
if(!localStorage["BadList"]) localStorage["BadList"] = JSON.stringify([
    "vk.com",
    "youtube.com",
    "twitter.com",
    "xvideos.com",
    "facebook.com",
    "instagram.com",
    "pikabu.ru",
    "ok.ru",
    "2ch.hk"
]);

if(!localStorage["GoodList"])  localStorage["GoodList"] = JSON.stringify([
    "habrahabr.ru",
    "ru.wikipedia.org",
    "javarush.ru",
    "github.com"
]);

setInterval(function(){
    localStorage["UpTime"]++;
},1000)