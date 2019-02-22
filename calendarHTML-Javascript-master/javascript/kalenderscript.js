var today = new Date();
var currentMonth = today.getMonth();
var currentYear = today.getFullYear();
var helekalender = document.getElementById("helekalender")

var week = ["Man", "Tir", "Ons", "Tor", "Fre"]; //Viser hvilket ugedag dagen tilhørere i kalenderen
var months = ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"]; //Viser hvilket måned man er på i kalenderen

showCalendar(currentMonth, currentYear); //kalder på funktionen showCalender


//skift til næste måned
function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear; //beregner ud fra hvilket årstal det er med udgangspunkt i hvilket måned det er.
    currentMonth = (currentMonth + 1) % 12; //beregner hvad den nye måned skal være.
    showCalendar(currentMonth, currentYear);
}


//skift til forige måned
function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear; //beregner ud fra hvilket årstal det er med udgangspunkt i hvilket måned det er.
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1; //beregner hvad den nye måned skal være.
    showCalendar(currentMonth, currentYear);
}


//Funktion der viser hele kalenderen fra nuværende måned (kan skifte måned med next eller previous funktionerne).
function showCalendar(month, year) {
    
    var firstDay = (new Date(year, month)).getDay()-1;  //gør at første dag på ugen er en mandag i stedet for søndag
    var daysInMonth = 32 - new Date(year, month, 32).getDate();

    /*var monthname = document.createElement("h3");
    monthname.className = "månedsheader";
    document.getElementsByClassName("måned")[i].appendChild(monthname);*/


    var tbl = document.getElementById("kalender-body"); // Selve kalender delen

    tbl.innerHTML = "";                                 // fjerner celler, bruges når man trykker på previous/next
        
    monthAndYear.innerHTML = months[month] + " " + year;// filing data about month and in the page via DOM.

    var date = 1; // Bruges til at referere datoer

    /*
    for (var y = 0; y < 12; y++){ //skaber 12 diver med klassenavnet "måned" inden diven med ID'en helekalender
        var monthDiv = document.createElement('div');
        monthDiv.className = "måned";

        document.getElementById('helekalender').appendChild(monthDiv);
    }
    */
   
    // skaber alle rækker
    for (var i = 0; i < 6; i++) {

        // skaber en række til at kunne smide data fra ugedags arrayet ind
        if (i == 0) {
            var ugerow = document.createElement("tr");
            ugerow.className = "ugedagsliste";
            document.getElementById("kalender-body").appendChild(ugerow); // Sætter rækkerne ind i kalender-body
        }


       // Oprætter de rækker som skal bruges i kalenderen -------------------------------------------------------------------------------------------------------<
       for (var d = 0; d < 6; d++) {

            var ugenavn = week[d]; //var ugenavn = arrayet hvor navnene på ugedagene står

            // Opretter celler i ugerow rækken, hvor der indsættes data fra ugedag arrayet  
            if (i == 0 && d != 5) {
                var cell = document.createElement("td");                
                var cellText = document.createTextNode(ugenavn);
                cell.className = "ugedag";  // giver ugedagene klassen 'ugedag'
                cell.appendChild(cellText);
                ugerow.appendChild(cell);
            }

            // Opretter en række som vi kan bruge til at aflæse efter tomme dage
            else if (i == 0 && d == 5) {
                var row = document.createElement("tr");
                row.className = "liste"; // første række efter ugedagene får klassen liste
            }

            // Opretter rækker hvor resterende kalenderdata kan sættes ind
            else {
                var row = document.createElement("tr");
                row.className = "linje"; //Resten af rækkerne giver vi klassen linje
                break;
            }
        }
        var tom = 0;  // Bruges til at tælle tomme dage


        // Skaber de individuelle celler og fylder dem med data -----------------------------------------------------------------------------------------------<
        for (var j = 0; j < 7; j++) {

            // Opretter celler som enten rykker til andre dage eller fjerner dage hvor der ikke er data
            if (i === 0 && j < firstDay) {
                var cell = document.createElement("td");                
                var cellText = document.createTextNode("");
                cell.className = "tomdag"; //vi laver en celle som kaldes for tomdag for at gøre det nemmere at fjerne dem i css
                cell.appendChild(cellText);
                row.appendChild(cell);
                tom++; // Bruges til at tælle hvor mange celler der ikke har data
            }

            // Sletter en række hvis der er 5 tomme dage i træk
            else if (tom == 5) {
                row.id = "tomx5"; //hvis 'tom' bliver talt op til 5 kalder vi den række for tomx5 så det bliver nemmere at fjerne i css
                tom++; //sørger for at der ikke gås ind i statementen igen
            }

            // Gør at lørdag og søndag ikke tæller med
            else if (j == 5 || j == 6) {
                date++; //tæller en dag op
            }

            // Bryder ud af loopet hvis dage overstiger hvad der er på en måned
            else if (date > daysInMonth) {
                break;
            }

            // Opretter de resterende celler og indsætter numre i forhold til dato i kalenderen
            else {
                var cell = document.createElement("td");
                var cellBox = document.createElement("div"); // Bruges til at kunne flytte data fra en box til en anden 
                var cellText = document.createTextNode(date);
                cell.className = "dag"; // Giver cellerne klassen dag
                cellBox.className = "dagbox"; // Giver boxene klassen dagbox
                row.appendChild(cellBox);
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++; //tæller en dag op
            }
        }
        tbl.appendChild(row); // smider vær reække ind i kalenderen
    }
}


function show3(month, year) {
    showCalendar();
}