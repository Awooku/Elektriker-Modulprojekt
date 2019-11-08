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
    //console.log(noEventLinje);
    //var noEventLinje = document.getElementsByClassName("eventLinje"); //fanger alle elementer som har klassen 'eventLinje'
    for (var d = 0; d < noEventLinje.length; d++) { //kører igennem hver element som har klassen .eventLinje (kører igennem hver uge)
        var eventCol = noEventLinje[d].children; //gemmer hver eventLinje's børn for at se hvilke klasser de har
        for (var d2 = 0; d2 < eventCol.length; d2++) { //kører igennem hver dag der er på ugen
            if (eventCol[d2].classList.length == 1 && eventCol[d2].classList != "tomdag" && eventCol[d2].parentElement.firstChild.classList != "dage" && eventCol[d2].parentElement.lastChild.classList == "dage") {
                //hvis det element loopet har én klasse (.dage eller .tomdag), 
                //og den klasse ikke er .tomdag (.dage), 
                //og forældreelementets første barn ikke er .dage ()
                //og forældreelementets sidste barn er .dage ()
                //dette fravælger alle elementer som ikke skal pilles ved, målet er at fjerne alle .dage klasser som kommer *efter* .eventAll, men skal ikke fjerne .dage klasser som kommer *før* .eventAll
                eventCol[d2].classList.replace("dage", "hide"); //fjern .dage
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
    jsonHandler(); //henter datoer der skal bruges
    events(); //henter indhold til kalenderen
    swapSheet('calendarHTML-Javascript-master/css/kalenderstyleKvartal.css'); //skifter css om til 3 måneders visning
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
    jsonHandler(); //henter datoer der skal bruges
    events(); //henter indhold til kalenderen
    swapSheet('calendarHTML-Javascript-master/css/kalenderstyle.css'); //skifter css om til årlig visning
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
    jsonHandler(); //henter datoer der skal bruges
    events(); //henter indhold til kalenderen
    swapSheet('calendarHTML-Javascript-master/css/kalenderstyleMåned.css'); //skifter css om til 1 månededs visning
}

//--------------------------------------------------------------------------------JSON--------------------------------------------------------------------------------->

//Tager en JSON fil og laver den til data som programmet skal kunne læse/opdatere
function jsonHandler() {
    var jText = '[{"id":5,"pladser":30,"startdato":"01/01/2019","slutdato":"16/01/2019","reserverede_pladser":15,"synlig":"ja","skole_id":"Skole 1","moduldata_id":"1.1","created_at":"2019-06-13 06:17:35","updated_at":"2019-06-13 06:17:35"},' +
               //'{"id":6,"pladser":30,"startdato":"21/01/2019","slutdato":"31/01/2019","reserverede_pladser":15,"synlig":"ja","skole_id":"Skole 2","moduldata_id":"1.2","created_at":"2019-06-13 06:17:35","updated_at":"2019-06-13 06:17:35"},' +
                 '{"id":7,"pladser":30,"startdato":"01/02/2019","slutdato":"28/02/2019","reserverede_pladser":15,"synlig":"ja","skole_id":"Skole 2","moduldata_id":"1.2","created_at":"2019-06-13 06:17:35","updated_at":"2019-06-13 06:17:35"},' +
                 '{"id":8,"pladser":30,"startdato":"01/03/2019","slutdato":"29/03/2019","reserverede_pladser":15,"synlig":"ja","skole_id":"Skole 2","moduldata_id":"1.3","created_at":"2019-06-13 06:17:35","updated_at":"2019-06-13 06:17:35"},' +
                 '{"id":9,"pladser":30,"startdato":"01/04/2019","slutdato":"30/04/2019","reserverede_pladser":15,"synlig":"ja","skole_id":"Skole 3","moduldata_id":"2.1","created_at":"2019-06-13 06:17:35","updated_at":"2019-06-13 06:17:35"},' + 
                '{"id":10,"pladser":30,"startdato":"01/05/2019","slutdato":"31/05/2019","reserverede_pladser":15,"synlig":"ja","skole_id":"Skole 3","moduldata_id":"2.2","created_at":"2019-06-13 06:17:35","updated_at":"2019-06-13 06:17:35"},' +
                '{"id":11,"pladser":30,"startdato":"03/06/2019","slutdato":"28/06/2019","reserverede_pladser":15,"synlig":"ja","skole_id":"Skole 4","moduldata_id":"3.1","created_at":"2019-06-13 06:17:35","updated_at":"2019-06-13 06:17:35"},' +
                '{"id":12,"pladser":30,"startdato":"01/02/2019","slutdato":"22/02/2019","reserverede_pladser":15,"synlig":"ja","skole_id":"Skole 4","moduldata_id":"2.3","created_at":"2019-06-13 06:17:35","updated_at":"2019-06-13 06:17:35"},' +
                '{"id":13,"pladser":30,"startdato":"09/10/2019","slutdato":"29/10/2019","reserverede_pladser":15,"synlig":"ja","skole_id":"Skole 7","moduldata_id":"2.3","created_at":"2019-06-13 06:17:35","updated_at":"2019-06-13 06:17:35"},' +
                '{"id":14,"pladser":30,"startdato":"01/11/2019","slutdato":"14/01/2020","reserverede_pladser":15,"synlig":"ja","skole_id":"Skole 7","moduldata_id":"2.3","created_at":"2019-06-13 06:17:35","updated_at":"2019-06-13 06:17:35"},' +
                '{"id":15,"pladser":30,"startdato":"29/11/2019","slutdato":"10/01/2020","reserverede_pladser":15,"synlig":"ja","skole_id":"Skole 1","moduldata_id":"1.1","created_at":"2019-06-13 06:17:35","updated_at":"2019-06-13 06:17:35"},' +
                '{"id":16,"pladser":30,"startdato":"02/12/2019","slutdato":"21/01/2021","reserverede_pladser":15,"synlig":"ja","skole_id":"Skole 7","moduldata_id":"2.3","created_at":"2019-06-13 06:17:35","updated_at":"2019-06-13 06:17:35"},' +
                '{"id":17,"pladser":30,"startdato":"04/12/2019","slutdato":"19/05/2021","reserverede_pladser":15,"synlig":"ja","skole_id":"Skole 7","moduldata_id":"2.3","created_at":"2019-06-13 06:17:35","updated_at":"2019-06-13 06:17:35"}]';

                /* 
                '{"id":14,"pladser":30,"startdato":"03/06/2020","slutdato":"30/06/2020","reserverede_pladser":15,"synlig":"ja","skole_id":"Skole 3","moduldata_id":"4.1","created_at":"2019-06-13 06:17:35","updated_at":"2019-06-13 06:17:35"}]';*/

    var jObj = JSON.parse(jText); //gør jText filen om til et JSON object
    if (text.length > 0) {
        //console.log("kage med is"); 
        for (t = 0; t < text.length; t++) {
            startdato[t] = text[t].startdato; //startdato bliver smidt ind i et array hver gang loopet kører
            slutdato[t] = text[t].slutdato; //gør det samme som ovenover men med slutdato
            synlig[t] = text[t].synlig; //det samme som ovenover men med synlig
            skoleID[t] = text[t].skole_id; //skole_id bliver smidt ind i et array hver gang loopet kører
            modultal[t] = text[t].moduldata_id; //moduldata_id bliver smidt ind i et array hver gang loopet kører
            eventID[t] = text[t].id; //id bliver smidt ind i et array hver gang loopet kører
        }
    }

    //Loopet kører for hvert modul der bliver sendt igennem
    for (j = t; j < jObj.length; j++) {
        jObjA[j] = jObj[j]; //gemmer det enkelte json object i et array hver gang for loopet kører

        var newSTDate = datesplitter(jObj[j].startdato);
        var newEDate = datesplitter(jObj[j].slutdato);

        slutdato[j] = newEDate;
        startdato[j] = newSTDate; //gør at den dato vi har fået fra newSTDate bliver en reel dato, og smider den ind i et array
        if (startdato[j] >= (currentYear + 1) + "-1-" + "1") { //hvis start dato er større eller lig med nuværende år + 1 - 1 + 1                                             <---- hvad fuck
            break;
        }
        else {   
            //var newSLDate = jObj[j].slutdato.split("/").reverse().join("-"); //gør det samme som ovenover
            //slutdato[j] = newSLDate;
            synlig[j] = jObj[j].synlig; //synlig bliver smidt ind i et array hver gang loopet kører
            skoleID[j] = jObj[j].skole_id; //skole_id bliver smidt ind i et array hver gang loopet kører
            modultal[j] = jObj[j].moduldata_id; //moduldata_id bliver smidt ind i et array hver gang loopet kører
            eventID[j] = jObjA[j].id; //id bliver smidt ind i et array hver gang loopet kører
        }
    }

    t = 0;
    text = [];
}

function displayJSON(e) { //viser information fra JSON objekt ud fra eventID
    var tdIDeventID = e.firstElementChild.className; //finder placerevents oldebarns klassenavn
    var aIDSplit = tdIDeventID.split("eventID"); //splitter på eventID så kun tallet er tilbage
    var IDSplit = parseInt(aIDSplit[1]); //aIDSplit er et array, her bliver den anden del [1] lavet om til en int og gemt i IDSplit    

    if (eventID.indexOf(IDSplit) != -1) { //hvis IDSplit findes i eventID
        for (var i = 0; i < eventID.length; i++) {
            if (eventID[i] == IDSplit) { //hvis IDSplit er det samme som det eventID loopet er nået til
                //dette skal en eller anden dag aktivere en pop op som viser data fra det event du har trykket på
                return(jObjA[i]);
            }
        }
    }
}

function datesplitter(dateToBeSplit) {
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

//---------------------------------------------------------------------------Events Handler---------------------------------------------------------------------------->

function events() {
    var startingDate = [], endingDate = [], currentYearsEvents = [], eventWOverflow = [], daysLeftWOverflow = [], startingODate = [], endingODate = [], daysLeft = []; //en masse arrays som nok måske skal bruges
    var y = 0, o = -1; //tællere

    for (i = 0; i < jObjA.length; i++) {
        var startSplitDate = datesplitter(jObjA[i].startdato); //splitter smider startdato i datesplitter()
        var endSplitDate = datesplitter(jObjA[i].slutdato);

        var startDateSplit = startSplitDate.split("-"); //splitter startdato op så det bliver til et array, så vi kan sammenligne årstallet
        var endDateSplit = endSplitDate.split("-"); //samme som ovenover bare med slutdato

        if (startDateSplit[0] == currentYear && endDateSplit[0] == currentYear) { //hvis det første element i den splittede startdato (år) er det samme som det nuværende år OG det samme i slutdatoen
            currentYearsEvents[i] = jObjA[i]; //smid de events i currentYearsEvents
        }

        if (startDateSplit[0] != endDateSplit[0]) { //hvis årstallet i den splittede startdato IKKE er det samme som årstallet i den splittede slutdato
            eventWOverflow[y] = jObjA[i]; //smid de events i eventWOverflow
            y++;
        }
    }

    for (i = 0; i < currentYearsEvents.length; i++) {
        startingDate[i] = new Date(startdato[i]); //startingDate[i] bliver til en dato
        endingDate[i] = new Date(slutdato[i]);
        daysLeft[i] = endingDate[i] - startingDate[i]; //trækker startdato fra slutdato så du får et langt underligt tal
        daysLeft[i] = (daysLeft[i] / (60*60*24*1000)); //markus's magiske udregning som ganger op og ned og til højre og venstre samt laver dig kaffe og speedrunner Super Mario Bros.
        daysLeft[i] = Math.floor(daysLeft[i]); //runder ned (alle tal bliver fra xx,00xxxxxxxx til xx)        
        var datesArray = getDateArray(startdato[i], slutdato[i]);

        o++;

        console.log(o)

        for (x = 0; x < datesArray.length; x++) {            
            datesArray[x].setHours(0, -datesArray[x].getTimezoneOffset(), 0, 0); //gør noget (stackoverflow siger "removing the timezone offset and 12 hours")
            datesArray[x] = datesArray[x].toISOString().split("T")[0]; //datoer bliver til en ISOString (yyyy-mm-ddThh:mm:ss), men bliver splittet på T så det bliver til et array, tager den første del arrayet
            datesArray[x] = datesArray[x].split("-0").join("-"); //har vi gjort før det kan i godt nu

            var eventPlacer = document.getElementById(datesArray[x]);
            var testnode1 = document.createTextNode(jObjA[o].id + " ");

            if (eventPlacer != null) {
                eventPlacer.appendChild(testnode1);
            }

            else if (eventPlacer == null) {
            }
        }
        //console.log("---------------------")
   }

   for (i = 0; i < eventWOverflow.length; i++) { //dette for loop gør det samme som ovenover, bare med eventWOverflow i stedet for currentYearsEvents
    
        var tempSDate = datesplitter(eventWOverflow[i].startdato);
        var tempEDate = datesplitter(eventWOverflow[i].slutdato);   
        startingODate[i] = new Date(tempSDate); //laver en dato ud af startingDateOverflow[i]
        endingODate[i] = new Date(tempEDate);   
        daysLeftWOverflow[i] = endingODate[i] - startingODate[i];
        daysLeftWOverflow[i] = (daysLeftWOverflow[i] / (60*60*24*1000));
        daysLeftWOverflow[i] = Math.floor(daysLeftWOverflow[i]);
        //console.log(eventWOverflow[i].id + " " + daysLeftWOverflow[i]); 

        var tempStart = [], tempEnd = [];
        tempStart[i] = tempSDate; //smider tempSDate i et array
        tempEnd[i] = tempEDate; //smider tempEDate i et array

        var datesArray = getDateArray(tempStart[i], tempEnd[i]);    
        
        o++;

        if (tempEnd[i].split("-")[0] == currentYear) { //hvis slutdatoen på event er det samme som viste år (kun events som slutter året efter nuværende år bliver smidt ind i overstående for loop),
            o = jObjA.length - eventWOverflow.length; //o = længden på arrayet jObjA minus længden på eventWOverflow.
            o = o + i;  //o = o plus det event vi er nået til
        } //dette if sørger for at events som kommer efter nuværende år bliver vist korrekt
        
        for (x = 0; x < datesArray.length; x++) {
            //TODO, fix placering af næste års event til at vise den rigtige eventID
            datesArray[x].setHours(0, -datesArray[x].getTimezoneOffset(), 0, 0);
            datesArray[x] = datesArray[x].toISOString().split("T")[0];
            datesArray[x] = datesArray[x].split("-0").join("-");   

            var eventPlacer = document.getElementById(datesArray[x]);
            var testnode1 = document.createTextNode(jObjA[o].id + " ");   

            //console.log(testnode1);

            if (eventPlacer != null) {
                eventPlacer.appendChild(testnode1);
            }   

            else if (eventPlacer == null) {
            }
        }
    }



   // var getDays = document.getElementsByClassName("dage");
//
   // for (i = 0; i < getDays.length; i++) { //laver +'er når der er mere end et event på en dag
   //     var HText = []; //laver et array        
   //     HText = getDays[i].innerText.split(" "); //splitter array (eventID) på " "
//
   //     if (HText.length > 1) { //hvis arrayet er større end 1 (hvis der bliver vist mere end et event på en dag)
//
   //         for (z = 0; z < HText.length; z++) { 
   //             getDays[i].innerText = getDays[i].innerText.replace(HText[z], " "); //finder datoen som loopet er nået til
   //         }
//
   //         getDays[i].innerText = "+" //erstatter text med + (for t vise at der er flere events på en dag)
   //     }
   // }
}


//bruges til at indsætte datoer i kalenderen, ud fra information sendt fra json
// function events() {
//     var c = 0, y = -1;
//     var startdate = [], slutdate = [], antaldage = [];
// //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//     var nextYear = [];


//     for (i = 0; i < startdato.length; i++) {
//         y++

//         var splitNextYearDate = jObjA[y].startdato.split("/").reverse().join("-");
//         splitNextYearDate = splitNextYearDate.split('-0').join('-');
//         var dateSplit = startdato[i].split("-");

//         if (dateSplit[0] > currentYear) {
//             nextYear[i] = startdato[i];
//         }

//         if (splitNextYearDate == nextYear[y]) {
//             nextYearsEvents = jObjA[y]

//             console.log(nextYearsEvents);
//        }

//     }

//     //for (i = 0; i < jObjA.length; i++) {
//     //    var splitDate = jObjA[i].startdato.split("/").reverse().join("-");
//     //    var yearDate = splitDate.split("-");
//     //} 

//     //console.log(nextYear[y]);
//     //console.log(jObjA[y]);
//     //console.log(yearDate[y]);

// //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



//     for (var J = j; J > 0; J--) {
//         c++;
//         if (c == 5) { //giver events forskellige farver så det er nemmere at kende forskel på forskellige events
//             c = 0; 
//         }

//         startdate[E] = new Date(startdato[E]); //laver startdatoen fra jsonfilen om til en dato
//         slutdate[E] = new Date(slutdato[E]); //laver slutdatoen fra jsonfilen om til en dato
//         var opdeltdato = startdato[E].split("-").map(Number); //laver startdato fra json filen om til array
//         //var opdeltslutdato = slutdato[E].split("-").map(Number); //laver slutdato fra json filen om til array
//         antaldage[E] = slutdate[E] - startdate[E]; //beregner hvor meget tid der er mellem start og slut datoen
//         antaldage[E] = (antaldage[E] / (60*60*24*1000)); //laver beregningen af antaldage om til et mindre tal og fjerner tid så der kun er dage tilbage
//         //tjekker om antaldage bliver et lige tal hvilket giver en dag for lidt
//         if (antaldage[E] - Math.floor(antaldage[E]) == 0) {
//             antaldage[E]++;
//         }
//         antaldage[E] = Math.ceil(antaldage[E]); //afrunder antaldage så der kun er hele dage
//         //}
//         /*if (!(document.getElementById(startdato[E]))) {
//             if (m == 1) {
//                 var samlet = 0;
//                 var opdeltmåned = currentMonth + 1;
//                 if (parseInt(opdeltdato[1]) > opdeltmåned) {

//                 }
//                 else if (parseInt(opdeltdato[1]) < opdeltmåned) {

//                     if (opdeltmåned - parseInt(opdeltdato[1]) == 1) {
//                         var daysInMonthEvent1 = 32 - new Date(currentYear, opdeltdato[1], 32).getDate(); //beregner hvor mange dage der er på dagværende måned
//                         samlet = daysInMonthEvent1 - opdeltdato[2];
//                     }
//                     else if (opdeltmåned - parseInt(opdeltdato[1]) == 2) {
//                         var daysInMonthEvent1 = 32 - new Date(currentYear, opdeltdato[1], 32).getDate(); //beregner hvor mange dage der er på dagværende måned
//                         var daysInMonthEvent2 = 32 - new Date(currentYear, opdeltdato[1] + 1, 32).getDate(); //beregner hvor mange dage der er på dagværende måned
//                         samlet = daysInMonthEvent1 + daysInMonthEvent2 - opdeltdato[2];
//                     }
//                     else if (opdeltmåned - parseInt(opdeltdato[1]) == 3) {
//                         var daysInMonthEvent1 = 32 - new Date(currentYear, opdeltdato[1], 32).getDate(); //beregner hvor mange dage der er på dagværende måned
//                         var daysInMonthEvent2 = 32 - new Date(currentYear, opdeltdato[1] + 1, 32).getDate(); //beregner hvor mange dage der er på daværende måned
//                         var daysInMonthEvent3 = 32 - new Date(currentYear, opdeltdato[1] + 2, 32).getDate(); //beregner hvor mange dage der er på daværende måned
//                         samlet = daysInMonthEvent1 + daysInMonthEvent2 + daysInMonthEvent3 - opdeltdato[2];
//                     }

//                     antaldage[E] = antaldage[E] - samlet;

//                     startdato[E] = currentYear.toString() + "-" + opdeltmåned.toString() + "-" + "1";
//                     opdeltdato = startdato[E].split("-").map(Number); //laver startdato fra json filen om til et array

//                     if (antaldage[E] <= 0) {
//                         startdato[E] = obj.slutdato;
//                         opdeltdato = startdato[E].split("-").map(Number); //laver startdato fra json filen om til array
//                     }
//                     else if (antaldage[E] > 0) {
//                         if (opdeltdato[2] == 1 && !(document.getElementById(startdato[E]))) {
//                             startdato[E] = opdeltdato[0].toString() + "-" + opdeltmåned.toString() + "-" + "2";
//                             opdeltdato = startdato[E].split("-").map(Number); //laver startdato fra json filen om til array
//                             antaldage[E]--;
//                         }
//                         if (opdeltdato[2] == 2 && !(document.getElementById(startdato[E]))) {
//                             startdato[E] = opdeltdato[0].toString() + "-" + opdeltmåned.toString() + "-" + "3";
//                             opdeltdato = startdato[E].split("-").map(Number); //laver startdato fra json filen om til array
//                             antaldage[E]--;
//                         }
//                     }
//                 }
//                 /*else if (opdeltdato[1] == currentMonth) {

//                 }

//                 else {

//                 }
//             }
//             else if (m == 3) {

//             }

//             else {
//                 if (opdeltdato[0] > currentYear) {

//                 }
//             }
//         }*/
//         //var sM = opdeltdato[2];

//         //console.log(jObjA[y].startdato);
//         ////console.log(startdato[E]);
//         //console.log(nextYear[y]);
//         //console.log("------------");



//        //console.log(splitNextYearDate);



//         var datocheck = document.getElementsByClassName("D" + startdato[E]); //får fat i et element med samme dato som startdato[E]
//         var nextYearDateCheck;
//         console.log(datocheck)

//         if (datocheck.length > 0) {
//             newDateCheck = datocheck;
//         }

//         else if (datocheck.length == 0) {
//             nextYearDateCheck = datocheck;
//         }

//         //console.log(newDateCheck);
//         //console.log(nextYearDateCheck);
       
// //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
       
       
//         /*da der ikke er nogle elementer i første side med klassenavn der indeholder 2020 (eller året efter det første viste år) bliver de events der skal bruges året efter ikke brugt
//           derfor kan programmet ikke bruge de overflødige datoer 

//         */

//         //var yearCheck = startdato;
//         //console.log(yearCheck);

//         //if (yearCheck[0] > currentYear) {
//             //console.log("ost");
//         //}

//         //console.log(startdato[E]); //viser IKKE events fra året efter
//         //console.log(startdato); //viser ALLE events
//         //console.log(nextYear); //viser dato på næste års event

// //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



//         //hvis der findes et element med en klasse som er det samme som datocheck
//         //så længe at antal dage er over nul
//         while (antaldage[E] > 0) {
//             //hvis datoen overgår den 12 måned eller på mystisk vis kommer før den første måned.
//             if (!(datocheck[0]) && (datomonth >= 12 || datomonth < 1) && antaldage[E] >= 0) {
//                 var SDN = (currentYear + 1) + "-1-" + "1"; //Erstatter startdatoen fra json stringen med en ny dato 
//                 //opretter et objekt som bruges til at få datoen til at kører videre end den nuværende visning.
//                 text = [
//                     {id: eventID[E], startdato: SDN, slutdato: slutdato[E], synlig: synlig[E], skole_id: skoleID[E], moduldata_id: modultal[E]}
//                 ];
//                 t++; //bruges til at tælle hvor mange objekter der er lavet.
//                 datocheck = document.getElementsByClassName("D" + startdato[E]); //opdaterer søgning efter et element der er det samme som startdato[E]
//                 //FIX!

                


//                 //console.log(text);
//                 break;
//             }
//             //checker om der kun er en row så den kan indsætte dataen der
            
//             else if (datocheck[0].rows.length == 1) {
//                 var ugefylde = datocheck[0].rows[0].cells.length; //checker hvor mange celler der er i nuværende row
//                 var placerevent = document.getElementById(startdato[E]); //bruges til at finde dagen med ID'en som matcher med startdato[E]
//                 var titel = document.createElement("span"); 
//                 var titelindhold = document.createTextNode(modultal[E] + " " + skoleID[E]); //indsætter teksts som består af modulnr og skolens initialer som modulet tilhører
//                 var datoday = opdeltdato[2]; //vælger dagen fra opdeltdato
//                 var datomonth = opdeltdato[1]; //vælger måneden fra opdeltdato
//                 var daysInMonth = 32 - new Date(opdeltdato[0], datomonth - 1, 32).getDate(); //beregner hvor mange dage der er i daværende måned                
//                 //kører så længe der er dage på den daværende uge og bliver kørt igennem indtil antaldage = 0
//                 for (var i = 0; i < ugefylde; i++) {
//                     var childNr = datocheck[0].children[0].children[i]; //finder cellen som den skal placere data i
//                     //var childNr2 = 
//                     //hvis der er lavet en celle som har et id der matcher med startdato[E]
//                     console.log(childNr.id);
//                     console.log(startdato[E]);
//                     if (childNr.id == startdato[E]) {
//                         //hvis antaldage bliver 0 eller mindre når den har kørt igennem en uge
//                         if (antaldage[E] - ugefylde < ugefylde && !(antaldage[E] >= 5)) {
//                             document.getElementById(startdato[E]).classList.add("eventAll" + c); //giver eventet en klasse som bruges til at holde styr på farvekodningen
//                             //var testdate = document.getElementById(startdato[E]);
//                             if (antaldage[E] == 1) {
//                                 document.getElementById(startdato[E]).classList.add("eventOneDay");
//                             }

//                             else if (antaldage[E] == 2) {
//                                 document.getElementById(startdato[E]).classList.add("eventTwoDay");
//                             }

//                             else if (antaldage[E] == 3) {
//                                 document.getElementById(startdato[E]).classList.add("eventThreeDay");
//                             }
                            
//                             else {
//                                 document.getElementById(startdato[E]).classList.add("eventFourDay");
//                             }                       
                            
//                             datoday = datoday + antaldage[E] - 1; //opdaterer datoday ud fra de resterende dage - 1
//                             antaldage[E] = 0; //antaldage laves om til 0
//                         }
//                         //til når eventet er på den sidste uge
//                         else if (ugefylde == 5 && antaldage[E] == 5) {
//                             antaldage[E] = antaldage[E] - (ugefylde-i); //ugespan tæller ned i forhold til ugen
//                             document.getElementById(startdato[E]).classList.add("eventAll" + c); //giver eventet en klasse som bruges til at holde styr på farvekodningen
//                             if (ugefylde - i == 1) {
//                                 document.getElementById(startdato[E]).classList.add("eventOneDay");
//                             }

//                             else if (ugefylde - i == 2) {
//                                 document.getElementById(startdato[E]).classList.add("eventTwoDay");
//                             }

//                             else if (ugefylde - i == 3) {
//                                 document.getElementById(startdato[E]).classList.add("eventThreeDay");
//                             }

//                             else if (ugefylde - i == 4) {
//                                 document.getElementById(startdato[E]).classList.add("eventFourDay");
//                             }
                            
//                             else {
//                                 document.getElementById(startdato[E]).classList.add("eventFiveDay");
//                             }

//                             datoday = datoday + (ugefylde-i); //giver datoday ekstra dage i forhold til resten af ugedagene + weekend
//                         }
//                         //hvis ugen i samme måned har 5 dage (AKA en normal uge)
//                         else if (ugefylde == 5) {
//                             antaldage[E] = antaldage[E] - ((ugefylde-i) + 2); //ugespan tæller ned i forhold til ugen
//                             document.getElementById(startdato[E]).classList.add("eventAll" + c); //giver eventet en klasse som bruges til at holde styr på farvekodningen
//                             if (ugefylde - i == 1) {
//                                 document.getElementById(startdato[E]).classList.add("eventOneDay");
//                             }

//                             else if (ugefylde - i == 2) {
//                                 document.getElementById(startdato[E]).classList.add("eventTwoDay");
//                             }

//                             else if (ugefylde - i == 3) {
//                                 document.getElementById(startdato[E]).classList.add("eventThreeDay");
//                             }

//                             else if (ugefylde - i == 4) {
//                                 document.getElementById(startdato[E]).classList.add("eventFourDay");
//                             }
                            
//                             else {
//                                 document.getElementById(startdato[E]).classList.add("eventFiveDay");
//                             }

//                             datoday = datoday + ((ugefylde-i) + 2); //giver datoday ekstra dage i forhold til resten af ugedagene + weekend
//                         }
//                         //hvis ugen i samme måned ikke har 5 dage, dette bruges når den sidste uge på måneden stopper midt på ugen for at skifte til næste måned.
//                         else { 
//                             antaldage[E] = antaldage[E] - (ugefylde - i); //antaldage tæller ned
//                             document.getElementById(startdato[E]).classList.add("eventAll" + c); //giver eventet en klasse som bruges til at holde styr på farvekodningen
//                             if (ugefylde - i == 1) {
//                                 document.getElementById(startdato[E]).classList.add("eventOneDay");
//                             }

//                             else if (ugefylde - i == 2) {
//                                 document.getElementById(startdato[E]).classList.add("eventTwoDay");
//                             }

//                             else if (ugefylde - i == 3) {
//                                 document.getElementById(startdato[E]).classList.add("eventThreeDay");
//                             }
                            
//                             else {
//                                 document.getElementById(startdato[E]).classList.add("eventFourDay");
//                             }                        
                            
//                             datoday = datoday + ((ugefylde-i) + 2); //giver datoday ekstra dage i forhold til resten af ugedagene + weekend
//                         }

//                         var nyrække = document.createElement("tr"); //laver en ny række for at kunne sætte ny data ind, så den ikke overskriver det nuværende data
//                         datocheck[0].appendChild(nyrække); //sætter den nye række ind i tabellen
//                         break;
//                     }

//                     /*else if (childNr.id == startdato[E]) { 

//                     }*/ //FIX!!!

//                 }
//                 /*if (antaldage[E] - ugefylde < ugefylde && !(antaldage[E] > 5)) {
//                     antaldage[E] = 0;
//                 }
//                 else {
//                     datoday = datoday + ((ugefylde-i) + 2); //giver datoday ekstra dage i forhold til resten af ugedagene + weekend
//                 }*/

//                 //skifter til næste måned hvis dagene i opdeltdato overstiger dage i måneden
//                 if (datoday > daysInMonth) {
//                     datomonth++;
//                     opdeltdato[1] = datomonth;
//                     datoday = 1;
//                 }               

//                 opdeltdato[2] = datoday; //opdaterer dagen der skal tages udgangspunkt i
//                 var datostring = opdeltdato[0].toString() + "-" + datomonth.toString() + "-" + datoday.toString(); //laver en dato i stringformat udfra de forhold den er kommet til
                
//                 /*//FIX
//                 if (datomonth >= opdeltslutdato[1] && datoday > opdeltslutdato[2]) {
//                     break;
//                 }*/

//                 startdato[E] = datostring; //erstatter startdatoen fra json stringen med den nye dato 
//                 datocheck = document.getElementsByClassName("D" + startdato[E]); //opdaterer søgning efter et element som matcher med startdato[E]
//                 placerevent.onclick = function(){displayJSON(this)}; //giver placerevent en "onclick" funktion som kalder på displayJSON
//                 placerevent.appendChild(titel);
//                 titel.appendChild(titelindhold);
//                 titel.classList.add("eventID" + eventID[E]); //giver titel på daværende event, en klasse som matcher med id'et på eventet

//                     //hvis dag 1 ikke findes i en måned skifter den over på dag 2
//                     if (datoday == 1 && !(document.getElementById(startdato[E]))) {
//                         datoday = 2;
//                         opdeltdato[2] = datoday; //opdaterer dagen der skal tage udgangspunkt i
//                         var datostring = opdeltdato[0].toString() + "-" + datomonth.toString() + "-" + datoday.toString(); //laver en dato i stringformat udfra de forhold den er kommet til
//                         startdato[E] = datostring; //erstatter startdatoen i json stringen med den nye dato 
//                         opdeltdato = startdato[E].split("-").map(Number); //laver startdato fra json filen om til array
//                         datocheck = document.getElementsByClassName("D" + startdato[E]); //opdaterer søgning efter et element der matcher med startdato[E]
//                     }
//                     //hvis dag 2 ikke findes i en måned skifter den over på dag 3
//                     if (datoday == 2 && !(document.getElementById(startdato[E]))) {
//                         datoday = 3;
//                         opdeltdato[2] = datoday; //opdaterer dagen der skal tage udgangspunkt i
//                         var datostring = opdeltdato[0].toString() + "-" + datomonth.toString() + "-" + datoday.toString(); //laver en dato i stringformat udfra de forhold den er kommet til
//                         startdato[E] = datostring; //erstatter startdatoen i json stringen med den nye dato 
//                         opdeltdato = startdato[E].split("-").map(Number); //laver startdato fra json filen om til array
//                         datocheck = document.getElementsByClassName("D" + startdato[E]); //opdaterer søgning efter et element der matcher med startdato[E]
//                     }

//                 sM = opdeltdato[2];
//             }      
//             //checker om der er flere rows, så den kan indsætte det næste event som kører samtidigt i en tæller
//             else if (datocheck[0].rows.length <= 2) {
//                 console.log(datocheck[0].rows.length);
//             }

//             /*else {

//             }*/
//         }
//         //checker om eventet er kørt til ende, så den skifter om til næste event
//         if (antaldage[E] == 0) {
//             E++;
//         }
//     }
//     removeDays(); //gør at der er plads til eventet på en uge
//}