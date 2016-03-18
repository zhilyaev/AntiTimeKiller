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
            good+=parseInt(localStorage[col1]);
            break;
        }
    }

    for (var i=0;i<lsb.length;i++){
        if(col1==lsb[i]){
            row.classList.add("danger");
            bad+=parseInt(localStorage[col1]);
            break;
        }
    }

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = "<a target='_blank' href='http://"+col1+"'>"+col1+"</a>";
    cell2.innerHTML = "<b class='badge'>"+col2+"</b>";
}

$("#UpTime").html(localStorage["UpTime"]);

$(document).ready( function(){

    setInterval(function(){
        $("#UpTime").html(localStorage["UpTime"]);
    },1000);

    for (var key in localStorage){
        // Зарезеривированные
        if(key!=="UpTime" && key!=="GoodList" && key!=="BadList"){
            //# AddRow("Anal","www.vk.com","8000");
            AddRow("Anal",key,localStorage[key]);
        }
    }


    // Прогресс Бар
    var all = good+bad;
    var pb =(bad/all).toFixed(2)*100;
    var pg = (good/all).toFixed(2)*100;
    $("#status-good").html(good).css({'width': pg+"%"});
    $("#status-bad").html(bad).css({'width':  pb+"%"});
});



