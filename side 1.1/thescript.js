document.createElement('main');  /* opretter main element til tidligere versioner af IE */

var maincontent = document.getElementById('myModal');/*
var today = document.querySelector("#today");
var nextyear = document.querySelector("#nextyear");

today.valueAsDate;
nextyear.valueAsDate

var currentdate = new Date();
var currentyear = currentdate.getFullYear();
var currentmonth = currentdate.getMonth();
var currentday = currentdate.getDate();

var years = new Date(currentyear + 3, currentmonth, currentday +1);
var year = new Date(currentyear + 1, currentmonth, currentday +1);
var quarter = new Date(currentyear, currentmonth +3, currentday +1);
var month = new Date(currentyear, currentmonth +1, currentday +1);

document.querySelector("#today").valueAsDate = currentdate;
document.querySelector("#nextyear").valueAsDate = year;

maincontent.innerHTML = maincontent.id + ": " + quarter;

https://stackoverflow.com/questions/13152927/how-to-use-radio-on-change-event/25204627

$(document).ready(function () {
    
    $('#years').click(function () {
        if ($(this).is(':checked')) {
            document.querySelector("#nextyear").valueAsDate = years;
        }
    });

    $('#year').click(function () {
        if ($(this).is(':checked')) {
            document.querySelector("#nextyear").valueAsDate = year;
        }
    });

    $('#quarter').click(function () {
        if ($(this).is(':checked')) {
            document.querySelector("#nextyear").valueAsDate = quarter;
        }
    });

    $('#month').click(function () {
        if ($(this).is(':checked')) {
            document.querySelector("#nextyear").valueAsDate = month;
        }
    });
});*/

/*
function set_mouseover1(id) {   //18 linjer
    jQuery('#opreteventinp').val(id);
}
function set_mouseout1(id) {
    jQuery('#opreteventinp').val(id);
}
function set_mouseover2(id) {
    jQuery('#elevhåndteringinp').val(id);
}
function set_mouseout2(id) {
    jQuery('#elevhåndteringinp').val(id);
}
function set_mouseover3(id) {
    jQuery('#oversigtinp').val(id);
}
function set_mouseout3(id) {
    jQuery('#oversigtinp').val(id);
}
*/

/*
function replaceArrow(el) { //erstatter de 6 funktioner ovenover med en enkelt funktion som kan gøre det samme som alle funktionerne ovenover kan, uden at gentage kode, på mindre plads. 14 linjer
    var valueofdrop = el.getAttribute('value');                 //finder det elements value som man har trykket på
    var n = valueofdrop.includes("▽");                          //finder ud af om den value man lige har fået inkluderer ▽
    if (n == true) {                                            //hvis n inkluderer ▽ 
        var newvalueofdrop = valueofdrop.replace(/▽/g, "▼");    //erstatter ▽ med ▼
        var s = document.getElementById(el.id);                 //finder ID på det element man har trykket på
        s.value = newvalueofdrop;                               //erstatter den gamle value (▽) med den nye value (▼)
    }
    else {                                                      //hvis n ikke inkluderer ▽
        var newvalueofdrop = valueofdrop.replace(/▼/g, "▽");    //erstatter  ▼ med ▽
        var s = document.getElementById(el.id);                 //finder ID på det element man har trykket på
        s.value = newvalueofdrop;                               //erstatter den gamle value (▼) med den nye value (▽)
    }
}
*/

function replaceArrow(el) { //gør den kode ovenover grimmere men kortere. 6 linjer                   
    if (el.getAttribute('value').includes("▽") == true) { //hvis det elements value man har trykket på inkluderer ▽
        document.getElementById(el.id).value = el.getAttribute('value').replace(/▽/g, "▼"); }//erstat ▽ med ▼    
    else { //hvis det elements value man har trykket på ikke inkluderer ▽
        document.getElementById(el.id).value = el.getAttribute('value').replace(/▼/g, "▽"); }//erstat ▼ med ▽               
}

var modalBtns = [...document.querySelectorAll(".button")];
modalBtns.forEach(function(btn){
btn.onclick = function() {
var modal = btn.getAttribute('data-modal');
document.getElementById(modal).style.display = "block";
}
});

var closeBtns = [...document.querySelectorAll(".close")];
closeBtns.forEach(function(btn){
btn.onclick = function() {
var modal = btn.closest('.modal');
modal.style.display = "none";
}
});

window.onclick = function(event) {
  if (event.target.className === "modal") {
    event.target.style.display = "none";
  }
}

var modalBtns = [...document.querySelectorAll(".opret")];
modalBtns.forEach(function(btn)
{
    btn.onclick = function() 
    {
        var modal = btn.getAttribute('data-modal');
        document.getElementById(modal).style.display = "block";
    }
});

/*
function myFunction1() {
    document.getElementById("myDropdown1").classList.toggle("show"); //ønsker dropdown hos elevvisning
}
function myFunction2() {
    document.getElementById("myDropdown2").classList.toggle("show"); //tilmeldte dropdown hos elevvisning
}
function myFunction3() {
    document.getElementById("myDropdown3").classList.toggle("show"); //gennemført dropdown hos elevvisning
}
*/

function showDropdown(ele) { //gør det samme som ovenover men i en enkelt funktion (viser en dropdown)
    if (document.getElementById(ele.id).nextElementSibling.getAttribute("style") == "display: none;") { //hvis det trykkede elements søskende element har style="display: none;"
    document.getElementById(ele.id).nextElementSibling.style = document.getElementById(ele.id).nextElementSibling.getAttribute("style").replace(/none/g, "block"); } //erstat none med block
    else { //hvis det trykkede elements søskende element ikke har style="display: none;"
    document.getElementById(ele.id).nextElementSibling.style = document.getElementById(ele.id).nextElementSibling.getAttribute("style").replace(/block/g, "none"); } //erstat block med none
}
