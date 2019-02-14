document.createElement('main');  /* opretter main element til tidligere versioner af IE */


var maincontent = document.getElementById('letsgo');
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

/* https://stackoverflow.com/questions/13152927/how-to-use-radio-on-change-event/25204627 */

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
});





    function set_mouseover(id) {
        jQuery('#opreteventinp').val(id);
    }
    function set_mouseout(id) {
        jQuery('#opreteventinp').val(id);
    }
    /*function set_mouseover2(id) {
        jQuery('#elevhåndteringinp').val(id);
    }
    function set_mouseout2(id) {
        jQuery('#elevhåndteringinp').val(id);
    }*/
    function set_mouseover3(id) {
        jQuery('#oversigtinp').val(id);
    }
    function set_mouseout3(id) {
        jQuery('#oversigtinp').val(id);
    }


var modalBtns = [...document.querySelectorAll(".button")];
modalBtns.forEach(function(btn){
btn.onclick = function() {
var modal = btn.getAttribute('data-modal');
document.getElementById(modal).style.display = "block";
}
});

var modalBtns = [...document.querySelectorAll(".opret")];
modalBtns.forEach(function(btn)
{
    btn.onclick = function() 
    {
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

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
function myFunction1() {
    document.getElementById("myDropdown1").classList.toggle("show");
  }
function myFunction2() {
    document.getElementById("myDropdown2").classList.toggle("show");
  }