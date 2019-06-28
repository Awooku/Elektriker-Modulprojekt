//<Globals
var m = 0, k = 0, j = 0, E = 0;
var today = new Date();
var jObjA = [], eventID = [], startdato = [], slutdato = [], skoleID = [], modultal = [];
var currentMonth = today.getMonth();
var currentYear = today.getFullYear();
var week1 = new Date(today.getFullYear(), 0, 4);
var helekalender = document.getElementById("helekalender");
var weekdays = ["man", "tir", "ons", "tor", "fre", "lør", "søn"]; //Viser hvilken ugedag dagen tilhører i kalenderen
var months = ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"]; //Bruges til at vise hvilken måned man er på i kalenderen
var text = '{"startdato":"2019-4-1", "slutdato":"2019-11-8", "skole":"TEC", "modultal":"1.5"}'; //jsonfil format fra databasen som skal vise alle de events der kommer til at være der

//Globals End>

showyear(); //Starter programmet og starter på den årlige kalender form

//Skifter css når du trykker på en knap, hvis du bruger 1-månedsvisning skal stylen jo være anderledes end hvis du bruger 3-månedersvisning
function swapSheet(sheet){
    document.getElementById("stylesheetID").setAttribute("href", sheet); //finder et af de andre sylesheets og skifter det nuværende stylesheet til det andet.
}

//skift til de næste måneder
function next() {
    E = 0;
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

//skift til forige måneder
function previous() {
    E = 0;
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

function removeWeek() {
    var dvCol = document.getElementsByClassName("datoVisning"); //fanger alle klasser med klassenavnet datoVisning, og smider det i en var som hedder dvCol (datoVisningCollection)
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

function removeDays() { //fjerner .dage klasser som bliver placeret efter events da de skubber til vores event
    var noEventLinje = document.querySelectorAll(".eventLinje"); //fanger alle elementer som har klassen .eventLinje

    for (var d = 0; d < noEventLinje.length; d++) { //kører igennem hver element som har klassen .eventLinje (kører igennem hver uge)
        var eventCol = noEventLinje[d].children; //gemmer hver .eventLinje's børn for at se hvilke klasser de har

        for (var d2 = 0; d2 < eventCol.length; d2++) { //kører igennem hver dag der er på ugen
            if (eventCol[d2].classList.length == 1 && eventCol[d2].classList != "tomdag" && eventCol[d2].parentElement.firstChild.classList != "dage" && eventCol[d2].parentElement.lastChild.classList == "dage") {
//hvis det element loopet er nået til har én klasse (.dage eller .tomdag), 
//og den klasse ikke er .tomdag (.dage), 
//og dets forældreelement første barn ikke er .dage ()
//og dets forældreelement sidste barn er .dage ()
//dette fravælger alle elementer som ikke skal pilles ved, målet er at fjerne alle .dage klasser som kommer *efter* .eventAll, men skal ikke fjerne .dage klasser som kommer *før* .eventAll
                eventCol[d2].classList.remove("dage"); //fjern .dage
                eventCol[d2].classList.add("hide"); //tilføj .hide
            }
        }
    }
}

//Funktion der viser hele kalenderen fra nuværende måned (kan skifte måned med next eller previous funktionerne) og er også hovedfunktionen til kalenderen.
function showCalendar(month, year) {

    k++;
    var firstDay = (new Date(year, month)).getDay() -1;  //gør at første dag på ugen er en mandag i stedet for søndag
    var daysInMonth = 32 - new Date(year, month, 32).getDate(); //beregner hvor mange dage der er på nuværende måned

    var tbl = document.getElementById("kalender-body"); //Selve kalenderdelen

    document.getElementById("årstal").innerHTML = year; //viser året på toppen af kalenderen
    var monthDiv = document.createElement("div");  //Laver monthDiv 
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
    showMonth.id = "monthAndYear" + k; 
    document.getElementById("månedDiv" + k).appendChild(showMonth); //sætter rækkerne ind i kalender-body

    document.getElementById("monthAndYear" + k).innerHTML = months[month] + " " + year; //Gør at du kan se måneder og år
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
                date++;
            }

            //Gør at lørdag og søndag ikke tæller med
            else if (j == 5 || j == 6) {
                var cellend = document.createElement("td");
                cellend.id = currentYear + "-" + (currentMonth + 1) + "-" + date; //giver celler et ID ud fra dato
                cellend.className = "weekend";
                date++; //tæller en dag op
            }

            //Bryder ud af loopet hvis dage overstiger hvad der er på en måned
            else if (date > daysInMonth) {
                break;
            }

            //Opretter de resterende celler og indsætter numre i forhold til datoen
            else {
                var cell = document.createElement("td");
                var cellBox = document.createElement("div"); //Bruges til at kunne flytte data fra en box til en anden
                var dagcell = document.createElement("th");  //Bruges til at vise datoen
                var cellText = document.createTextNode(date);
                cellBox.classList.add("dagbox");
                dagcell.classList.add("dageTop");
                cell.id = currentYear + "-" + (currentMonth + 1) + "-" + date; //Giver cellerne datoen for dagen

                //bruges til at give tableheads'ne en klasse ud fra datoen og gør dem Json venlig
                if (currentMonth + 1 < 10 && date < 10 && currentMonth + 1  > 0 && date > 0) {
                    dagcell.classList.add(currentYear + "-0" + (currentMonth + 1) + "-0" + date);
                }
                //hvis måned er 1+ eller over og date er mindre end 10
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
                var weekNumber = currentYear + "-" + (currentMonth + 1) + "-" + date; //bruges til at beregne hvilket ugenummer der er
                var weekNrDate = new Date(weekNumber); //laver det om til en dato for at kunne beregne ud fra datoerne i kalenderen

                //checker om der kun er en dag på ugen
                if (tablebody.rows[0].cells.length == 1) { 
                    ugetable.classList = "Uge" + (showweek + 1);
                }

                var showweek = 1 + Math.round(((weekNrDate.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7 ); //beregner ugenummer

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
    var tbl = document.getElementById("kalender-body"); // Selve kalenderdelen
    tbl.innerHTML = ""; // fjerner celler. Bruges når man trykker på previous/next eller skifter viewtype

    // checker om den allerede er inde i funktionen
    if (m != 3) {
        currentMonth = today.getMonth(); // gør at man starter på nuværende måned
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
        currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear; //beregner nuværende år ud fra nuværende måned
        currentMonth = (currentMonth + 1) % 12; //beregner nuværende måned
    }

    // Sørger for at man også kan gå tilbage i kalenderen
    while(gange <= 3, gange--) {
        currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear; //beregner nuværende år ud fra nuværende måned
        currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1; //beregner nuværende måned
    }
    k = 0; // bruges til at insætte måneder i div tags
    events();
    swapSheet('calendarHTML-Javascript-master/css/kalenderstyleKvartal.css');
}

//Viser hele år
function showyear() {
    var tbl = document.getElementById("kalender-body"); // Selve kalenderdelen
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
        currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear; //beregner nuværende år ud fra nuværende måned
        currentMonth = (currentMonth + 1) % 12; //beregner nuværende måned
    }

    // Sørger for at man også kan gå tilbage i kalenderen
    while (gange <= 12, gange--) {
        currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear; //beregner nuværende år ud fra nuværende måned
        currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1; //beregner nuværende måned
    }
    k = 0; // bruges til at insætte måneder i div tags
    jsonHandler();
    events();
    swapSheet('calendarHTML-Javascript-master/css/kalenderstyle.css');
}

//Viser en måned ad gangen
function showmonth() {
    var tbl = document.getElementById("kalender-body"); // Selve kalender delen
    tbl.innerHTML = ""; // fjerner celler, bruges når man trykker på previous/next eller skifter viewtype

    // checker om den allerede er inde i funktionen
    if (m != 1) {
        currentMonth = today.getMonth(); // gør at man starter på nuværende måned
        currentYear = today.getFullYear();  // gør at man er i nuværende år
    }

    m = 1;  // bruges i next og previous

    showCalendar(currentMonth, currentYear);
    m = 1;  // bruges i next og previous 
    k = 0;  // bruges til at insætte måneder i div tags
    events();
    swapSheet('calendarHTML-Javascript-master/css/kalenderstyleMåned.css');
}

//--------------------------------------------------------------------------------JSON--------------------------------------------------------------------------------->

function jsonHandler() {
    var jText = '[{"id":5,"pladser":30,"startdato":"31/10/2019","slutdato":"25/12/2019","reserverede_pladser":15,"synlig":"ja","skole_id":"Skole 1","moduldata_id":"1.1","created_at":"2019-06-13 06:17:35","updated_at":"2019-06-13 06:17:35"},' +
                 '{"id":6,"pladser":30,"startdato":"01/01/2019","slutdato":"31/01/2019","reserverede_pladser":15,"synlig":"ja","skole_id":"Skole 1","moduldata_id":"1.1","created_at":"2019-06-13 06:17:35","updated_at":"2019-06-13 06:17:35"},' +
                 '{"id":7,"pladser":30,"startdato":"01/02/2019","slutdato":"28/02/2019","reserverede_pladser":15,"synlig":"ja","skole_id":"Skole 2","moduldata_id":"1.2","created_at":"2019-06-13 06:17:35","updated_at":"2019-06-13 06:17:35"},' +
                 '{"id":8,"pladser":30,"startdato":"01/03/2019","slutdato":"29/03/2019","reserverede_pladser":15,"synlig":"ja","skole_id":"Skole 2","moduldata_id":"1.3","created_at":"2019-06-13 06:17:35","updated_at":"2019-06-13 06:17:35"},' +
                 '{"id":9,"pladser":30,"startdato":"01/04/2019","slutdato":"30/04/2019","reserverede_pladser":15,"synlig":"ja","skole_id":"Skole 3","moduldata_id":"2.1","created_at":"2019-06-13 06:17:35","updated_at":"2019-06-13 06:17:35"},' + 
                '{"id":10,"pladser":30,"startdato":"01/05/2019","slutdato":"31/05/2019","reserverede_pladser":15,"synlig":"ja","skole_id":"Skole 3","moduldata_id":"2.2","created_at":"2019-06-13 06:17:35","updated_at":"2019-06-13 06:17:35"},' +
                '{"id":11,"pladser":30,"startdato":"03/06/2019","slutdato":"31/06/2019","reserverede_pladser":15,"synlig":"ja","skole_id":"Skole 4","moduldata_id":"3.1","created_at":"2019-06-13 06:17:35","updated_at":"2019-06-13 06:17:35"}]';

    var jObj = JSON.parse(jText); //gør jText filen om til et JSON object

   /*function datesort(a, b) {
        return new Date(a.startdato).getTime() - new Date(b.startdato).getTime();
    }
    console.log(jObj);
    jObj.sort(datesort);*/


    //var skoler = ["Skole 1", "Skole 2", "Skole 3", "Skole 4"];

    //Loopet kører igennem for hvert modul der bliver sendt igennem
    for (j = 0; j < jObj.length; j++) {

        jObjA[j] = jObj[j]; //gemmer det enkelte json object i et array hver gang for loopet kører

        var newSTDate = jObj[j].startdato.split("/").reverse().join("-"); //eksempel: 31/12/2019 bilver splittet så den ligner 31 12 2019, bliver reverset til 2019 12 31 og bliver til 2019-12-31 på join("-")
        newSTDate = newSTDate.split('-0').join('-');
        startdato[j] = newSTDate; //gør at den dato vi har fået fra newSTDate bliver en reel dato, og smider den ind i et array
    
        var newSLDate = jObj[j].slutdato.split("/").reverse().join("-"); //gør det samme som ovenover
        slutdato[j] = newSLDate;

        skoleID[j] = jObj[j].skole_id; //skole_id bliver smidt ind i et array hver gang loopet kører
        modultal[j] = jObj[j].moduldata_id; //moduldata_id bliver smidt ind i et array hver gang loopet kører
        eventID[j] = jObjA[j].id; //id bliver smidt ind i et array hver gang loopet kører
    }
    //console.log(lokalID[1])
}

//---------------------------------------------------------------------------Events Handler---------------------------------------------------------------------------->

function events() {
    var c = 0;
    var startdate = [];
    var slutdate = [];
    var antaldage = [];
    for (j = j; j > 0; j--) {
        c++;
        //console.log(c);
        if (c == 5) {
            c = 0;

        }

        startdate[E] = new Date(startdato[E]); //laver startdatoen fra jsonfilen om til en dato
        slutdate[E] = new Date(slutdato[E]); //laver slutdatoen fra jsonfilen om til en dato
        var opdeltdato = startdato[E].split("-").map(Number); //laver startdato fra json filen om til array
        var opdeltslutdato = slutdato[E].split("-").map(Number); //laver slutdato fra json filen om til array
        antaldage[E] = slutdate[E] - startdate[E]; //beregner hvor meget tid der er mellem start og slut datoen
        antaldage[E] = (antaldage[E] / (60*60*24*1000)); //laver beregningen af antaldage om til et mindre tal og fjerner tid så der kun er dage tilbage
        if (antaldage[E] - Math.floor(antaldage[E]) == 0) {
            antaldage[E]++;
        }
        antaldage[E] = Math.ceil(antaldage[E]); //afrunder antaldage så der kun er hele dage
        //console.log(antaldage[E]);
        //}
        /*if (!(document.getElementById(startdato[E]))) {
            if (m == 1) {
                var samlet = 0;
                var opdeltmåned = currentMonth + 1;
                if (parseInt(opdeltdato[1]) > opdeltmåned) {

                }
                else if (parseInt(opdeltdato[1]) < opdeltmåned) {

                    if (opdeltmåned - parseInt(opdeltdato[1]) == 1) {
                        var daysInMonthEvent1 = 32 - new Date(currentYear, opdeltdato[1], 32).getDate(); //beregner hvor mange dage der er på dagværende måned
                        samlet = daysInMonthEvent1 - opdeltdato[2];
                    }
                    else if (opdeltmåned - parseInt(opdeltdato[1]) == 2) {
                        var daysInMonthEvent1 = 32 - new Date(currentYear, opdeltdato[1], 32).getDate(); //beregner hvor mange dage der er på dagværende måned
                        var daysInMonthEvent2 = 32 - new Date(currentYear, opdeltdato[1] + 1, 32).getDate(); //beregner hvor mange dage der er på dagværende måned
                        samlet = daysInMonthEvent1 + daysInMonthEvent2 - opdeltdato[2];
                    }
                    else if (opdeltmåned - parseInt(opdeltdato[1]) == 3) {
                        var daysInMonthEvent1 = 32 - new Date(currentYear, opdeltdato[1], 32).getDate(); //beregner hvor mange dage der er på dagværende måned
                        var daysInMonthEvent2 = 32 - new Date(currentYear, opdeltdato[1] + 1, 32).getDate(); //beregner hvor mange dage der er på daværende måned
                        var daysInMonthEvent3 = 32 - new Date(currentYear, opdeltdato[1] + 2, 32).getDate(); //beregner hvor mange dage der er på daværende måned
                        samlet = daysInMonthEvent1 + daysInMonthEvent2 + daysInMonthEvent3 - opdeltdato[2];
                    }

                    antaldage[E] = antaldage[E] - samlet;

                    startdato[E] = currentYear.toString() + "-" + opdeltmåned.toString() + "-" + "1";
                    opdeltdato = startdato[E].split("-").map(Number); //laver startdato fra json filen om til et array

                    if (antaldage[E] <= 0) {
                        startdato[E] = obj.slutdato;
                        opdeltdato = startdato[E].split("-").map(Number); //laver startdato fra json filen om til array
                    }
                    else if (antaldage[E] > 0) {
                        if (opdeltdato[2] == 1 && !(document.getElementById(startdato[E]))) {
                            startdato[E] = opdeltdato[0].toString() + "-" + opdeltmåned.toString() + "-" + "2";
                            opdeltdato = startdato[E].split("-").map(Number); //laver startdato fra json filen om til array
                            antaldage[E]--;
                        }
                        if (opdeltdato[2] == 2 && !(document.getElementById(startdato[E]))) {
                            startdato[E] = opdeltdato[0].toString() + "-" + opdeltmåned.toString() + "-" + "3";
                            opdeltdato = startdato[E].split("-").map(Number); //laver startdato fra json filen om til array
                            antaldage[E]--;
                        }
                    }
                }

                /*else if (opdeltdato[1] == currentMonth) {

                }

                else {

                }
            }

            else if (m == 3) {

            }

            else {
                if (opdeltdato[0] > currentYear) {

                }
            }
        }*/
        var sM = opdeltdato[2];
        var datocheck = document.getElementsByClassName("D" + startdato[E]);
        //hvis der findes et element med en klasse som er det samme som datocheck
            
        //så længe at antal dage er over nul
        //console.log(antaldage[E]);
        while (antaldage[E] > 0) {
            //hvis datoen overgår den 12 måned eller på mystisk vis kommer før den første måned. 
            if (!(datocheck[0]) && (datomonth >= 12 || datomonth < 1) && antaldage[E] >= 0) {
                //FIX
                break;
            }

            //checker om der kun er en row så den kan indsætte dataen der
            else if (datocheck[0].rows.length == 1) {
                //console.log(antaldage[E]);
                var ugefylde = datocheck[0].rows[0].cells.length; //checker hvor mange celler der er i nuværende row
                var placerevent = document.getElementById(startdato[E]); //bruges til at finde dagen med id'et som er det samme som startdato[E]
                var event = document.createElement("a"); 
                var content = document.createElement("div");
                var titel = document.createElement("span"); 
                var titelindhold = document.createTextNode(modultal[E] + " " + skoleID[E]); //indsætter teksten som er modulnr og den skoles inicialer som modulet tilhører
                var datoday = opdeltdato[2]; //vælger dagen fra opdeltdato
                var datomonth = opdeltdato[1]; //vælger måneden fra opdeltdato
                var daysInMonth = 32 - new Date(opdeltdato[0], datomonth - 1, 32).getDate(); //beregner hvor mange dage der er i daværende måned
                
                //kører så længe der er dage på den daværende uge og bliver kørt igennem indtil antaldage = 0
                for (var i = 0; i < ugefylde; i++) {
                    var childNr = datocheck[0].children[0].children[i]; //finder cellen som den skal placere data i
                    //hvis der er lavet en celle som har et id der matcher med startdato[E]
                    console.log(childNr.id);
                    if (childNr.id == startdato[E]) {
                        //hvis antaldage bliver 0 eller mindre når den har kørt igennem en uge
                        if (antaldage[E] - ugefylde < ugefylde && !(antaldage[E] >= 5)) {
                            //document.getElementById(startdato[E]).colSpan = antaldage[E]; //giver colspan i forhold til resterende antaldage
                            document.getElementById(startdato[E]).classList.add("eventAll" + c);
                            //var testdate = document.getElementById(startdato[E])
                            
                            if (antaldage[E] == 1) {
                                document.getElementById(startdato[E]).classList.add("eventOneDay");
                            }

                            else if (antaldage[E] == 2) {
                                document.getElementById(startdato[E]).classList.add("eventTwoDay");
                            }

                            else if (antaldage[E] == 3) {
                                document.getElementById(startdato[E]).classList.add("eventThreeDay");
                            }
                            
                            else {
                                document.getElementById(startdato[E]).classList.add("eventFourDay");
                            }

                            document.getElementById(startdato[E]).classList.remove("dage");
                            document.getElementById(startdato[E]).classList.add("dage");                        
                            
                            datoday = datoday + antaldage[E] - 1;
                            antaldage[E] = 0; //antaldage laves om til 0
                        } 
                        
                        //hvis ugen i samme måned har 5 dage
                        else if (ugefylde == 5) {
                            antaldage[E] = antaldage[E] - ((ugefylde-i) + 2); //ugespan tæller ned i forhold til ugen
                            //document.getElementById(startdato[E]).colSpan = ugefylde - i; //giver en colspan i forhold til ugen
                            document.getElementById(startdato[E]).classList.add("eventAll" + c);
                            if (ugefylde - i == 1) {

                                document.getElementById(startdato[E]).classList.add("eventOneDay");
                            }

                            else if (ugefylde - i == 2) {
                                document.getElementById(startdato[E]).classList.add("eventTwoDay");
                            }

                            else if (ugefylde - i == 3) {
                                document.getElementById(startdato[E]).classList.add("eventThreeDay");
                            }

                            else if (ugefylde - i == 4) {
                                document.getElementById(startdato[E]).classList.add("eventFourDay");
                            }
                            
                            else {
                                document.getElementById(startdato[E]).classList.add("eventFiveDay");
                            }

                            document.getElementById(startdato[E]).classList.remove("dage");
                            document.getElementById(startdato[E]).classList.add("dage");

                            datoday = datoday + ((ugefylde-i) + 2); //giver datoday ekstra dage i forhold til resten af ugedagene + weekend
                        }
                        
                        //hvis ugen i samme måned ikke har 5 dage, dette bruges når den sidste uge på måneden stopper midt på ugen for at skifte til næste måned.
                        else { 
                            antaldage[E] = antaldage[E] - ugefylde; //antaldage tæller ned
                            //document.getElementById(startdato[E]).colSpan = ugefylde - i; //giver en colspan på antal dage på ugen i samme måned
                            document.getElementById(startdato[E]).classList.add("eventAll" + c);
                            
                            if (ugefylde - i == 1) {
                                document.getElementById(startdato[E]).classList.add("eventOneDay");
                            }

                            else if (ugefylde - i == 2) {
                                document.getElementById(startdato[E]).classList.add("eventTwoDay");
                            }

                            else if (ugefylde - i == 3) {
                                document.getElementById(startdato[E]).classList.add("eventThreeDay");
                            }
                            
                            else {
                                document.getElementById(startdato[E]).classList.add("eventFourDay");
                            }
                            
                            document.getElementById(startdato[E]).classList.remove("dage");
                            document.getElementById(startdato[E]).classList.add("dage");
                            
                            datoday = datoday + ((ugefylde-i) + 2); //giver datoday ekstra dage i forhold til resten af ugedagene + weekend
                        }

                        var nyrække = document.createElement("tr"); //laver en ny række for at kunne sætte ny data ind så den ikke overskriver det nuværende data
                        datocheck[0].appendChild(nyrække); //sætter den nye række ind i tabellen
                        break;
                    }

                }
                
                /*if (antaldage[E] - ugefylde < ugefylde && !(antaldage[E] > 5)) {
                    console.log(datoday);

                    antaldage[E] = 0;
                }
                else {
                    datoday = datoday + ((ugefylde-i) + 2); //giver datoday ekstra dage i forhold til resten af ugedagene + weekend
                }*/

                //skifter til næste måned hvis dagene i opdeltdato overstiger dage i måneden
                if (datoday > daysInMonth) {
                    datomonth++;
                    opdeltdato[1] = datomonth;
                    datoday = 1;
                }               

                opdeltdato[2] = datoday; //opdaterer dagen der skal tages udgangspunkt i
                var datostring = opdeltdato[0].toString() + "-" + datomonth.toString() + "-" + datoday.toString(); //laver en dato i stringformat udfra de forhold den er kommet til
                
                /*//FIX
                if (datomonth >= opdeltslutdato[1] && datoday > opdeltslutdato[2]) {
                    //console.log("kage");
                    break;
                }*/

                startdato[E] = datostring; //erstatter startdatoen i json stringen med den nye dato 
                datocheck = document.getElementsByClassName("D" + startdato[E]);
                placerevent.appendChild(event);
                event.appendChild(content);
                content.appendChild(titel);
                titel.appendChild(titelindhold);

                    //hvis dag 1 ikke findes i en måned skifter den over på dag 2
                    if (datoday == 1 && !(document.getElementById(startdato[E]))) {
                        datoday = 2;
                        opdeltdato[2] = datoday; //opdaterer dagen der skal tage udgangspunkt i
                        var datostring = opdeltdato[0].toString() + "-" + datomonth.toString() + "-" + datoday.toString(); //laver en dato i stringformat udfra de forhold den er kommet til
                        startdato[E] = datostring; //erstatter startdatoen i json stringen med den nye dato 
                        opdeltdato = startdato[E].split("-").map(Number); //laver startdato fra json filen om til array
                        datocheck = document.getElementsByClassName("D" + startdato[E]);
                    }
                    //hvis dag 2 ikke findes i en måned skifter den over på dag 3
                    if (datoday == 2 && !(document.getElementById(startdato[E]))) {
                        datoday = 3;
                        opdeltdato[2] = datoday; //opdaterer dagen der skal tage udgangspunkt i
                        var datostring = opdeltdato[0].toString() + "-" + datomonth.toString() + "-" + datoday.toString(); //laver en dato i stringformat udfra de forhold den er kommet til
                        startdato[E] = datostring; //erstatter startdatoen i json stringen med den nye dato 
                        opdeltdato = startdato[E].split("-").map(Number); //laver startdato fra json filen om til array
                        datocheck = document.getElementsByClassName("D" + startdato[E]);
                    }

                sM = opdeltdato[2];
            }       

            else if (datocheck[0].rows.length <= 2) {

            }

            /*else {

            }*/

        }
        //console.log(antaldage[E]);
        if (antaldage[E] == 0) {
            E++;
        }
    }
    removeDays();
}