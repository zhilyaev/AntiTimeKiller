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

var addLinkGood = function(e) {
    var lsb = JSON.parse(localStorage["GoodList"]);
    var site = getDomain(e.linkUrl);
    if(!in_array(site,lsb)){
        lsb.push(site);
    }

    localStorage["GoodList"] = JSON.stringify(lsb);
};

var addLinkBad= function(e) {
    var lsb = JSON.parse(localStorage["BadList"]);
    var site = getDomain(e.linkUrl);
    if(!in_array(site,lsb)){
        lsb.push(site);
    }
    localStorage["BadList"] = JSON.stringify(lsb);
};
chrome.contextMenus.create({
    "title": "+ в ЗЕЛЕННЫЙ список",
    "contexts": ["link"],
    "onclick" : addLinkGood
});

chrome.contextMenus.create({
    "title": "+ в КРАСНЫЙ список",
    "contexts": ["link"],
    "onclick" : addLinkBad
});