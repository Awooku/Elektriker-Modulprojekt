$("#kalender-body").on("click", "th", function() {
    // ...
    var thClass = ($(this).attr("class").split(' ').pop());

    $('#myModal5').css('display', 'block');
    $('#loDateStart').val(thClass);
});

$("#kalender-body").on("click", "td", function() {
// ...
    
    var clicked = $(this).text();
    var bclicked = clicked.split(" ");

    if (bclicked.length == 1 ) {
        console.log(jObjA[bclicked[0]]);   
    }
    else if (bclicked.length >= 2 ) {

        for (i = 0; i < bclicked.length; i++) {
            if (jObjA[bclicked[i]] != undefined) {
                console.log(jObjA[bclicked[i]])
            }

        }
    }
});


