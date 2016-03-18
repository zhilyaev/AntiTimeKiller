// Библиотека
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
var getDomain = function(href) {
    var l = document.createElement("a");
    l.href = href;
    return l.hostname.replace('www.','');
};

/* Добавить домен в localstorage */
function addDomain(site, list){
    var lsb = JSON.parse(localStorage[list]);
    var domain = getDomain(site);
    if(!in_array(domain,lsb)){
        lsb.push(domain);
        localStorage[list] = JSON.stringify(lsb);
    }

}

/* <Event for link> */
var addLinkGood = function(e) {
    addDomain(e.linkUrl,"GoodList");
};

var addLinkBad= function(e) {
    addDomain(e.linkUrl,"BadList");
};

chrome.contextMenus.create({
    "title": "+ в ЗЕЛЕНЫЙ список",
    "contexts": ["link"],
    "onclick" : addLinkGood
});

chrome.contextMenus.create({
    "title": "+ в КРАСНЫЙ список",
    "contexts": ["link"],
    "onclick" : addLinkBad
});
/* </Event for link> */

function addGoodList(e){
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        var url = tabs[0].url;
        addDomain(url,"GoodList");
    });
}

function addBadList(e){
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        var url = tabs[0].url;
        addDomain(url,"BadList");
    });
}

chrome.contextMenus.create({
    "title": "+ Текущий сайт в ЗЕЛЕНЫЙ",
    "contexts": ["page"],
    "onclick" : addGoodList
});

chrome.contextMenus.create({
    "title": "+ Текущий сайт в КРАСНЫЙ",
    "contexts": ["page"],
    "onclick" : addBadList
});