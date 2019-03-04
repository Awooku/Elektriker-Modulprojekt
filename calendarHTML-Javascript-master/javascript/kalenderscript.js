var m = 0, k = 0;
var today = new Date();
var currentMonth = today.getMonth();
var currentYear = today.getFullYear();
var helekalender = document.getElementById("helekalender")

var week = ["man", "tir", "ons", "tor", "fre", "lør", "søn"]; //Viser hvilket ugedag dagen tilhører i kalenderen
var months = ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"]; //Viser hvilket måned man er på i kalenderen

showyear();

//skift til næste måneder
function next() {

    if (m == 3) {
        for (var i = 0; i < 3; i++) {
            currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear; //beregner ud fra hvilket årstal det er med udgangspunkt i hvilket måned det er.
            currentMonth = (currentMonth + 1) % 12; //beregner hvad den nye måned skal være.
        }
        show3();
    }

    else if (m == 12) {
        for (var i = 0; i < 12; i++) {
            currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear; //beregner ud fra hvilket årstal det er med udgangspunkt i hvilket måned det er.
            currentMonth = (currentMonth + 1) % 12; //beregner hvad den nye måned skal være.
        }
        showyear();
    }

    else {
        currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear; //beregner ud fra hvilket årstal det er med udgangspunkt i hvilket måned det er.
        currentMonth = (currentMonth + 1) % 12; //beregner hvad den nye måned skal være.
        onemonth();
    }
}



//skift til forige måneder
function previous() {

    if (m == 3) {
        for (var i = 0; i < 3; i++) {
            currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear; //beregner ud fra hvilket årstal det er med udgangspunkt i hvilket måned det er.
            currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1; //beregner hvad den nye måned skal være.
        }
        show3();
    }

    else if (m == 12) {
        for (var i = 0; i < 12; i++) {
            currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear; //beregner ud fra hvilket årstal det er med udgangspunkt i hvilket måned det er.
            currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1; //beregner hvad den nye måned skal være.
        }
        showyear();
    }

    else {
        currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear; //beregner ud fra hvilket årstal det er med udgangspunkt i hvilket måned det er.
        currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1; //beregner hvad den nye måned skal være.
        onemonth();
    }
}


//Funktion der viser hele kalenderen fra nuværende måned (kan skifte måned med next eller previous funktionerne).
function showCalendar(month, year) {
    k++;
    var firstDay = (new Date(year, month)).getDay() -1;  //gør at første dag på ugen er en mandag i stedet for søndag
    //firstDay = firstDay + 7 - 1;
    var daysInMonth = 32 - new Date(year, month, 32).getDate();

    var tbl = document.getElementById("kalender-body"); // Selve kalender delen

    //tbl.innerHTML = ""; // fjerner celler, bruges når man trykker på previous/next
    var monthDiv = document.createElement("div");
    monthDiv.className = "månedDivC";
    monthDiv.id = "månedDiv" + k;

    //tbl.appendChild(monthDiv);
    if (m == 12) {
        if (k == 1) {
            for (var q = 1; q < 4; q++) {
                var fourMonth = document.createElement("div");
                fourMonth.id = "fm" + q;
                tbl.appendChild(fourMonth);
            }
        }
        if (k == 1 || k == 2 || k == 3 || k == 4) {
            var fourMonth1 = document.getElementById("fm1");
            fourMonth1.appendChild(monthDiv);
        }
        else if (k == 5 || k == 6 || k == 7 || k == 8) {
            var fourMonth2 = document.getElementById("fm2");
            fourMonth2.appendChild(monthDiv);
        }
        else {
            var fourMonth3 = document.getElementById("fm3");
            fourMonth3.appendChild(monthDiv);
        }
    }

    else {
        tbl.appendChild(monthDiv);
    }

    var showMonth = document.createElement("h3");
    showMonth.className = "header";
    showMonth.id = "monthAndYear" + k;
    document.getElementById("månedDiv" + k).appendChild(showMonth); // Sætter rækkerne ind i kalender-body

    document.getElementById("monthAndYear" + k).innerHTML = months[month] + " " + year; //Gør at du kan se måneder og år
    var date = 1; // Bruges til at referere datoer

    // skaber alle rækker
    for (var i = 0; i < 6; i++) {
        // skaber en række til at kunne smide data fra ugedags arrayet ind
        if (i == 0) {
            var ugerow = document.createElement("tr");
            ugerow.className = "ugedagsliste";
            document.getElementById("månedDiv" + k).appendChild(ugerow); // Sætter rækkerne ind i kalender-body
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
                row.className = "liste"; // første række efter ugedagene får klassen 'liste'
            }

            // Opretter rækker hvor resterende kalenderdata kan sættes ind
            else {
                var row = document.createElement("tr");
                row.className = "linje"; //Resten af rækkerne giver vi klassen 'linje'
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

            // Retter på datoen hvis måneden starter på en søndag
            else if (firstDay == -1 && date == 1) {
                date++;
                j--; //gør at den ikke mister en omgang fra loopet
            }

            // Giver en række et id hvis der er 5 tomme dage i træk
            else if (tom == 5 && i == 0) {
                row.id = "tomx5"; //hvis 'tom' bliver talt op til 5 kalder vi den række for tomx5 så det bliver nemmere at fjerne i css
                tom++;  //sørger for at den ikke går ind i statementen igen.
                date++;
            }

            // Gør at lørdag og søndag ikke tæller med
            else if (j == 5 || j == 6) {
                var cellend = document.createElement("td");
                cellend.id = currentYear + "-" + (currentMonth + 1) + "-" + date; //giver celler et id ud fra dato
                cellend.className = "weekend";
                date++; //tæller en dag op
            }

            // Bryder ud af loopet hvis dage overstiger hvad der er på en måned
            else if (date > daysInMonth) {
                break;
            }

            // Opretter de resterende celler og indsætter numre i forhold til datoen
            else {
                var cell = document.createElement("td");
                var cellBox = document.createElement("div"); // Bruges til at kunne flytte data fra en box til en anden 
                var cellText = document.createTextNode(date);
                cell.className = "dag"; // Giver cellerne klassen dag
                cellBox.id = currentYear + "-" + (currentMonth + 1) + "-" + date; //giver celler et id ud fra dato
                cellBox.className = "dagbox"; // Giver boxene klassen dagbox
                row.appendChild(cellBox);
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++; //tæller en dag op
            }
        }
        monthDiv.appendChild(row); // smider vær række ind i kalenderen
    }
}


function show3() {
    var tbl = document.getElementById("kalender-body"); // Selve kalender delen
    tbl.innerHTML = ""; // fjerner celler, bruges når man trykker på previous/next eller skifter viewtype

    // checker om den allerede er inde i functionen
    if (m != 3) {

        currentYear = today.getFullYear();  // gør at man er i nuværende år

        // checker om man er i første kvartal
        if (currentMonth == 1 || currentMonth == 2) {
            currentMonth = 0;
        }

        // checker om man er i andet kvartal
        else if (currentMonth == 4 || currentMonth == 5) {
            currentMonth = 3;
        }

        // checker om man er i tredje kvartal
        else if (currentMonth == 7 || currentMonth == 8) {
            currentMonth = 6;
        }

        // checker om man er i fjerde kvartal
        else if (currentMonth == 10 || currentMonth == 11) {
            currentMonth = 9;
        }
    }

    m = 3;  // bruges i next og previous 

    for (var gange = 0; gange < 3; gange++) {
        showCalendar(currentMonth, currentYear);
        currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear; // beregner ud fra hvilket årstal det er med udgangspunkt i hvilket måned det er.
        currentMonth = (currentMonth + 1) % 12; // beregner hvad den nye måned skal være.
    }

    // Sørger for at man også kan gå tilbage i kalenderen
    while(gange <= 3, gange--) {
        currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear; // beregner ud fra hvilket årstal det er med udgangspunkt i hvilket måned det er.
        currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1; // beregner hvad den nye måned skal være.
    }
    k = 0; // bruges til at insætte måneder i div tags
}


//Viser hele år
function showyear() {
    var tbl = document.getElementById("kalender-body"); // Selve kalender delen
    tbl.innerHTML = ""; // fjerner celler, bruges når man trykker på previous/next eller skifter viewtype

    // checker om den allerede er inde i functionen
    if (m != 12) {
        currentMonth = 0; // gør at den første måned der bliver vist er januar
        currentYear = today.getFullYear();  // gør at man er i nuværende år
    }

    m = 12; // bruges i next og previous 

    // Indsætter 12 måneder
    for (var gange = 0; gange < 12; gange++) {
        showCalendar(currentMonth, currentYear);
        currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear; // beregner ud fra hvilket årstal det er med udgangspunkt i hvilket måned det er.
        currentMonth = (currentMonth + 1) % 12; // beregner hvad den nye måned skal være.
    }

    // Sørger for at man også kan gå tilbage i kalenderen
    while (gange <= 12, gange--) {
        currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear; // beregner ud fra hvilket årstal det er med udgangspunkt i hvilket måned det er.
        currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1; // beregner hvad den nye måned skal være.
    }
    k = 0; // bruges til at insætte måneder i div tags
}

//Viser en måned ad gangen
function onemonth() {
    var tbl = document.getElementById("kalender-body"); // Selve kalender delen
    tbl.innerHTML = ""; // fjerner celler, bruges når man trykker på previous/next eller skifter viewtype

    // checker om den allerede er inde i functionen
    if (m != 1) {
        currentMonth = today.getMonth(); // gør at man starter på nuværende måned
        currentYear = today.getFullYear();  // gør at man er i nuværende år
    }

    m = 1;  // bruges i next og previous

    showCalendar(currentMonth, currentYear);
    m = 1;  // bruges i next og previous 
    k = 0;  // bruges til at insætte måneder i div tags
}














