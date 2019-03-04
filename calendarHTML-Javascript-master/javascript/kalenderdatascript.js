var text = '{"startdato":"2019-03-14", "slutdato":"2019-04-30", "skole":"TEC", "modultal":"1.5"}';
var obj = JSON.parse(text);
var startdato = new Date(obj.startdato);
var slutdato = new Date(obj.slutdato);

document.getElementById("demo").innerHTML = startdato + ", " + slutdato;


var antaldage = slutdato - startdato;
var antaldage = (antaldage / (60*60*24*1000));
console.log(antaldage);


function events() {

    var eventrow = document.createElement("div");


}