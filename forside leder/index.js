/*var modal = document.getElementById('myModal');

var btn = document.getElementById("opret");

var span = document.getElementsByClassName("close")[0];



btn.onclick = function() {
    modal.style.display = "block";
}
span.onclick = function() {
    modal.style.display = "none";
}

var modal1 = document.getElementById('myModal1');

var ret = document.getElementById("ret");

var span1 = document.getElementsByClassName("close")[1];

ret.onclick = function() {
    modal1.style.display = "block";
}
span1.onclick = function() {
    modal1.style.display = "none";
}

var modal2 = document.getElementById('myModal2');

var slet = document.getElementById("slet");

var span2 = document.getElementsByClassName("close")[2];

slet.onclick = function() {
    modal2.style.display = "block";
}
span2.onclick = function() {
    modal2.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) 
    {
        modal.style.display = "none";
    }
    else if (event.target == modal1) 
    {
        modal1.style.display = "none";
    }
    else if (event.target == modal2) 
    {
        modal2.style.display = "none";
    }
}*/

var modalBtns = [...document.querySelectorAll(".button")];
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