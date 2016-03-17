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

        // Лечение undefind
        if (!localStorage[lsg[i]]) time = 0;
        else time = localStorage[lsg[i]];

        AddRow(id,lsg[i],time);
    }
}

/* Smoke main every run */
$(document).ready(function(){
    BuildList("BadList");
    BuildList("GoodList");
});