/*window.onload = function(){
    var d = new Date();
    var month_navn = ['Januar','Febuar','Marts','April','Maj','Juni','Juli','August','September','Oktober','November','December'];
    var month = d.getMonth(); //måned
    var year = d.getFullYear(); //årstal
    var first_dato = month_navn[month] + " " + 1 + " " + year;
    //dato med måned
    var tmp = new Date(first_dato).toDateString(); 
    //første dag på ugen
    var first_dag = tmp.substring(0, 3);
    var dag_navn = ['Søn','Man','Tir','Ons','Tor','Fri','Lør'];
    var dag_no = dag_navn.indexOf(first_dag);           //1 dag
    var dage = new Date(year, month+1, 0).getDate();    //30 dage
    
    var kalender = get_kalender(dag_no, dage);
    document.getElementById("month-year").innerHTML = month_navn[month] + " " + year;
    document.getElementById("dato").appendChild(Kalender);
}

function get_kalender(dag_no, dage){
    var table = document.createElement('table');
    var tr = document.createElement('tr');

    //række med første bogstav fra uge dagene
    for(var c=0; c<=6; c++){
        var td = document.createElement('td');
        td.innerHTML = "SMTOTFL"[c];
        tr.appendChild(td);
    }
    table.appendChild(tr);


    tr = document.createElement('tr');
    var c;
    for(c=0; c<=6; c++){
        if(c == day_no){
            break;
        }
        var td = document.createElement('td');
        td.innerHTML = "";
        tr.appendChild(td);
    }

    var count = 1;
    for(; c<=6; c++){
        var td = document.createElement('td');
        td.innerHTML = count;
        count++;
        tr.appendChild(td);
    }
    table.appendChild(tr);


    for(var r=3; r<=6; r++){
        tr = document.createElement('tr');
        for(var c=0; c<=6; c++){
            if(count > dage){
                table.appendChild(tr);
                return table;
            }
            var td = document.createElement('td');
            td.innerHTML = count;
            count++;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}*/