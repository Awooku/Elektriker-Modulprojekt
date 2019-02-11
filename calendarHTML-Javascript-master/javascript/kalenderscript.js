var today = new Date();
var currentMonth = today.getMonth();
var currentYear = today.getFullYear();
var selectYear = document.getElementById("year");
var selectMonth = document.getElementById("month");


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

    var tbl = document.getElementById("calendar-body"); // body of the calendar

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

        //creating individual cells, filing them up with data.
        for (var j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                var cell = document.createElement("td");
                var cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }

            else if (date > daysInMonth) {
                break;
            }

            else {
                var cell = document.createElement("td");
                var cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-info");
                } // color today's date
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }
        }
        tbl.appendChild(row); // appending each row into calendar body.
    }
}