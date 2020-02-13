//<Globals
var m = 0, k = 0, j = 0, t = 0, E = 0;
var today = new Date();
var jObjA = [], eventID = [], startdato = [], slutdato = [], skoleID = [], modultal = [], synlig = [];
var currentMonth = today.getMonth();
var currentYear = today.getFullYear();
var week1 = new Date(today.getFullYear(), 0, 4);
var helekalender = document.getElementById("helekalender");
var weekdays = ["man", "tir", "ons", "tor", "fre", "lør", "søn"]; //array med ugedage
var months = ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"]; //array med måneder
var text = []; //jsonfil format fra databasen som skal vise alle de events der kommer til at være der
//Globals End>

showyear(); //Starter programmet med årlig visning

function swapSheet(sheet){ //Skifter css når du trykker på en knap, hvis du bruger 1-månedsvisning skal stylen jo være anderledes end hvis du bruger 3-månedersvisning
    document.getElementById("stylesheetID").setAttribute("href", sheet); //finder et af de andre sylesheets og skifter det nuværende stylesheet til det andet.
}

//skift til næste visning
function next() {
    E = 0; //reset til måneder der vises efter nuværende visning
    //Checker om der vises 3 måneder
    if (m == 3) {
        for (var i = 0; i < 3; i++) {
            currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear; //beregner nuværende år ud fra nuværende måned
            currentMonth = (currentMonth + 1) % 12; //beregner nuværende måned
        }
        show3();
    }

    //Checker om hele året bliver vist
    else if (m == 12) {
        for (var i = 0; i < 12; i++) {
            currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear; //beregner nuværende år ud fra nuværende måned
            currentMonth = (currentMonth + 1) % 12; //beregner nuværende måned
        }
        showyear();
    }

    //Checker at det kun er en måned der bliver vist
    else if (m == 1) {
        currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear; //beregner nuværende år ud fra nuværende måned
        currentMonth = (currentMonth + 1) % 12; //beregner nuværende måned
        showmonth();
    }
}

//skift til forige visning
function previous() {
    E = 0; //reset til måneder der vises før nuværende visning
    //Checker om der vises 3 måneder
    if (m == 3) {
        for (var i = 0; i < 3; i++) {
            currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear; //beregner nuværende år ud fra nuværende måned
            currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1; //beregner nuværende måned
        }
        show3();
    }

    //Checker om hele året bliver vist
    else if (m == 12) {
        for (var i = 0; i < 12; i++) {
            currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear; //beregner hvilket årstal det er, med udgangspunkt i den nuværende måned.
            currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1; //beregner hvad den nye måned skal være.
        }
        showyear();
    }

    //Checker at det kun er en måned der bliver vist
    else {
        currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear; //beregner hvilket årstal det er, med udgangspunkt i den nuværende måned.
        currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1; //beregner hvad den nye måned skal være.
        showmonth();
    }
}

//-------------------------------------------------------------------------Kalender Programmet-------------------------------------------------------------------------->

function removeWeek() { //fjerner overflødige uger som fylder på layoutet
    var dvCol = document.getElementsByClassName("datoVisning"); //fanger alle klasser med klassenavnet datoVisning, og smider det i en variabel som hedder dvCol (datoVisningCollection)
    for (var hw = 0; hw < dvCol.length; hw++){
        if (dvCol[hw].children.length == 0) { //hvis længden på den klasse som for loopet er nået til, er 0 gør dette:
            dvCol[hw].parentElement.parentElement.parentElement.className = "hideWeek"; //erstatter .ugeCSS (som har children.length på 0) med "hideWeek"
            dvCol[hw].parentElement.parentElement.parentElement.previousSibling.className = "hideWeek"; //erstatter .ugeData (som står "ved siden af" den den ugeCSS som lige er blevet erstattet) med "hideWeek"
            document.querySelectorAll(".hideWeek").forEach(function(a){ //fanger alle klasser med navnet hideWeek
                a.remove(); //fjerner .hideWeek
            })
        }  
    }
}

//please kig på removeDays(), den skal ikke fjerne noget hvis der er en ny event i samme uge (FIX!)
//den skal også virke når man trykker next og previous

function removeDays() { //fjerner .dage klasser som bliver placeret efter events da de skubber til vores event
    var noEventLinje = document.querySelectorAll(".eventLinje"); //fanger alle elementer som har klassen 'eventLinje'
    //var noEventLinje = document.getElementsByClassName("eventLinje"); //fanger alle elementer som har klassen 'eventLinje'
    for (var d = 0; d < noEventLinje.length; d++) { //kører igennem hver element som har klassen .eventLinje (kører igennem hver uge)
        var eventCol = noEventLinje[d].children; //gemmer hver eventLinje's børn for at se hvilke klasser de har
        for (var d2 = 0; d2 < eventCol.length; d2++) { //kører igennem hver dag der er på ugen
            if (eventCol[d2].classList.length == 1 && eventCol[d2].classList != "tomdag" && eventCol[d2].parentElement.firstChild.classList != "dage" && eventCol[d2].parentElement.lastChild.classList == "dage") {
                //hvis det element loopet er nået til har én klasse (.dage eller .tomdag), 
                //og den klasse ikke er .tomdag (.dage), 
                //og forældreelementets første barn ikke er .dage ()
                //og forældreelementets sidste barn er .dage ()
                //dette fravælger alle elementer som ikke skal pilles ved, målet er at fjerne alle .dage klasser som kommer *efter* .eventAll, men skal ikke fjerne .dage klasser som kommer *før* .eventAll
                //eventCol[d2].classList.replace("dage", "hide"); //fjern .dage
                /*eventCol[d2].classList.remove("dage"); //fjern .dage
                eventCol[d2].classList.add("hide"); //tilføj .hide*/
            }
            /*else if () {

            }*/
        }
    }
}

//Funktion der viser hele kalenderen fra nuværende måned (kan skifte måned med next eller previous funktionerne) og er også hovedfunktionen til kalenderen.
function showCalendar(month, year) {

    k++; //bruges til at tælle måneder
    var firstDay = (new Date(year, month)).getDay() -1;  //gør at første dag på ugen er en mandag i stedet for søndag
    var daysInMonth = 32 - new Date(year, month, 32).getDate(); //beregner hvor mange dage der er på nuværende måned

    var tbl = document.getElementById("kalender-body"); //får fat i selve kalender body'en

    document.getElementById("årstal").innerHTML = year; //viser året på toppen af kalenderen
    var monthDiv = document.createElement("div");  //laver monthDiv 
    monthDiv.className = "månedDivC"; //giver monthDiv en klasse til at style på
    monthDiv.id = "månedDiv" + k; //giver hver monthDiv et ID så hver måned kan kaldes individuelt

    //checker om alle 12 måneder bliver vist
    if (m == 12) {

        //laver 3 blokke til at kunne sætte månederne ind i 
        if (k == 1) {
            for (var q = 1; q < 4; q++) {
                var fourMonth = document.createElement("div"); //laver en blok kaldet fourMonth
                fourMonth.id = "fm" + q; //giver blokkene et ID
                tbl.appendChild(fourMonth); //sætter fourMonth ind i kalenderdelen
            }
        }

        //indsætter de første fire måneder ind i den første blok
        if (k >= 1 && k <= 4) {
            var fourMonth1 = document.getElementById("fm1"); //kalder på blok 1
            fourMonth1.appendChild(monthDiv); //sætter månederne ind i første blok
        }

        //indsætter femte til ottende måned ind i den anden blok
        else if (k >= 5 && k <= 8) {
            var fourMonth2 = document.getElementById("fm2"); //kalder på blok 2
            fourMonth2.appendChild(monthDiv); //sætter månederne ind i anden blok
        }

        //indsætter de sidste fire måneder ind i den tredje blok
        else {
            var fourMonth3 = document.getElementById("fm3"); //kalder på blok 3
            fourMonth3.appendChild(monthDiv); //sætter månederne ind i tredje blok
        }
    }

    //hvis ikke hele året bliver vist, sætter den bare månederne direkte ind i kalenderen
    else {
        tbl.appendChild(monthDiv); //sætter månederne ind i kalender delen
    }

    var showMonth = document.createElement("h3"); //laver en header til hver måned
    showMonth.className = "header"; 
    showMonth.id = "monthAndYear" + k; //giver headeren et id ud fra hvilket nr. måned det er
    document.getElementById("månedDiv" + k).appendChild(showMonth); //sætter rækkerne ind i kalender-body

    document.getElementById("monthAndYear" + k).innerHTML = months[month] + " " + year; //viser navn på måned og år
    var date = 1; // Bruges til at referere datoer

    //skaber alle rækker
    for (var i = 0; i < 6; i++) {
        //skaber en række til at kunne smide data fra ugedags arrayet ind
        if (i == 0) {
            var ugerow = document.createElement("tr"); //laver en række til at sætte ugedage ind i
            ugerow.className = "ugedagsliste"; 
            document.getElementById("månedDiv" + k).appendChild(ugerow); // Sætter rækkerne ind i kalender-body
        }
        //laver alt indhold til et table og gør at man kan redigere nemmere i det og placere dem hvor de skal være 
        var ugecss = document.createElement("div"); //bruges til at holde styr på cellerne så det er nemmere at sætte events ind
        var ugedata = document.createElement("div");
        var ugetable = document.createElement("table");
        var tablehead = document.createElement("thead");
        var tablebody = document.createElement("tbody");
        tablebody.classList.add("eventLinjeBody");
        ugecss.classList.add("ugeCSS");
        ugedata.classList.add("ugeData");
        document.getElementById("månedDiv" + k).appendChild(ugecss); //Sætter rækkerne ind i kalender-body
        document.getElementById("månedDiv" + k).appendChild(ugedata); //Sætter rækkerne ind i kalender-body
        ugedata.appendChild(ugetable);
        ugetable.appendChild(tablehead);
        ugetable.appendChild(tablebody);

    //Oprætter de rækker som skal bruges i kalenderen -------------------------------------------------------------------------------------------------------<
    for (var d = 0; d < 6; d++) {

            var ugenavn = weekdays[d]; //var ugenavn = arrayet hvor navnene på ugedagene står

            //Opretter celler i ugerow rækken, hvor der indsættes data fra ugedag arrayet  
            if (i == 0 && d != 5) {
                var cell = document.createElement("td");                
                var cellText = document.createTextNode(ugenavn);
                cell.className = "ugedag";  //giver ugedagene klassen 'ugedag'
                cell.appendChild(cellText);
                ugerow.appendChild(cell);
            }

            //Opretter en række som vi kan bruge til at aflæse efter tomme dage
            else if (i == 0 && d == 5) {
                var row = document.createElement("tr"), hrow = document.createElement("tr");
                row.className = "eventLinje"; //første række efter ugedagene får klassen 'eventLinje'
                hrow.className = "datoVisning"; //første række efter ugedagene får klassen 'datoVisning'
                tablebody.appendChild(row);
                tablehead.appendChild(hrow);
            }

            //Opretter rækker hvor resterende kalenderdata kan sættes ind
            else {
                var row = document.createElement("tr"), hrow = document.createElement("tr");
                row.className = "eventLinje"; //Resten af rækkerne giver vi klassen 'eventLinje'
                hrow.className = "datoVisning"; //Resten af rækkerne giver vi klassen 'datoVisning'
                tablebody.appendChild(row);
                tablehead.appendChild(hrow);
                break;
            }
        }
        var tom = 0;  //Bruges til at tælle tomme dage

        //Skaber de individuelle celler og fylder dem med data -----------------------------------------------------------------------------------------------<
        for (var j = 0; j < 7; j++) {
            //Opretter celler som enten rykker til andre dage eller fjerner dage hvor der ikke er data
            if (i === 0 && j < firstDay) {
                var tomcell = document.createElement("td"), tomhead = document.createElement("th");                
                var cellText = document.createTextNode(""), headtext = document.createTextNode("");
                tomcell.className = "tomdag"; //laver en celle som får klassen tomdag for at gøre det nemmere at fjerne dem i css
                tomhead.className = "tomdag"; //laver en header som får klassen tomdag for at gøre det nemmere at fjerne dem i css               
                tomhead.appendChild(headtext);
                tomcell.appendChild(cellText);                
                hrow.appendChild(tomhead);
                row.appendChild(tomcell);       
                var tomDiv = document.createElement("div") //samme kode som ovenover men bliver appendet på ugeCSS i stedet for inden i ugeData
                tomDiv.className = "tomdag";
                ugecss.appendChild(tomDiv);
                tom++; //Bruges til at tælle hvor mange celler der ikke har data
            }

            //Retter på datoen hvis måneden starter på en søndag
            else if (firstDay == -1 && date == 1) {
                date++;
                j--; //gør at den ikke mister en omgang fra loopet
            }

            //Giver en række et ID hvis der er 5 tomme dage i træk
            else if (tom == 5 && i == 0) {
                //row.id = "tomx5"; //hvis 'tom' bliver talt op til 5 kalder vi den række for tomx5 så det bliver nemmere at fjerne i css
                //hrow.id = "tomx5"; //hvis 'tom' bliver talt op til 5 kalder vi den række for tomx5 så det bliver nemmere at fjerne i css
                row.parentElement.parentElement.parentElement.classList.add("tomx5");
                tom++;  //sørger for at den ikke går ind i statementen igen.
                date++; //tæller en dag op
            }

            //Gør at lørdag og søndag ikke tæller med
            else if (j == 5 || j == 6) {
                var cellend = document.createElement("td");
                cellend.id = currentYear + "-" + (currentMonth + 1) + "-" + date; //giver celler et ID ud fra dato
                cellend.className = "weekend";
                date++; //tæller en dag op
            }

            //Bryder ud af loopet hvis dage overstiger hvad der er på daværende måned
            else if (date > daysInMonth) {
                break;
            }

            //Opretter de resterende celler og indsætter numre i forhold til datoen
            else {
                var cell = document.createElement("td");
                var cellBox = document.createElement("div"); //Bruges til at kunne flytte data fra en box til en anden
                var dagcell = document.createElement("th");  //Bruges til at vise datoen
                var cellText = document.createTextNode(date); //opretter text med dagtal
                cellBox.classList.add("dagbox");
                dagcell.classList.add("dageTop");
                cell.id = currentYear + "-" + (currentMonth + 1) + "-" + date; //Giver cellerne datoen for dagen

                //bruges til at give tableheads'ne en klasse ud fra datoen og gør dem Json venlig
                if (currentMonth + 1 < 10 && date < 10 && currentMonth + 1  > 0 && date > 0) {
                    dagcell.classList.add(currentYear + "-0" + (currentMonth + 1) + "-0" + date);
                }
                //hvis måned er 1 eller over og date er mindre end 10
                else if (currentMonth + 1 >= 10 && date < 10 && date > 0) {
                    dagcell.classList.add(currentYear + "-" + (currentMonth + 1) + "-0" + date);
                }
                //hvis måned er mindre end 10 og dage er 10 eller over
                else if (currentMonth + 1 < 10 && date >= 10 && currentMonth + 1 > 0) {
                    dagcell.classList.add(currentYear + "-0" + (currentMonth + 1) + "-" + date);
                }
                //hvis både dage og måned er 10 eller over.
                else {
                    dagcell.classList.add(currentYear + "-" + (currentMonth + 1) + "-" + date);
                }

                cell.className = "dage"; //Giver cellerne klassen dage
                tablebody.classList.add("D" + currentYear + "-" + (currentMonth + 1) + "-" + date); //giver celler et ID ud fra dato
                hrow.appendChild(dagcell);
                dagcell.appendChild(cellText);
                row.appendChild(cell); 
                ugecss.appendChild(cellBox);
                date++; //tæller en dag op

                week1.setFullYear(currentYear); //gør at kalenderen viser det år du er kommet til
                var weekNumber = currentYear + "-" + (currentMonth + 1) + "-" + date; //bruges til at beregne hvilket ugenummer det er
                var weekNrDate = new Date(weekNumber); //laver det om til en dato for at kunne beregne ud fra datoerne i kalenderen

                //checker om der kun er en dag på ugen
                if (tablebody.rows[0].cells.length == 1) { 
                    ugetable.classList = "Uge" + (showweek + 1);
                }

                var showweek = 1 + Math.round(((weekNrDate.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7 ); //beregner ugenumre

                //checker om de første dage på det nye år er i uge 53
                if (tablebody.rows[0].cells.length >= 4 && isNaN(showweek) && document.getElementById("månedDiv12") || showweek == 0) {
                    showweek = 53;
                }

                //fejlsikring som sørger for at de normale år ikke får en uge 53 og sætter ugen til uge 1
                else if (showweek == 53) {
                    showweek = 1;
                }

                //fejlsikring for at se om showweek giver et rigtigt resultat.
                if (showweek === showweek) { // checker at det ikke bliver NaN
                ugetable.classList = "Uge" + showweek;
                }
                ugetable.classList.add("række");
            }
        }
        removeWeek(); //fjerner overflødig uge med tom data
    } 

}

//---------------------------------------------------------------------------Kalender Form---------------------------------------------------------------------------->

function show3() {
    var tbl = document.getElementById("kalender-body"); //får fat i selve kalender body'en
    tbl.innerHTML = ""; //fjerner celler. Bruges når man trykker på previous/next eller skifter viewtype

    //checker om den allerede er inde i funktionen
    if (m != 3) {
        currentMonth = today.getMonth(); //gør at man starter på nuværende måned
        currentYear = today.getFullYear();  //gør at man er i nuværende år

        //checker om man er i første kvartal
        if (currentMonth == 1 || currentMonth == 2) {
            currentMonth = 0;
        }

        //checker om man er i andet kvartal
        else if (currentMonth == 4 || currentMonth == 5) {
            currentMonth = 3;
        }

        //checker om man er i tredje kvartal
        else if (currentMonth == 7 || currentMonth == 8) {
            currentMonth = 6;
        }

        //checker om man er i fjerde kvartal
        else if (currentMonth == 10 || currentMonth == 11) {
            currentMonth = 9;
        }
    }

    m = 3;  //bruges i next og previous 

    //Sørger for at man kan gå frem i kalenderen
    for (var gange = 0; gange < 3; gange++) {
        showCalendar(currentMonth, currentYear); //henter kalender programmet
        currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear; //beregner nuværende år ud fra nuværende måned
        currentMonth = (currentMonth + 1) % 12; //beregner nuværende måned
    }

    //Sørger for at man også kan gå tilbage i kalenderen
    while(gange <= 3, gange--) {
        currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear; //beregner nuværende år ud fra nuværende måned
        currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1; //beregner nuværende måned
    }
    k = 0; //bruges til at insætte måneder i div tags
    jsonParser(); //henter datoer der skal bruges
    events(jObjA); //henter indhold til kalenderen
    swapSheet('css/kalenderstyleKvartal.css'); //skifter css om til 3 måneders visning
}

//Viser hele år
function showyear() {
    var tbl = document.getElementById("kalender-body"); //får fat i selve kalender body'en
    tbl.innerHTML = ""; //fjerner celler, bruges når man trykker på previous/next eller skifter viewtype

    //checker om den allerede er inde i functionen
    if (m != 12) {
        currentMonth = 0; //gør at den første måned der bliver vist er januar
        currentYear = today.getFullYear();  //gør at man er i nuværende år
    }

    m = 12; //bruges i next og previous 

    //Indsætter 12 måneder
    for (var gange = 0; gange < 12; gange++) {
        showCalendar(currentMonth, currentYear); //henter kalender programmet
        currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear; //beregner nuværende år ud fra nuværende måned
        currentMonth = (currentMonth + 1) % 12; //beregner nuværende måned
    }

    //Sørger for at man også kan gå tilbage i kalenderen
    while (gange <= 12, gange--) {
        currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear; //beregner nuværende år ud fra nuværende måned
        currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1; //beregner nuværende måned
    }
    k = 0; //bruges til at insætte måneder i div tags
    jsonParser(); //henter datoer der skal bruges
    events(jObjA); //henter indhold til kalenderen
    swapSheet('css/kalenderstyle.css'); //skifter css om til årlig visning
}

//Viser en måned ad gangen
function showmonth() {
    var tbl = document.getElementById("kalender-body"); //får fat i selve kalender body'en
    tbl.innerHTML = ""; // fjerner celler, bruges når man trykker på previous/next eller skifter viewtype

    // checker om den allerede er inde i funktionen
    if (m != 1) {
        currentMonth = today.getMonth(); // gør at man starter på nuværende måned
        currentYear = today.getFullYear();  // gør at man er i nuværende år
    }

    m = 1;  // bruges i next og previous

    showCalendar(currentMonth, currentYear); //henter kalender programmet
    m = 1;  // bruges i next og previous 
    k = 0;  // bruges til at insætte måneder i div tags
    jsonParser(); //henter datoer der skal bruges
    events(jObjA); //henter indhold til kalenderen
    swapSheet('css/kalenderstyleMåned.css'); //skifter css om til 1 månededs visning
}

//--------------------------------------------------------------------------------JSON--------------------------------------------------------------------------------->



//Tager en JSON fil og laver den til data som programmet skal kunne læse/opdatere
function jsonParser() {
    // var jText = '[{"id":4,"pladser":30,"startdato":"01/01/2019","slutdato":"29/01/2019","reserverede_pladser":15,"synlig":"ja","skole_id":"Skole 9","moduldata_id":"2.3","region_id":"Hovedstaden","created_at":"2019-06-13 06:17:35","updated_at":"2019-06-13 06:17:35"},' +
    // '{"id":5,"pladser":25,"startdato":"01/01/2019","slutdato":"29/01/2019","reserverede_pladser":5,"synlig":"ja","skole_id":"Skole 1","moduldata_id":"1.1","region_id":"Hovedstaden","created_at":"2019-06-13 06:17:35","updated_at":"2019-06-13 06:17:35"},' +
    // '{"id":6,"pladser":20,"startdato":"21/01/2020","slutdato":"17/02/2020","reserverede_pladser":10,"synlig":"ja","skole_id":"Skole 2","moduldata_id":"1.2","region_id":"Hovedstaden","created_at":"2019-06-13 06:17:35","updated_at":"2019-06-13 06:17:35"},' +
    // '{"id":7,"pladser":30,"startdato":"03/02/2020","slutdato":"28/02/2020","reserverede_pladser":15,"synlig":"ja","skole_id":"Skole 2","moduldata_id":"1.3","region_id":"Hovedstaden","created_at":"2019-06-13 06:17:35","updated_at":"2019-06-13 06:17:35"},' +
    // '{"id":8,"pladser":35,"startdato":"03/02/2020","slutdato":"28/02/2020","reserverede_pladser":20,"synlig":"ja","skole_id":"Skole 3","moduldata_id":"1.3","region_id":"Sjælland","created_at":"2019-06-13 06:17:35","updated_at":"2019-06-13 06:17:35"},' +
    // '{"id":9,"pladser":30,"startdato":"03/02/2020","slutdato":"28/02/2020","reserverede_pladser":25,"synlig":"ja","skole_id":"Skole 1","moduldata_id":"2.1","region_id":"Sjælland","created_at":"2019-06-13 06:17:35","updated_at":"2019-06-13 06:17:35"},' + 
    // '{"id":10,"pladser":25,"startdato":"01/05/2020","slutdato":"30/05/2020","reserverede_pladser":20,"synlig":"ja","skole_id":"Skole 3","moduldata_id":"2.2","region_id":"Sjælland","created_at":"2019-06-13 06:17:35","updated_at":"2019-06-13 06:17:35"},' +
    // '{"id":11,"pladser":30,"startdato":"03/06/2020","slutdato":"31/07/2020","reserverede_pladser":30,"synlig":"ja","skole_id":"Skole 4","moduldata_id":"3.1","region_id":"Syddanmark","created_at":"2019-06-13 06:17:35","updated_at":"2019-06-13 06:17:35"},' +
    // '{"id":12,"pladser":15,"startdato":"03/02/2020","slutdato":"22/02/2020","reserverede_pladser":12,"synlig":"ja","skole_id":"Skole 6","moduldata_id":"2.3","region_id":"Syddanmark","created_at":"2019-06-13 06:17:35","updated_at":"2019-06-13 06:17:35"},' +
    // '{"id":13,"pladser":16,"startdato":"09/10/2020","slutdato":"29/10/2020","reserverede_pladser":11,"synlig":"ja","skole_id":"Skole 7","moduldata_id":"2.3","region_id":"Syddanmark","created_at":"2019-06-13 06:17:35","updated_at":"2019-06-13 06:17:35"},' +
    // '{"id":14,"pladser":14,"startdato":"02/11/2020","slutdato":"14/01/2021","reserverede_pladser":12,"synlig":"ja","skole_id":"Skole 7","moduldata_id":"2.3","region_id":"Midtjylland","created_at":"2019-06-13 06:17:35","updated_at":"2019-06-13 06:17:35"},' +
    // '{"id":15,"pladser":22,"startdato":"29/11/2021","slutdato":"10/01/2022","reserverede_pladser":19,"synlig":"ja","skole_id":"Skole 1","moduldata_id":"1.1","region_id":"Midtjylland","created_at":"2019-06-13 06:17:35","updated_at":"2019-06-13 06:17:35"},' +
    // '{"id":16,"pladser":19,"startdato":"01/12/2021","slutdato":"21/01/2022","reserverede_pladser":15,"synlig":"ja","skole_id":"Skole 7","moduldata_id":"2.3","region_id":"Nordjylland","created_at":"2019-06-13 06:17:35","updated_at":"2019-06-13 06:17:35"},' +
    // '{"id":17,"pladser":30,"startdato":"02/12/2021","slutdato":"19/05/2022","reserverede_pladser":15,"synlig":"ja","skole_id":"Skole 2","moduldata_id":"2.3","region_id":"Nordjylland","created_at":"2019-06-13 06:17:35","updated_at":"2019-06-13 06:17:35"}]';  

                /* 
                '{"id":14,"pladser":30,"startdato":"03/06/2020","slutdato":"30/06/2020","reserverede_pladser":15,"synlig":"ja","skole_id":"Skole 3","moduldata_id":"4.1","created_at":"2019-06-13 06:17:35","updated_at":"2019-06-13 06:17:35"}]';*/
    var jText = '{!! $events !!}';
    // var jObj = JSON.parse(jText); //gør jText filen om til et JSON object
    var jObj = JSON.parse(jText);

    for (i = 0; i < jObj.length; i++) {
        jObjA[i] = jObj[i]; //gemmer det enkelte json object i et globalt array hver gang for loopet kører så man kan hente events andre steder i koden
    }

    jsonHandler(jObjA);
    //Loopet kører for hvert modul der bliver sendt igennem
}

function jsonHandler(jsonObjectArray) {

    for (i = 0; i < jsonObjectArray.length; i++) {

        var newSTDate = dateSplitter(jsonObjectArray[i].startdato);
        var newEDate = dateSplitter(jsonObjectArray[i].slutdato);

        slutdato[i] = newEDate;
        startdato[i] = newSTDate; //gør at den dato vi har fået fra newSTDate bliver en reel dato, og smider den ind i et array
        if (startdato[i] >= (currentYear + 1) + "-1-" + "1") { //hvis start dato er større eller lig med nuværende år + 1 - 1 + 1                                                      <---- hvad fuck
            break;
        }
        else {   
            synlig[i] = jsonObjectArray[i].synlig; //synlig bliver smidt ind i et array hver gang loopet kører
            skoleID[i] = jsonObjectArray[i].skole_id; //skole_id bliver smidt ind i et array hver gang loopet kører
            modultal[i] = jsonObjectArray[i].moduldata_id; //moduldata_id bliver smidt ind i et array hver gang loopet kører
            eventID[i] = jsonObjectArray[i].id; //id bliver smidt ind i et array hver gang loopet kører
        }
    }
}

function dateSplitter(dateToBeSplit) {
    var newSplitDate = dateToBeSplit.split("/").reverse().join("-"); //splitter dato på /, omvender tallene, smider sammen på - (xx/xx/xxxx -> xxxx-xx-xx)
    newSplitDate = newSplitDate.split("-0").join("-"); //fjerner 0'er ellers klager siden (xxxx-0x-0x -> xxxx-x-x)
    return newSplitDate;
}

function getDateArray(start, end) {        
    
    var fDatesArray = new Array(); //nyt array
    var dt = new Date(start); //start (startdato[i]) bliver lavet til en dato
    var end = new Date(end); //end (slutdato[i]) bliver lavet til en dato

    while(dt.toLocaleDateString() != end.toLocaleDateString()){ //mens startdatoen er mindre end eller lig med slutdatoen        
        fDatesArray.push(new Date(dt)); //laver en dato ud af dt og smider den på arrayet
        dt.setDate(dt.getDate() + 1);
        if (dt.toLocaleDateString() == end.toLocaleDateString()) { // der er chance for at dt == end når while loopet er færdigt, er dette tilfældet skal vi indsætte datoen efter dt
            fDatesArray.push(new Date(dt)); 
        }
    }
    return fDatesArray;
}  

function dateFixer(arrayOfDates) {
    arrayOfDates.setHours(0, -arrayOfDates.getTimezoneOffset(), 0, 0); //gør noget (stackoverflow siger "removing the timezone offset and 12 hours")
    arrayOfDates = arrayOfDates.toISOString().split("T")[0]; //datoer bliver til en ISOString (yyyy-mm-ddThh:mm:ss), men bliver splittet på T så det bliver til et array, tager den første del arrayet
    arrayOfDates = arrayOfDates.split("-0").join("-"); //splitter på "-0", sætter sammen igen på "-" (xxxx-0x-0x -> xxxx-x-x)

    return arrayOfDates;
}

//---------------------------------------------------------------------------Events Handler---------------------------------------------------------------------------->

function events(allEvents) { //placerer events
    var hasEventList = document.getElementsByClassName("hasEvent"); //fanger elementer som har klassen hasEvent    
    var hasPlacedEvent = document.getElementsByClassName("placedEvent")
    jsonHandler(allEvents);

    if (hasEventList.length >= 0) {
        while (hasEventList.length > 0) {            
            hasEventList[0].classList.remove("hasEvent");
        }
    }

    if (hasPlacedEvent.length >= 0) {
        while (hasPlacedEvent.length > 0) {
            hasPlacedEvent[0].remove();
        }
    } //de to ifs ovenover fjerner alt der er blevet tilføjet fra events() (dette sker hver gang man ændrer i allEvents, altså når bruger søgefunktionen)

    for (i = 0; i < allEvents.length; i++) {
        var datesArray = getDateArray(startdato[i], slutdato[i]); //kører startdato[i] og slutdato[i] igennem getDateArray, for at få et array med alle datoerne mellem start og slutdatoen
        var firstDate = document.getElementById(startdato[i]) //finder alle elementer med ID'et startdato[i]
        var appendModulDiv = document.createElement("div");
        var plusNode = document.createTextNode(" +");
        var appendModulNode = document.createTextNode(allEvents[i].moduldata_id + " "); //det elements moduldata loopet er nået til

        if (firstDate != null) { //hvis dagen ikke er null (siden dør hvis den placerer på en dato som ikke findes såsom weekender eller et andet år)
            appendModulDiv.appendChild(appendModulNode); //appender noden på div
            appendModulDiv.classList.add("placedEvent"); //giver div'en klassen "placedEvent"
            firstDate.appendChild(appendModulDiv);  //appender diven (samt noden) på eventets første dato
        } //placerer moduldata på den første dato på eventet
        
        if (firstDate != null && firstDate.classList.contains("hasEvent")) { //hvis elementet allerede har .hasEvent (det betyder dette loop allerede er kørt igennem en gang, og der er flere events på en enkelt dag)
            firstDate.firstElementChild.classList.add("extraEvent");
            appendModulDiv.appendChild(plusNode); //appender node på div
            firstDate.appendChild(appendModulDiv); //appender div (samt node) på datoen
        } //placerer +'er på dage med mere end ét event
                       
        for (x = 0; x < datesArray.length; x++) {            
            datesArray[x] = dateFixer(datesArray[x]); //datesArray[x] er originalt i det lange dato format, i dateFixer() bliver det kortere så det bedre passer med siden
            var eventPlacer = document.getElementById(datesArray[x]); //finder ID'et på elementer som har datoer fra datesArray[x]
            if (eventPlacer != null) { //hvis eventplacer ikke er null (elementet findes)
                
                //eventPlacer.appendChild(hasEventDiv);
                eventPlacer.classList.add("hasEvent"); //placerer .hasEvent (.hasEvent er farvet blåt)
            }
        } //placerer ".hasEvent"-klassen på alle dage som har et event
    }    

    for (i = 0; i < hasEventList.length; i++) { //itererer igennem hver dag som har mere end et event
        if (hasEventList[i].children.length > 1) { //hvis længden på det element du er nået til er over 1 (hvis der er mere end ét event på en dag)
            //var childrenLength = hasEventList[i].children.length; //fanger længden på det event du er nået til
    
            while (hasEventList[i].children.length > 1) { //mens længden på det event du er nået til er over 1
                hasEventList[i].children[1].remove(); //fjern element[1] (ikke element[0] da det er det første event på dagen)
            } //fjerner events når der er mere end ét event på en dag
            
            //childrenLength = childrenLength - 1; 
            //var extraEventNode = document.createTextNode("+" + childrenLength); //extraEventNode bliver til +(antal events efter første event (fx 2.1 +3))
            //hasEventList[i].firstElementChild.append(extraEventNode); //append extraEventNode på det event i listen du er nået til
            //hasEventList[i].firstElementChild.classList.add("extraEvent");                    
            //udkommenteret indtil videre, ikke helt sikker på hvad koden gør
        }
    }
}

var filter_properties = [];
var searchfilter_properties = [];

function skolefilter(val) { //val er det der står i skolesøgningsboxen
    val = val.toString(val); //val er val som er val
    filter_properties[0] = val.toLowerCase(); //filter_properties[0] = værdi som står i skolesøgningsboxen - bliver lowercaset så man kan søge bedre
    setfilter();
}

function modulfilter(val) {
    filter_properties[1] = val; //filter_properties[1] er lig med val (det der står i modulsøgningsboxen)
    setfilter();
}

function regionsfilter(val) {
    filter_properties[2] = val; //filter_properties[2] er lig med val (det der står i region dropdown'en)
    setfilter();
}

function searchfilter() {
    setfilter();
}

function setfilter() { //filterer objekter fra som ikke stemmer med søgningen
    var modulSearch = document.getElementById("modulS");
    console.log(modulSearch);
    var searchfilter_properties = document.getElementById("search").value.toLowerCase().toString().split(","); //finder det der står i søgningsboxen og splitter på "," så du kan søge efter flere ting
    var FFilter = jObjA.filter(function(json) { //jObjA bliver til json inden i filter funktionen som bliver gemt som FFilter
        if (searchfilter_properties[0] != "") { //hvis søgeboksen ikke er tom (her regner vi med at hvis den er tom så buger man de andre bokse i stedet)
            for (i = 0; i < searchfilter_properties.length; i++) { //itererer igennem søgefeltet (searchfilter_properties bliver længere når du skriver komma, på den måde kan siden tjekke alle elementer i søgningen)
                if (json.skole_id.toLowerCase().includes(searchfilter_properties[i]) || //hvis det man har skrevet passer med det der står i json.skole_id
                json.moduldata_id.includes(searchfilter_properties[i]) || //hvis det man har skrevet passer med det der står i json.moduldata_id
                json.region_id.toLowerCase().includes(searchfilter_properties[i]) || //hvis det man har skrevet passer med det der står i json.region_id 
                json.pladser.toString().match(searchfilter_properties[i]) || //hvis det man har skrevet passer med det der står i json.pladser
                json.reserverede_pladser.toString().match(searchfilter_properties[i]) || //hvis det man har skrevet passer med det der står i json.reserverede_pladser
                json.id.toString().match(searchfilter_properties[i]) && searchfilter_properties[i].includes(".") == false) { //hvis det man har skrevet passer med det der står i json.reserverede_pladser OG hvis der ikke er et "." ("." bliver brugt til modultal)                
                    if (i != searchfilter_properties.length - 1) {
                        continue
                    }
                    return json; //returnerer json til FFilter
                }
                break
            }                      
        }

        else if (searchfilter_properties[0] == "") {
            if (json.skole_id.toLowerCase().match(filter_properties[0]) && json.moduldata_id.match(filter_properties[1]) && json.region_id.match(filter_properties[2])) { //samme som ovenover bare anderledes
                return json;
            }  
        }       
        
    });
    newjObjA = FFilter;
    events(FFilter); //events() kører nu igennem med FFilters filtreret elementer i stedet for det gamle array
};
//searchfilter();         