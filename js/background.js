chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        localStorage[request.site] = request.time;
    });

if(!localStorage["UpTime"]) localStorage["UpTime"] = 0;

setInterval(function(){
    localStorage["UpTime"]++;
},1000)