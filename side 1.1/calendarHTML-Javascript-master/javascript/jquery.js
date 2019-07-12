$("#kalender-body").on("click", "th", function() {
    // ...
    var thClass = ($(this).attr("class").split(' ').pop()); //laver en variabel ud fra det du har trykket på (et th element)

    $('#myModal5').css('display', 'block'); //#myModal5 bliver vist
    $('#loDateStart').val(thClass); //opdaterer datoen i modalen ud fra den dato du har trykket på
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