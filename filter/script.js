// Dette er her alt vores info ligger på de foreskellige "skoler" vi har med i systemet
var blabla = [
    {"id":5,"pladser":30,"startdato":"31/12/2019","slutdato":"31/01/2020","reserverede_pladser":15,"synlig":"ja","skole_id":"skole1","moduldata_id":"1.1","Region_id":"Hovedstaden","created_at":"2019-06-13 06:17:35","updated_at":"2019-06-13 06:17:35"},
    {"id":6,"pladser":30,"startdato":"17/12/2019","slutdato":"31/01/2020","reserverede_pladser":15,"synlig":"ja","skole_id":"skole2","moduldata_id":"1.2","Region_id":"Sjælland","created_at":"2019-06-13 06:17:35","updated_at":"2019-06-13 06:17:35"},
    {"id":7,"pladser":30,"startdato":"17/12/2019","slutdato":"31/01/2020","reserverede_pladser":15,"synlig":"ja","skole_id":"skole3","moduldata_id":"1.3","Region_id":"Midtjylland","created_at":"2019-06-13 06:17:35","updated_at":"2019-06-13 06:17:35"},
    {"id":8,"pladser":30,"startdato":"17/12/2019","slutdato":"31/01/2020","reserverede_pladser":15,"synlig":"ja","skole_id":"skole4","moduldata_id":"1.4","Region_id":"Syddanmark","created_at":"2019-06-13 06:17:35","updated_at":"2019-06-13 06:17:35"}
];

// Dette er her vi laver de 2 arrays vi bruger længer nede
var filter_properties = [];
var searchfilter_properties = [];

// Her tager vi blabla array og laver om til først en string og der efter til et objekt
var blabla_str = JSON.stringify(blabla);
var blabla_obj = JSON.parse(blabla_str);

// Dette her er gør bare så vi se al dataen fra blabla_str som vi lavet til en string tidligere 
document.getElementById("jsoncontainer").innerHTML = "<h4>Det hele:</h4>" + blabla_str + "<br><br> <h4>Filtreret:</h4>";


// Her begynder vi at laver modul filteret
function modulfilter()
{
    // Her sætter jeg værdien for modulen
    filter_properties[1] = document.getElementById("modul").value;

    // Dette filter forklar jeg om længere nede
    setfilter();
};
// Her begynder vi at laver skolefilters
function skolefilter()
{
    // Her sætter jeg værdien for skole
    filter_properties[0] = document.getElementById("menu").value;
    // Dette filter forklar jeg om længere nede
    setfilter();
}; 
// Her begynder vi at laver regioenfilters
function regionsfilter()
{
    // Her kigger jeg på om boxen bliver checket så den kan sætte værdien
    if($('#Hovedstaden').is(":checked")){
        filter_properties [2] = $('#Hovedstaden').val(); 
    } 
    // Her kigger jeg på om boxen man har checket bliver fjernet igen og hvis det er blivet gjort, fjerner den værdien
    else if($('#Hovedstaden').is(':not(:checked)')){
        filter_properties [2] = ""; 
    }

    // Her kigger jeg på om boxen bliver checket  så den kan sætte værdien
    if($('#Sjælland').is(":checked")){
        filter_properties [3] = $('#Sjælland').val(); 
    } 
    // Her kigger jeg på om boxen man har checket bliver fjernet igen og hvis det er blivet gjort, fjerner den værdien
    else if($('#Sjælland').is(':not(:checked)')){
        filter_properties [3] = ""; 
    }

    // Her kigger jeg på om boxen bliver checket så den kan sætte værdien
    if($('#Syddanmark').is(":checked")){
        filter_properties [4] = $('#Syddanmark').val(); 
    } 
    // Her kigger jeg på om boxen man har checket bliver fjernet igen og hvis det er blivet gjort, fjerner den værdien
    else if($('#Syddanmark').is(':not(:checked)')){
        filter_properties [4] = ""; 
    }

    // Her kigger jeg på om boxen bliver checket så den kan sætte værdien
    if($('#Midtjylland').is(":checked")){
        filter_properties [5] = $('#Midtjylland').val(); 
    } 
    // Her kigger jeg på om boxen man har checket bliver fjernet igen og hvis det er blivet gjort, fjerner den værdien
    else if($('#Midtjylland').is(':not(:checked)')){
        filter_properties [5] = ""; 
    }

    // Her kigger jeg på om boxen bliver checket så den kan sætte værdien
    if($('#Nordjylland').is(":checked")){
        filter_properties [6] = $('#Nordjylland').val(); 
    }
    // Her kigger jeg på om boxen man har checket bliver fjernet igen og hvis det er blivet gjort, fjerner den værdien
    else if($('#Nordjylland').is(':not(:checked)')){
        filter_properties [6] = ""; 
    }

    // Dette filter forklar jeg om længere nede
    setfilter();
}
// Her er searchbox filteret
function searchfilter()
{
    // // Dette filter forklar jeg om nede under
    setfilter();
};


// Her hvor stor set hele filteret bliver laver
function setfilter()
{
    // Her gør jeg så man kan lave mellemrum i searchboxen og at den stadig finde det du skal bruge om du skriver med stort eller småt
    var search_text = document.getElementById("search").value.toLowerCase();
    var searchfilter_properties = search_text.split(" ");

    // Dette er filteret der bliver brugt til at finde modul og skole værdien fra blabla array
    var FFilter = blabla_obj.filter(function (json)
    {
        // Her kigger jeg efter hvor og hvornår skoleværdien bliver brugt i search boxen
        if(json.skole_id.match(`${searchfilter_properties[0]}`) && (searchfilter_properties[0].length > 0) || json.skole_id.match(`${searchfilter_properties[1]}`) && (searchfilter_properties[1].length > 0) || json.skole_id.match(`${searchfilter_properties[2]}`) && (searchfilter_properties[2].length > 0))
        {        
            return json.skole_id;
        }
        // Her kigger jeg efter hvor og hvornår modulværdien bliver brugt i search boxen
        if(json.moduldata_id.match(`${searchfilter_properties[0]}`) && (searchfilter_properties[0].length > 0) || json.moduldata_id.match(`${searchfilter_properties[1]}`) && (searchfilter_properties[1].length > 0) || json.moduldata_id.match(`${searchfilter_properties[2]}`)&& (searchfilter_properties[2].length > 0))
        {
            return json.moduldata_id;
        }
        
        // dette er her vi samler alle værdierne vi har fået fra alle filterne vi har fået tidligere
        return json.skole_id === filter_properties[0] || json.moduldata_id === filter_properties[1] || json.Region_id === filter_properties[2] || json.Region_id === filter_properties[3] || json.Region_id === filter_properties[4] || json.Region_id === filter_properties[5] || json.Region_id === filter_properties[6];
        
        
    });
    // Det er her vi gør så man kan se alle de ting man her søgt efter 
    document.getElementById("placeholder").innerHTML = JSON.stringify(FFilter);
};




