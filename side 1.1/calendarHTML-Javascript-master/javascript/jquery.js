$("#kalender-body").on("click", "th", function() {
    // ...
    var thClass = ($(this).attr("class").split(' ').pop());

    $('#myModal5').css('display', 'block');
    $('#loDateStart').val(thClass);
});

$("#kalender-body").on("click", "td", function() {
// ...
    
    var clicked = $(this).text(); //td tekst du har klikket på (fx: 10: event med ID 10)
    var sClicked = clicked.split(" "); //td tekst du har klikket på, splittet på " ", da alle placerede events har et mellemrum, -
                                       // - dette er for tjekke om der er mere end ét mellemrum (er der mere end et mellemrum betyder det at der er flere events på en dag)

    for (i = 0; i < jObjA.length; i++) { //efter du har klikket kører dette loop som itererer igennem hvert object i jObjA
        if (sClicked.length == 2) { //hvis længden på sClicked er 2 (et event har kun et enkelt mellemrum hvis der kun er et enkelt event)
            if (clicked == eventID[i]) { //hvis teksten du har trykket på er det samme som det eventID som loopet er nået til
                console.log(jObjA[i]); //viser event på konsol ud fra det nummer i loopet du er nået til 
            } //fx du trykker på "10 ", "10 " bliver splittet i to ("10" & " "), hvis "10" er det samme som det eventID loopet er itereret til, så skal det event vises
        }
        else if (sClicked.length > 2) { //hvis længden på sClicked er over 2 (et event som har mere end et mellemrum har flere events på en dag)
            for (x = 0; x < sClicked.length; x++) { //itererer igennem sClicked ud fra dens længde 
                if (sClicked[x] == eventID[i]) { //hvis det element i sClicked du er nået til er det samme som det eventID du er nået til i det tidligere loop
                    console.log(jObjA[i]); //viser event på konsol ud fra det nummer i loopet du er nået til 
                } //fx hvis du trykker på "10 15 ", "10 15 " bliver splittet på " " ("10", " ", "15", " "), -                
            } // - itererer igennem sClicked, hvis det element som du er nået til er det samme som det eventID loopet er itereret til, så skal det event vises -
        } // - (mellemrum bliver aldrig det samme som et eventID, derfor sker der ikke noget når loopet når til et mellemrum
    } //skulle du være i tvivl, så ja, jeg har ingen idé om hvordan jquery fungerer    
});


