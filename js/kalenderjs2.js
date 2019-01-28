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


function addCDiv(){
  var cdiv = document.createElement("div");
  cdiv.id = "calendar";
  cdiv.classList.add("Calendarbox");
  document.getElementById("body").appendChild(cdiv);
}

function addYDiv(){
  var ydiv = document.createElement("div");
  ydiv.id = "year";
  ydiv.classList.add("Yearbox");
  document.getElementById("year").appendChild(ydiv);
}

window.onload=addCDiv();
window.onload=addYDiv();

