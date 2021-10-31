// Creating the map object
var map = L.map("map", {
  center: [37.09, -95.71],
  zoom: 13
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Use this link to get the GeoJSON data.
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Getting our GeoJSON data
d3.geoJSON(queryUrl, function(data) {
  // Creating a GeoJSON layer with the retrieved data
  createFeatures(data.feature);
  
});

// The function that will determine the color of a earthquake based on the depth category that it belongs to
function chooseColor(depth) {
    if (depth <= "-10-10") return "#ccff99";
    else if (depth == "10-30") return "#ffff99";
    else if (depth == "30-50") return "#ffcc66";
    else if (depth == "50-70") return "#ff9933";
    else if (depth == "70-90") return "#ff3300";
    else if (depth == "90+") return "#990000";
    else return "#000000";
};

function createFeatures(earthquakeData) {

    // Function to iterate once thru each feature in the features array
    // Give each earthquake a popup text
    function onEachFeature(feature, layer) {
      layer.bindPopup()
    }



}



L.geoJson(data, {
style: function(feature) {
return {
  color: "#ffffff",
  fillColor: chooseColor(feature.geometry.coordinates[2]),
  fillOpacity: 0.5,
  weight: 1.5
};
}
}).addTo(myMap);