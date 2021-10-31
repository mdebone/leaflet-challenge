// Store our API endpoint as queryUrl.
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

  // Perform a GET request to the query URL/
  d3.json(queryUrl).then(function (data) {
  
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.feature);
});

function createFeatures(earthquakeData) {
    // Define a function that we want to run once for each feature in the features array.
    // Give each feature a popup that describes the place and time of the earthquake.
    function onEachFeature(feature, layer) {
      layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
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
  
    // Create the base layers.
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

    // Create the overlay layers.
    // Store the tectonic API endpoint as a queryUrl.
    var plateBoundUrl = "https://github.com/fraxen/tectonicplates/blob/339b0c56563c118307b1f4542703047f5f698fae/GeoJSON/PB2002_boundaries.json";

      d3.json(plateBoundUrl).then(function (data) {
      createFeatures(data.features);
    });

    // Use d3 to get the tectonic plate geoJson Data.
    function createFeatures(data) {
      L.geoJSon(data,
        style, {color: "#800000", weight: 4},
      ).addTo(plateBoundaries);
    };

    // Add the plate boundaries to the map
    plateBoundaries.addTo(map);
  
    // Store the orogenic API endpoint as a queryUrl.
    var orogeniesUrl = "https://github.com/fraxen/tectonicplates/blob/339b0c56563c118307b1f4542703047f5f698fae/GeoJSON/PB2002_orogens.json";

    d3.json(orogeniesUrl).then(function (data) {
    createFeatures(data.features);
    });

    // Use d3 to get the orogenic zone geoJson Data.
    function createFeatures(orogeniesData) {
      L.geoJson(orogeniesData,
        style, {color: "#800000", weight: 4},
        ).addTo(orogeniesBoundaries);
    };

    // Add the plate boundaries to the map
    orogeniesBoundaries.addTo(map);

    // Create an overlay object to hold our overlay.
    var overlayMaps = {
      Earthquakes: earthquakes,
      Techtonics: plateBoundaries,
      Orogenies: orogeniesBoundaries
    };
    
// Create our map, giving it the streetmap and earthquakes layers to display on load.
var map = L.map("map", {
    center: [37.09, -95.71],
    zoom: 13,
    layers: [street, earthquakes]
});

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}