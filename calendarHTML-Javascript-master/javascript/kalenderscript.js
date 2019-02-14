var today = new Date();
var currentMonth = today.getMonth();
var currentYear = today.getFullYear();
var helekalender =document.getElementById("helekalender")
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
    
    var firstDay = (new Date(year, month)).getDay()-1; //gør at første dag på ugen er en mandag i stedet for søndag
    var daysInMonth = 32 - new Date(year, month, 32).getDate();

    var tbl = document.getElementById("kalender-body"); // body of the calendar

    var kalenderbox = document.createElement("div");
    kalenderbox.className = "kalenderbox";

    // clearing all previous cells
    tbl.innerHTML = "";
    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    var date = 1;
    for (var i = 0; i < 6; i++) {
        // creates a table row
        var row = document.createElement("tr");

       /*for (d = 0; d < 6; d++) {

            var ugenavn = week[d]; 

            if (i == 0 && d != 5) {
                var cell = document.createElement("td");                
                var cellText = document.createTextNode(ugenavn);
                cell.className = "ugedag";
                cell.appendChild(cellText);
                row.appendChild(cell);
            }

            else if (i == 0 && d == 5) {
                var row = document.createElement("tr");
            }

            else {
                break;
            }
        }*/

        //creating individual cells, filing them up with data.
        for (var j = 0; j < 7; j++) {

            if (i === 0 && j < firstDay) {
                var ny = 0                
                var cell = document.createElement("td");
                var cellBox = document.createElement("td")                
                var cellText = document.createTextNode("");
                cell.className = "tomdag";
                cellBox.className = "dagbox";
                row.appendChild(cellBox);
                cell.appendChild(cellText);
                row.appendChild(cell);
                ny++;
            }

            else if (i === 0 && ny == 5) {
                var j = 0;
                var dag1 = getElementByClassName("tomdag")[ny];
                var dag2 = getElementByClassName("tomdag")[ny - 1];
                var dag3 = getElementByClassName("tomdag")[ny - 2];
                var dag4 = getElementByClassName("tomdag")[ny - 3];
                var dag5 = getElementByClassName("tomdag")[ny - 4];
                dag1.parentNode.removeChild(dag1);
                dag2.parentNode.removeChild(dag2);
                dag3.parentNode.removeChild(dag3);
                dag4.parentNode.removeChild(dag4);
                dag5.parentNode.removeChild(dag5);
                var cell = document.createElement("td");
                var cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-info");
                } // color today's date
                cell.appendChild(cellText);
                cell.className = "tomdag";
                row.appendChild(cell);
                date++;
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
                var cellBox = document.createElement("td")    
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
        tbl.appendChild(row); // appending each row into calendar body.
    }
}

/*
function show3(month, year) {
    
    var firstDay = (new Date(year, month)).getDay()-1; //gør at første dag på ugen er en mandag i stedet for søndag
    var daysInMonth = 32 - new Date(year, month, 32).getDate();

    var tbl = document.getElementById("kalender-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";
    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;
    
    // creating all cells
    var date = 1;

    for (var m = 0; m < 3; m++) {

        var kalenderbox = document.createElement("div");
        kalenderbox.className = "kalenderbox";

        for (var i = 0; i < 6; i++) {
            // creates a table row
            var row = document.createElement("tr");

            //creating individual cells, filing them up with data.
            for (var j = 0; j < 7; j++) {

                var ugenavn = week[j]; 

                if (j == 5 || j == 6) {
                    date++;
                }

                else if (i === 0) {
                    var cell = document.createElement("td");                
                    var cellText = document.createTextNode(ugenavn);
                    cell.className = "ugedag";
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                }

                else if (i === 1 && j < firstDay) {
                    var cell = document.createElement("td");                
                    var cellText = document.createTextNode("");
                    cell.className = "dag";
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                }

                else if (date > daysInMonth) {
                    break;
                }

                //opretter 
                else {
                    var cell = document.createElement("td");
                    var cellText = document.createTextNode(date);
                    if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                        cell.classList.add("bg-info");
                    } // color today's date
                    cell.appendChild(cellText);
                    cell.className = "dag";
                    row.appendChild(cell);
                    date++;
                }
            }
            tbl.appendChild(row); // appending each row into calendar body.
        }
    }
}*/