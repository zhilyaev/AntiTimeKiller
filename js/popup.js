function AddRow(id,col1,col2) {
    var table = document.getElementById(id);
    var row = table.insertRow(-1);

    var lsg = JSON.parse(localStorage["GoodList"]);
    var lsb = JSON.parse(localStorage["BadList"]);

    for (var i=0;i<lsg.length;i++){
        if(col1==lsg[i]){
            row.classList.add("success");
            break;
        }
    }

    for (var i=0;i<lsb.length;i++){
        if(col1==lsb[i]){
            row.classList.add("danger");
            break;
        }
    }

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = col1;
    cell2.innerHTML = "<b class='badge'>"+col2+"</b>";
}

$("#UpTime").html(localStorage["UpTime"]);

for (var key in localStorage){
    if(key!=="UpTime" && key!=="GoodList" && key!=="BadList"){
        //# AddRow("Anal","www.vk.com","8000");
        AddRow("Anal",key,localStorage[key]);
    }
}
