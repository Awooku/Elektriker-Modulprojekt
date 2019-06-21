$("#kalender-body").on("click", "th", function() {
    // ...
    var thClass = ($(this).attr("class").split(' ').pop());

    $('#myModal5').css('display', 'block');
    $('#loDateStart').val(thClass);
});

$("#kalender-body").on("click", "td", function() {
// ...
    var tdID = ($(this).attr("id").split(' ').pop());
    console.log(tdID);
});