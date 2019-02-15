var modalBtns = [...document.querySelectorAll(".button")];
modalBtns.forEach(function(btn)
{
    btn.onclick = function() 
    {
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
closeBtns.forEach(function(btn)
{
    btn.onclick = function() 
    {
        var modal = btn.closest('.modal');
        modal.style.display = "none";
    }
});

window.onclick = function(event) 
{
    if (event.target.className === "modal") 
        {
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
  