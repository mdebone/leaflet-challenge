// Create the base layers.
var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Initialize all the magnitudeLayerGroups that we'll use.
var magLayers = {
    ZERO_TO_ONE: new L.mLayerGroup(),
    ONE_TO_TWO: new L.mLayerGroup(),
    TWO_TO_THREE: new L.mLayerGroup(),
    THREE_TO_FOUR: new L.mLayerGroup(),
    FOUR_TO_FIVE: new L.mLayerGroup(),
    FIVE_TO_SIX: new L.mLayerGroup(),
    SIX_AND_ABOVE: new L.mLayerGroup()
};

// Create the map with our magnitudelayers.
var map = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [street, earthquakes]
  });



// Store our API endpoint as queryUrl.
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
});



function createFeatures(earthquakeData) {

  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the magnitude & place, as well as the time in a subheader time of the earthquake.
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>Magnitude:${feature.properties.mag}</h3><h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
  }

  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });

  // Send our earthquakes layer to the createMap function/
  createMap(earthquakes);
}

function createMap(earthquakes) {

  var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create a baseMaps object.
  var baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  // Create an overlay object to hold our overlay.
  var overlayMaps = {
    Earthquakes: earthquakes
  //  "Plate Boundaries": plateBoundaries
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  var 

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
//   L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
//   }).addTo(myMap);

// }

// // Store the tectonic API endpoint as a queryUrl.
// var plateBoundUrl = "https://github.com/fraxen/tectonicplates/blob/master/GeoJSON/PB2002_boundaries.json";

// d3.json(plateBoundUrl).then(function (data) {
//   createPlateFeatures(data.features);
// });

// // Use d3 to get the tectonic plate geoJson Data.
// function createPlateFeatures(plateData) {
//   L.geoJSon(plateData,
//     style, {color: "#800000", weight: 4},
//     ).addTo(plateBoundaries);
// };

// // Add the plate boundaries to the map
// plateBoundaries.addTo(map);


// // Store the orogenic API endpoint as a queryUrl.
// var orogeniesUrl = "https://github.com/fraxen/tectonicplates/blob/master/GeoJSON/PB2002_orogens.json";

// d3.json(orogeniesUrl).then(function (data) {
//   createFeatures(data.features);
// });

// // Use d3 to get the orogenic zone geoJson Data.
// function createFeatures(orogeniesData) {
//   L.geoJson(orogeniesData,
//     style, {color: "#800000", weight: 4},
//     ).addTo(orogeniesBoundaries);
// };

// // Add the plate boundaries to the map
// orogeniesBoundaries.addTo(map);

