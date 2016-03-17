function AddRow(id,col1,col2) {
    var table = document.getElementById(id);
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    cell1.innerHTML = "<a target='_blank' href='http://"+col1+"'>"+col1+"</a>";
    cell2.innerHTML = "<span class='badge'>"+col2+"</span>";
    cell3.innerHTML = "<button class='btn btn-default deleter' value='"+col1+"' title='Удалить из списка'><b class='glyphicon glyphicon-remove'></b></button>"
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
        lsb.push(h.val().replace('www.',''));
        localStorage["BadList"] = JSON.stringify(lsb);
        location.reload();
});

$("#subGood").click(function(){
    var h = $("#Good");
    var lsb = JSON.parse(localStorage["GoodList"]);
    lsb.push(h.val().replace('www.',''));
    localStorage["GoodList"] = JSON.stringify(lsb);
    location.reload();
});

$("#DeleteLocal").click(function(){
    if(confirm("После этого действия придется переустанавливать расширение, но все равно сохранит твое время!")){
        localStorage.clear();
    }

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