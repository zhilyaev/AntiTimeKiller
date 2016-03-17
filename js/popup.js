var good = 0;
var bad = 0;

function AddRow(id,col1,col2) {
    var table = document.getElementById(id);
    var row = table.insertRow(-1);

    var lsg = JSON.parse(localStorage["GoodList"]);
    var lsb = JSON.parse(localStorage["BadList"]);

    for (var i=0;i<lsg.length;i++){
        if(col1==lsg[i]){
            row.classList.add("success");
            good+=localStorage[col1];
            break;
        }
    }

    for (var i=0;i<lsb.length;i++){
        if(col1==lsb[i]){
            row.classList.add("danger");
            bad+=localStorage[col1];
            break;
        }
    }

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = col1;
    cell2.innerHTML = "<b class='badge'>"+col2+"</b>";
}

$("#UpTime").html(localStorage["UpTime"]);


$(document).ready( function(){
    for (var key in localStorage){
        if(key!=="UpTime" && key!=="GoodList" && key!=="BadList"){
            //# AddRow("Anal","www.vk.com","8000");
            AddRow("Anal",key,localStorage[key]);
        }
    }


    var all = good+bad;
    $("#status-good").css({'width': parseInt(good/all)+"%"});
    $("#status-bad").css({'width': 100-parseInt(good/all)+"%"});
});

