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
function AddRow(id,col1,col2) {
    var table = document.getElementById(id);
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    cell1.innerHTML = "<a target='_blank' href='http://"+col1+"'>"+col1+"</a>";
    cell2.innerHTML = "<span class='badge'>"+col2+"</span>";
    cell3.innerHTML = "<button class='btn btn-default deleter' value='"+col1+"' title='"+chrome.i18n.getMessage("delete_title")+"'>" +
        "<b class='glyphicon glyphicon-trash'></b></button>"
}


var getDomain = function(href) {
    var l = document.createElement("a");
    l.href = href;
    return l.hostname.replace('www.','');
};


function BuildList(id){
    var lsg = JSON.parse(localStorage[id]);
    for (var i=0;i<lsg.length;i++){

        // Лечение undefined
        if (!localStorage[lsg[i]] || localStorage[lsg[i]]=="undefined") time = 0;
        else time = localStorage[lsg[i]];

        AddRow(id,lsg[i],time);
    }
}

function addList(list){
    var url = $("#"+list).val();
    var ls = JSON.parse(localStorage[list+"List"]);

    if (!/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/.test(url)){
        var domain = getDomain(url);
        if(!in_array(domain,ls)){
            ls.push(domain);
            localStorage[list+"List"] = JSON.stringify(ls);
            location.reload();
        }
    }else{
        ls.push(url);
        localStorage[list+"List"] = JSON.stringify(ls);
        location.reload();
    }


}

$("#subBad").click(function(){
        addList("Bad")
});

$("#subGood").click(function(){
    addList("Good");
});

$("#DeleteLocal").click(function(){
    if(confirm(chrome.i18n.getMessage("localstorage_alert"))){
        localStorage.clear();
    }
});

$("#DeleteUpTime").click(function(){
    localStorage['UpTime'] = 0;
});

/* Smoke main every run */
$(document).ready(function(){
    BuildList("BadList");
    BuildList("GoodList");

    $("tr").find(".deleter").click(function(){
        var table= this.parentNode.parentNode.parentNode.parentNode;
        var id = table.id;

        var site = this.value;
        var ls = JSON.parse(localStorage[id]);

        ls.splice(ls.indexOf(site), 1);
        localStorage[id] = JSON.stringify(ls);
        location.reload();

    });
});