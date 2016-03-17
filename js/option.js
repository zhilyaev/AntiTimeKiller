function AddRow(id,col1,col2) {
    var table = document.getElementById(id);
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = col1;
    cell2.innerHTML = col2;
}


function BuildList(id){
    var lsg = JSON.parse(localStorage[id]);
    for (var i=0;i<lsg.length;i++){

        // Лечение undefined
        if (!localStorage[lsg[i]] || localStorage[lsg[i]]=="undefined") time = 0;
        else time = localStorage[lsg[i]];

        AddRow(id,lsg[i],time);
    }
}

$("#subBad").click(function(){
        var h = $("#Bad");
        var lsb = JSON.parse(localStorage["BadList"]);
        lsb.push(h.val());
        localStorage["BadList"] = JSON.stringify(lsb);
});

$("#subGood").click(function(){
    var h = $("#Good");
    var lsb = JSON.parse(localStorage["GoodList"]);
    lsb.push(h.val());
    localStorage["GoodList"] = JSON.stringify(lsb);
});

$("#DeleteLocal").click(function(){
    if(confirm("После этого действия придется переустанавливать расширение"))
        localStorage.clear();
});

/* Smoke main every run */
$(document).ready(function(){
    BuildList("BadList");
    BuildList("GoodList");
});