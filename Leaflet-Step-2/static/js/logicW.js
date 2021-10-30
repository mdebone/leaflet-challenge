// Create the base layers.
var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Initialize all the magnitude_Layer_Groups that we'll use.
var magLayers = {
    ZERO_TO_ONE: new L.mLayerGroup(),
    ONE_TO_TWO: new L.mLayerGroup(),
    TWO_TO_THREE: new L.mLayerGroup(),
    THREE_TO_FOUR: new L.mLayerGroup(),
    FOUR_TO_FIVE: new L.mLayerGroup(),
    FIVE_TO_SIX: new L.mLayerGroup(),
    SIX_AND_ABOVE: new L.mLayerGroup()
};

// Create the map with our magnitude_layers.
var map = L.map("map", {
    center: [37.09, -95.71],
    zoom: 6,
    layers: [
        layers.ZERO_TO_ONE,
        layers.ONE_TO_TWO,
        layers.TWO_TO_THREE,
        layers.THREE_TO_FOUR,
        layers.FOUR_TO_FIVE,
        layers.FIVE_TO_SIX,
        layers.SIX_AND_ABOVE
    ]
});

// Add the streetmap tile layer to the map.
street.addTo(map);

// Create an overlays object to add to the layer control.
var overlayMaps = {
    "Magnitude 1 or Less": layers.ZERO_TO_ONE,
    "Magnitude 2 or Less": layers.ONE_TO_TWO,
    "Magnitude 3 or Less": layers.TWO_TO_THREE,
    "Magnitude 4 or Less": layers.THREE_TO_FOUR,
    "Magnitude 5 or Less": layers.FOUR_TO_FIVE,
    "Magnitude 6 or Less": layers.FIVE_TO_SIX,
    "Magnitude 1 or Less": layers.SIX_AND_ABOVE
};

// Create a control for our layers, and add our overlays to it.
L.control.layers(null,  overlays).addTo(map);

// Create a legend to display information about our map.
var legend = L.control({
    position: "bottomright"
});

// When the layer control is added, insert a div with the class of "legend".
legend.onAdd = function() {
    var div = L.DomUtil.create("div", "legend");
    return div;
};

// Add the info legend to the map.
legend.addTo(map);

// Initialize an object that contians icons for each layer group
var icons = {
    ZERO_TO_ONE: L.ExtraMarkers.icon({
        icon: "default",
        iconColor: "white",
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.properties.mag),
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5   
    }),
    ONE_TO_TWO: L.ExtraMarkers.icon({
        icon: "default",
        iconColor: "white",
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.properties.mag),
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5   
    }),
    TWO_TO_THREE: L.ExtraMarkers.icon({
        icon: "default",
        iconColor: "white",
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.properties.mag),
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5   
    }),
    THREE_TO_FOUR: L.ExtraMarkers.icon({
        icon: "default",
        iconColor: "white",
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.properties.mag),
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5   
    }),
    FOUR_TO_FIVE: L.ExtraMarkers.icon({
        icon: "default",
        iconColor: "white",
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.geometry.coordinates.depth),
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5   
    }),
    FIVE_TO_SIX: L.ExtraMarkers.icon({
        icon: "default",
        iconColor: "white",
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.properties.mag),
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5   
    }),
    SIX_AND_ABOVE: L.ExtraMarkers.icon({
        icon: "default",
        iconColor: "white",
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.properties.mag),
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5   
    }),
    
};

// Perform an API call on the earthquake all week summary geometry endpoint
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(earthGeometry) {

    // When the first API call completes, perform another call to the properties endpoint
    d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(earthProp) {
        var updateLat = earthGeometry.feature.geometry.coordinates.lat;
        var updateLng = earthGeometry.feature.geometry.coordinates.lng;
        var updateDep = earthGeometry.feature.geometry.coordinates.depth;
        var updateMag = earthProp.feature.properties.mag;
        var updatePlace = earthProp.feature.properties.place;
        var updateTime = earthProp.feature.properties.time;
        var updateId = earthProp.feature.properties.id;
        var updateTsunami = earthProp.feature.properties.tsunami

        // Create an object to keep the number of markers in each layer.
        var magnitudeRecord = {
            ZERO_TO_ONE: 0,
            ONE_TO_TWO: 0,
            TWO_TO_THREE: 0,
            THREE_TO_FOUR: 0,
            FOUR_TO_FIVE: 0,
            FIVE_TO_SIX: 0,
            SIX_AND_ABOVE: 0
        };

        // Initialize updateIdsCode, which will be used as a key to access the appropriate layers, icons, and earthquake count for the layer group.
        var earthQuakeId;

        // Loop through the earthquakes.
        for (var i = 0; i < updateId.length; i++) {

            // Create a new earthquake object with values from both properties and gemoetries.
            var equake = Object.assign({}, updateId[i], updateDep[i]);
            // If a earthquake is recorded but not listed, its magnitude <= 1.
            if (equake.updateMag<=1) {
                earthQuakeId = "ZERO_TO_ONE";
            }
            // its magnitude is recorded as < 1
            else if (equake.updateMag<2) {
                earthQuakeId = "ONE_TO_TWO";
            }
            // its magnitude is recorded as < 2
            else if (equake.updateMag<3) {
                earthQuakeId = "TWO_TO_THREE";
            }
            // its magnitude is recorded as < 3
            else if (equake.updateMag<4) {
                earthQuakeId = "THREE_TO_FOUR";
            }
            // its magnitude is recorded as < 4
            else if (equake.updateMag<5) {
                earthQuakeId = "FOUR_TO_FIVE";
            }
            // its magnitude is recorded as < 5
            else if (equake.updateMag<6) {
                earthQuakeId = "FIVE_TO_SIX";
            }
            // Otherwise it is < 6
            else {
                earthQuakeId = "SIX_AND_ABOVE"
            }

            // Update the station count.
            magnitudeRecord[earthQuakeId]++;
            // Create a new earthquake marker with the appropriate icon and coordinates.
            var equakeMarker = L.marker([updateLat, updateLng], {
                icon: icons[earthQuakeId]
            });

            
            // Add the new marker to the appropriate layer
            equakeMarker.addTo(layers[earthQuakeId]);

            // Bind a popup to the marker that will  display on being clicked. This will be rendered as HTML.
            equakeMarker.bindPopup(`<h3>Magnitude:${updateMag}</h3><h3>${updatePlace}</h3><hr><p>${new Date(updateTime)}</p>`);
        
             // Define a markerSize() function that will give each earthquake a different radius based on its magnitude.
             function getColor(magnitude) {
                return (magnitude) * 100;
    }};
});

// // Create an appropriate fillColor relative to its depth
// function getColor(feature.geometry.coordinates[2]), {
//     if ()

// When the layer control is added, insert a div with the class of "legend"
//legend.onAdd = function(map) {

// // Update the legend's innerHTML with the last updated time and station count.
// var div = L.DomUtil.create("div", "info legend"),
//     depths = ['-10', '10', '30', '50', '70', '90', '90.01'],
//     labels = [];

//   div.innerHTML += '<h4>EQ Depth</h4>'

//   // loop through intervals to create a label with colored square
//   for (var i = 0; i < depths.length; i++) {
//     div.innerHTML +=
//         '<i style="background:' + getColor(depths[i]) + '"></i> ' +
//         depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
//     }

//   return div;

// };



  



// Store our API endpoint as queryUrl.
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// // Perform a GET request to the query URL/
// d3.json(queryUrl).then(function (data) {
//   // Once we get a response, send the data.features object to the createFeatures function.
//   createFeatures(data.features);
// });



// function createFeatures(earthquakeData) {

//   // Define a function that we want to run once for each feature in the features array.
//   // Give each feature a popup that describes the magnitude & place, as well as the time in a subheader time of the earthquake.
//   function onEachFeature(feature, layer) {
//     layer.bindPopup(`<h3>Magnitude:${feature.properties.mag}</h3><h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
//   }

//   // Create a GeoJSON layer that contains the features array on the earthquakeData object.
//   // Run the onEachFeature function once for each piece of data in the array.
//   var earthquakes = L.geoJSON(earthquakeData, {
//     onEachFeature: onEachFeature
//   });

//   // Send our earthquakes layer to the createMap function/
//   createMap(earthquakes);
// }

// function createMap(earthquakes) {



//   var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
//     attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
//   });

//   // Create a baseMaps object.
//   var baseMaps = {
//     "Street Map": street,
//     "Topographic Map": topo
//   };

//   // Create an overlay object to hold our overlay.
//   var overlayMaps = {
//     Earthquakes: earthquakes
//   //  "Plate Boundaries": plateBoundaries
//   };

//   // Create our map, giving it the streetmap and earthquakes layers to display on load.
//   var 

//   // Create a layer control.
//   // Pass it our baseMaps and overlayMaps.
//   // Add the layer control to the map.
//   L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
//   }).addTo(myMap);

}

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