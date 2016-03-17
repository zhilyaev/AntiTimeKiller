chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        localStorage[request.site] = request.time;
    });

if(!localStorage["UpTime"]) localStorage["UpTime"] = 0;
if(!localStorage["BadList"]) localStorage["BadList"] = JSON.stringify(["vk.com","youtube.com"]);
if(!localStorage["GoodList"])  localStorage["GoodList"] = JSON.stringify(["habrahabr.ru", "bootstrap-3.ru"]);

setInterval(function(){
    localStorage["UpTime"]++;
},1000)