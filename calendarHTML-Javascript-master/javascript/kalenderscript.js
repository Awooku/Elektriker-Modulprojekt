var today = new Date();
var currentMonth = today.getMonth();
var currentYear = today.getFullYear();
var helekalender = document.getElementById("helekalender")
var selectYear = document.getElementById("year");
var selectMonth = document.getElementById("month");

var week = ["Man", "Tir", "Ons", "Tor", "Fre"];
var months = ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"];

var monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);

//skift til næste måned
function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

//skift til forige måned
function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {
    
    var firstDay = (new Date(year, month)).getDay()-1;  //gør at første dag på ugen er en mandag i stedet for søndag
    var daysInMonth = 32 - new Date(year, month, 32).getDate();

    var tbl = document.getElementById("kalender-body"); // body of the calendar

    //var kalenderbox = document.createElement("div");
    //kalenderbox.className = "kalenderbox"; 
    
    tbl.innerHTML = "";                                 // fjerner celler, bruges når man trykker på previous/next
        
    monthAndYear.innerHTML = months[month] + " " + year;// filing data about month and in the page via DOM.
    selectYear.value = year;
    selectMonth.value = month;

    // skaber alle celler
    var date = 1;
    for (var i = 0; i < 6; i++) {

        // skaber en reækken med ugedage (man, tir, ons, osv.)
        if (i == 0) {
            var ugerow = document.createElement("tr");
            ugerow.className = "ugedagsliste";
            document.getElementById("kalender-body").appendChild(ugerow); // smider
        }

       for (var d = 0; d < 6; d++) {

            var ugenavn = week[d]; //var ugenavn = arrayet hvor navnene på ugedagene står

            if (i == 0 && d != 5) {
                var cell = document.createElement("td");                
                var cellText = document.createTextNode(ugenavn);
                cell.className = "ugedag";
                cell.appendChild(cellText);
                ugerow.appendChild(cell); // forklar marcus pls
            }

            else if (i == 0 && d == 5) {
                var row = document.createElement("tr");
                row.className = "liste"; //første række efter ugenavnene får klassen liste
            }

            else {
                var row = document.createElement("tr");
                row.className = "linje"; //resten af rækkerne kaldes for linje
                break;
            }
        }
        var ny = 0;  

        //skaber de individuelle celler og fylder dem med data
        for (var j = 0; j < 7; j++) {

            if (i === 0 && j < firstDay) {
                var cell = document.createElement("td");                
                var cellText = document.createTextNode("");
                cell.className = "tomdag"; //vi laver en td som kaldes for tomdag for at gøre det nemmere at fjerne dem i css
                cell.appendChild(cellText);
                row.appendChild(cell);
                ny++;
            }

            else if (ny == 5) {
                var cell = document.createElement("td");
                var cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-info");
                } // color today's date
                row.id = "tomx5"; //hvis 'var ny' bliver talt op på til 5 kalder vi den række for tomx5 så det bliver nemmere at fjerne i css

                date++;
                ny++;
            }

            else if (j == 5 || j == 6) {
                date++;
            }

            else if (date > daysInMonth) {
                break;
            }

            //opretter 
            else {
                var cell = document.createElement("td");
                var cellBox = document.createElement("div")    
                var cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-info");
                } // color today's date
                cell.className = "dag";
                cellBox.className = "dagbox";
                row.appendChild(cellBox);
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }
        }
        tbl.appendChild(row); // smider vær reække ind i kalenderen
    }
}

function show3(month, year) {
    showCalendar();
}