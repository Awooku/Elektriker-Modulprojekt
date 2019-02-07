//gør diver draggable
$( function() {
    $( "#draggable" ).draggable({ helper: "original" });
    $( "#draggable2" ).draggable({ opacity: 0.7, helper: "clone" });
    $( "#draggable3" ).draggable({
      cursor: "move",
      cursorAt: { top: -12, left: -20 },
      helper: function( event ) {
        return $( "<div class='ui-widget-header'>I'm a custom helper</div>" );
      }
    });
    $( "#set div" ).draggable({ stack: "#set div" });
  } );

//bøffet fra internettet

// This script is released to the public domain and may be used, modified and
// distributed without restrictions. Attribution not necessary but appreciated.
// Source: https://weeknumber.net/how-to/javascript

// Returns the ISO week of the date.
Date.prototype.getWeek = function() {
  var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                        - 3 + (week1.getDay() + 6) % 7) / 7);
}

// Returns the four-digit year corresponding to the ISO week of the date.
Date.prototype.getWeekYear = function() {
  var date = new Date(this.getTime());
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  return date.getFullYear();
}

//weeknumber ting er slut 

var displayYear = document.write(new Date().getFullYear())

//cdiv = calendar div
var cdiv =
'<div class="Calendarbox" id="cbox"></div>';
document.getElementById("body").innerHTML = cdiv;

//year div
var ydiv =
'<div class="Yearbox" id="ybox">' +
  '<span id="showDate"></span>'
'</div>';
document.getElementById("cbox").innerHTML = ydiv;

//quarter divs
var quarters = ["QuarterboxFirst", "QuarterboxSecond", "QuarterboxThird", "QuarterboxFourth"];
var months = ["MonthboxFirst", "MonthboxSecond", "MonthboxThird"];
var q1months = ["januar", "februar", "marts"];
var q2months = ["april", "maj", "juni"];
var q3months = ["juli", "august", "september"];
var q4months = ["oktober", "november", "december"];
var days = ["DayboxFirst", "DayboxSecond", "DayboxThird", "DayboxFourth", "DayboxFifth"];


//loop som laver fire divs inden i diven med ybox ID
for(x=0; x<4;x++) {
  var addQDivs = document.createElement('div');
  document.getElementById('ybox').appendChild(addQDivs);
}

//loop som tilføjer de klasser som står i quarters til diverne som står i diven med klassen Yearbox
var sQDivs = document.querySelectorAll(".Yearbox > div");
for (var i = 0; i < sQDivs.length; i++) {
  sQDivs[i].classList.add(quarters[i]);
  sQDivs[i].classList.add("QuarterBox")
  sQDivs[i].id = "qbox"+[i+1];
  document.getElementById("qbox"+[i+1]).innerHTML = "Q"+[i+1];
}

//måneder
for(x=0; x<4;x++) {
  var addMDivs = document.createElement('div');
  document.getElementById('qbox1').appendChild(addMDivs);
}

for(x=0; x<4;x++) {
  var addMDivs = document.createElement('div');
  document.getElementById('qbox2').appendChild(addMDivs);
}

for(x=0; x<4;x++) {
  var addMDivs = document.createElement('div');
  document.getElementById('qbox3').appendChild(addMDivs);
}

for(x=0; x<4;x++) {
  var addMDivs = document.createElement('div');
  document.getElementById('qbox4').appendChild(addMDivs);
}

//kunne sikkert godt smide alle de her i et mega loop men :shrug-1:

//måneder
var sMDivs = document.querySelectorAll(".QuarterboxFirst > div");
for (var i = 0; i < sMDivs.length; i++) {
  sMDivs[i].classList.add(months[i]);
  sMDivs[i].id = "1mbox"+[i+1];
  sMDivs[i].classList.add("MonthBox");
}

var sMDivs = document.querySelectorAll(".QuarterboxSecond > div");
for (var i = 0; i < sMDivs.length; i++) {
  sMDivs[i].classList.add(months[i]);
  sMDivs[i].id = "2mbox"+[i+1];
  sMDivs[i].classList.add("MonthBox");
}

var sMDivs = document.querySelectorAll(".QuarterboxThird > div");
for (var i = 0; i < sMDivs.length; i++) {
  sMDivs[i].classList.add(months[i]);
  sMDivs[i].id = "3mbox"+[i+1];
  sMDivs[i].classList.add("MonthBox");
}

var sMDivs = document.querySelectorAll(".QuarterboxFourth > div");
for (var i = 0; i < sMDivs.length; i++) {
  sMDivs[i].classList.add(months[i]);
  sMDivs[i].id = "4mbox"+[i+1];
  sMDivs[i].classList.add("MonthBox");
}

//uger
for(x=0; x<5;x++) {
  var addDDivs = document.createElement('div');
  document.getElementById('1mbox1').appendChild(addDDivs);
}

var sWDivs = document.querySelectorAll(".MonthboxFirst > div");
for (var i = 0; i < sWDivs.length; i++) {
  sWDivs[i].id = "1wbox"+[i+1];
  sWDivs[i].classList.add("Weekbox");
}

for(x=0; x<5;x++) {
  var addDDivs = document.createElement('div');
  document.getElementById('1mbox2').appendChild(addDDivs);
}

var sWDivs = document.querySelectorAll(".MonthboxSecond > div");
for (var i = 0; i < sWDivs.length; i++) {
  sWDivs[i].id = "2wbox"+[i+1];
  sWDivs[i].classList.add("Weekbox");
}

for(x=0; x<5;x++) {
  var addDDivs = document.createElement('div');
  document.getElementById('1mbox3').appendChild(addDDivs);
}

var sWDivs = document.querySelectorAll(".MonthboxThird > div");
for (var i = 0; i < sWDivs.length; i++) {
  sWDivs[i].id = "3wbox"+[i+1];
  sWDivs[i].classList.add("Weekbox");
}



for(x=0; x<5;x++) {
  var addDDivs = document.createElement('div');
  document.getElementById('2mbox1').appendChild(addDDivs);
}

var sWDivs = document.querySelectorAll(".MonthboxFirst > div");
for (var i = 0; i < sWDivs.length; i++) {
  sWDivs[i].id = "1wbox"+[i+1];
  sWDivs[i].classList.add("Weekbox");
}

for(x=0; x<5;x++) {
  var addDDivs = document.createElement('div');
  document.getElementById('2mbox2').appendChild(addDDivs);
}

var sWDivs = document.querySelectorAll(".MonthboxSecond > div");
for (var i = 0; i < sWDivs.length; i++) {
  sWDivs[i].id = "2wbox"+[i+1];
  sWDivs[i].classList.add("Weekbox");
}

for(x=0; x<5;x++) {
  var addDDivs = document.createElement('div');
  document.getElementById('2mbox3').appendChild(addDDivs);
}

var sWDivs = document.querySelectorAll(".MonthboxThird > div");
for (var i = 0; i < sWDivs.length; i++) {
  sWDivs[i].id = "3wbox"+[i+1];
  sWDivs[i].classList.add("Weekbox");
}



for(x=0; x<5;x++) {
  var addDDivs = document.createElement('div');
  document.getElementById('3mbox1').appendChild(addDDivs);
}

var sWDivs = document.querySelectorAll(".MonthboxFirst > div");
for (var i = 0; i < sWDivs.length; i++) {
  sWDivs[i].id = "1wbox"+[i+1];
  sWDivs[i].classList.add("Weekbox");
}

for(x=0; x<5;x++) {
  var addDDivs = document.createElement('div');
  document.getElementById('3mbox2').appendChild(addDDivs);
}

var sWDivs = document.querySelectorAll(".MonthboxSecond > div");
for (var i = 0; i < sWDivs.length; i++) {
  sWDivs[i].id = "2wbox"+[i+1];
  sWDivs[i].classList.add("Weekbox");
}

for(x=0; x<5;x++) {
  var addDDivs = document.createElement('div');
  document.getElementById('3mbox3').appendChild(addDDivs);
}

var sWDivs = document.querySelectorAll(".MonthboxThird > div");
for (var i = 0; i < sWDivs.length; i++) {
  sWDivs[i].id = "3wbox"+[i+1];
  sWDivs[i].classList.add("Weekbox");
}



for(x=0; x<5;x++) {
  var addDDivs = document.createElement('div');
  document.getElementById('4mbox1').appendChild(addDDivs);
}

var sWDivs = document.querySelectorAll(".MonthboxFirst > div");
for (var i = 0; i < sWDivs.length; i++) {
  sWDivs[i].id = "1wbox"+[i+1];
  sWDivs[i].classList.add("Weekbox");
}

for(x=0; x<5;x++) {
  var addDDivs = document.createElement('div');
  document.getElementById('4mbox2').appendChild(addDDivs);
}

var sWDivs = document.querySelectorAll(".MonthboxSecond > div");
for (var i = 0; i < sWDivs.length; i++) {
  sWDivs[i].id = "2wbox"+[i+1];
  sWDivs[i].classList.add("Weekbox");
}

for(x=0; x<5;x++) {
  var addDDivs = document.createElement('div');
  document.getElementById('4mbox3').appendChild(addDDivs);
}

var sWDivs = document.querySelectorAll(".MonthboxThird > div");
for (var i = 0; i < sWDivs.length; i++) {
  sWDivs[i].id = "3wbox"+[i+1];
  sWDivs[i].classList.add("Weekbox");
}

//forbered dig på datoer


//viser datoer

//skaber dagens dato
var monthNames = ["januar", "februar", "marts", "april", "maj", "juni", "juli", "august", "september", "oktober", "november", "december"]
var showdate = new Date();
year = showdate.getFullYear();
month = showdate.getMonth() + 1;
day = showdate.getDate();
showdate = day + " - " + monthNames[showdate.getMonth()] + " - " + year

//viser dagens dato i "showDate"
document.getElementById("showDate").appendChild(document.createTextNode(showdate));

