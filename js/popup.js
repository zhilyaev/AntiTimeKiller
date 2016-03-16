function AddRow(id,col1,col2) {
    var table = document.getElementById(id);
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = col1;
    cell2.innerHTML = col2;
}
//# AddRow("Anal","www.vk.com","8000");
$("#UpTime").html("Aптайм = "+localStorage["UpTime"]+" сек");

for (var key in localStorage){
    if(key!=="UpTime"){
        AddRow("Anal",key,localStorage[key]);
    }
}
