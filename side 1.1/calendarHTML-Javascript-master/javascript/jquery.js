$("#kalender-body").on("click", "th", function() {
    // ...
    var thClass = ($(this).attr("class").split(' ').pop());
    alert(thClass);
    console.log(thClass);
    });

$("#kalender-body").on("click", "td", function() {
// ...
    var tdClass = ($(this).attr("class").split(' ').pop());
    alert(tdClass);
    console.log(tdClass);
});