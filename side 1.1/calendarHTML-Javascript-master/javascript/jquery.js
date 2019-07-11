$("#kalender-body").on("click", "th", function() {
    // ...
    var thClass = ($(this).attr("class").split(' ').pop());

    $('#myModal5').css('display', 'block');
    $('#loDateStart').val(thClass);
});
/*
$("#kalender-body").on("click", "td", function() {
// ...
    var tdID = ($(this).attr("id").split(' ').pop());
    var tdIDeventID = document.getElementById(tdID).firstElementChild.firstElementChild.firstElementChild.className;
    var IDSplit = tdIDeventID.split("eventID")    
    console.log(IDSplit[1]);
    console.log();   
    
});
*/