// get the query url from the usgs site for the last 7 days
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
//
//
function createMap(earthquakes) {
    //
    function onEachFeature(feature, layer) {
        layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
    }
    //
    var earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature
    });
    //
    createMap(earthquakes);
}
//
function createMap(earthquakes) {
    //
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
    //
    var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });
    //
    var baseMaps = {
        "Street Map": street,
        "Topographic Map": topo
    };
    //
    var overlayMaps = {
        Earthquakes: earthquakes
    };
    //
    var myMap = L.map("map", {
        center: [
            37.09, -95.71
          ],
          zoom: 5,
    });

    d3.json(queryUrl, function(data) {
        console.log(data.features);
        L.geoJson(data).addTo(myMap);
        
    });
    //
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false  
    }).addTo(myMap);
}