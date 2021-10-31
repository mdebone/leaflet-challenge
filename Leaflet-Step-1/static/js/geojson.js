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
      layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
    };

    // Create a GeoJSON layer containing the features array on the earthquakeData object
    // Run function once for each needed statistic in the earthquake array
    // Use the point to layer function described in the leaflet documentation
    var earthquake = L.geoJSON(earthquakeData, {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng)
      },
      style: function (feature) {
        return {
          radius: feature.properties.mag * 5,
          color: "#ffffff",
          fillColor: chooseColor(feature.geometry.coordinates[2]),
          fillOpacity: 0.75,
          weight: 1
          
        }
      },
      onEachFeature: onEachFeature
    });

    // sending our earthquake layer to the CreateMap function
    createMap(earthquake);
}


function createMap(earthquake) {

    // Define streetMap, topoMap, and oceanMap base layers
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
    var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
    var ocean = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri',
      maxZoom: 13
    });

    // Create a baseMaps object.
    var baseMaps = {
      "Street": street,
      "Topographic Map": topo,
      "Ocean Seabed Map": ocean
    };

    // Create an overlay object to hold our overlay.
    var overlayMaps = {
      Earthquakes: earthquake,
      Techtonics: plateBoundaries,
      Orogenies: orogeniesBoundaries
    };

  // Create our map, giving it the streetmap and earthquake layers to display on load.
  var map = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 4,
    layers: [street, earthquake]
  });

  // Create the default layer control
  // Incorporate default baseMaps and overlayMaps
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

// Create Legend on the bottom right for earthquake depth
var legend = L.control({
  position: "bottomright"
});  

// Insert the legend Div class
legend.onAdd = function(map) {
   div = L.DomUtil.create("div", "info legend"),
    depth = ['-10', '10', '30', '50', '70', '90'],
    lavel = [];

  div.innerHTML += '<h3> Depth</h3>'

  // Loop thru intervals to genreate equivalent colored square for each depth interval
  for (var i = 0; i < depths.length; i++) {
    div.innerHTML +=
      '<i style="background:' + chooseColor(depth[i] + '"></i> ' +
      depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
    }

    return div;
  };

  // Add the info legend to the map
  legend.addTo(myMap);

  // Filter the JSON data generously provided by Fraxen







}




