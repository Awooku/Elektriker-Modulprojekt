var blabla = [
    {"id":5,"pladser":30,"startdato":"31/12/2019","slutdato":"31/01/2020","reserverede_pladser":15,"synlig":"ja","skole_id":"skole1","moduldata_id":"1.1","region_id":"Hovedstaden","created_at":"2019-06-13 06:17:35","updated_at":"2019-06-13 06:17:35"},
    {"id":6,"pladser":30,"startdato":"17/12/2019","slutdato":"31/01/2020","reserverede_pladser":15,"synlig":"ja","skole_id":"skole2","moduldata_id":"1.2","region_id":"Sjælland","created_at":"2019-06-13 06:17:35","updated_at":"2019-06-13 06:17:35"},
    {"id":7,"pladser":30,"startdato":"17/12/2019","slutdato":"31/01/2020","reserverede_pladser":15,"synlig":"ja","skole_id":"skole3","moduldata_id":"1.3","region_id":"Midtjylland","created_at":"2019-06-13 06:17:35","updated_at":"2019-06-13 06:17:35"},
    {"id":8,"pladser":30,"startdato":"17/12/2019","slutdato":"31/01/2020","reserverede_pladser":15,"synlig":"ja","skole_id":"skole4","moduldata_id":"1.4","region_id":"Syddanmark","created_at":"2019-06-13 06:17:35","updated_at":"2019-06-13 06:17:35"}
];

var filter_properties = [];
var searchfilter_properties = [];

var blabla_str = JSON.stringify(blabla);
var blabla_obj = JSON.parse(blabla_str);

document.getElementById("jsoncontainer").innerHTML = "<h4>Det hele:</h4>" + blabla_str + "<br><br> <h4>Filtreret:</h4>";

function modulfilter()
{
    filter_properties[1] = document.getElementById("modul").value;
    setfilter();
};
function skolefilter()
{
    filter_properties[0] = document.getElementById("menu").value;
    setfilter();
};

function regionsfilter()
{
    filter_properties[2] = document.getElementById("region").value;
    setfilter();
}

function searchfilter()
{
    setfilter();
};

function setfilter()
{
    var search_text = document.getElementById("search").value.toLowerCase();
    var searchfilter_properties = search_text.split(" ");

    var FFilter = blabla_obj.filter(function (json)
    {
        if(`${json.id}`.match(`${searchfilter_properties[0]}`) && (searchfilter_properties[0].length > 0) || `${json.id}`.match(`${searchfilter_properties[1]}`) && (searchfilter_properties[1].length > 0) || `${json.id}`.match(`${searchfilter_properties[2]}`) && (searchfilter_properties[2].length > 0)) 
        {            
            return json.id;

        }
        if(json.skole_id.match(`${searchfilter_properties[0]}`) && (searchfilter_properties[0].length > 0) || json.skole_id.match(`${searchfilter_properties[1]}`) && (searchfilter_properties[1].length > 0) || json.skole_id.match(`${searchfilter_properties[2]}`) && (searchfilter_properties[2].length > 0))
        {        
            return json.skole_id;
        }
        if(json.moduldata_id.match(`${searchfilter_properties[0]}`) && (searchfilter_properties[0].length > 0) || json.moduldata_id.match(`${searchfilter_properties[1]}`) && (searchfilter_properties[1].length > 0) || json.moduldata_id.match(`${searchfilter_properties[2]}`)&& (searchfilter_properties[2].length > 0))
        {     
            return json.moduldata_id;
        }

        
<<<<<<< HEAD
        return json.skole_id === filter_properties[0] || json.moduldata_id === filter_properties[1] || json.region_id === filter_properties[2];
=======
        return json.skole_id === filter_properties[0] || json.moduldata_id === filter_properties[1] || json.Region_id === filter_properties[2];
>>>>>>> parent of b0a0faa... Merge branch 'Andreas' of https://github.com/Awooku/Elektriker-Modulprojekt into Andreas
        
        
    });
    document.getElementById("placeholder").innerHTML = JSON.stringify(FFilter);
};
searchfilter();


// var atLeastOneIsChecked = $('input[name="check"]:checked').length > 0;


