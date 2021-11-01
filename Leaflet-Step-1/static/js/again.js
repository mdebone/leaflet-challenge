// and a console.log to see if everything is working
console.log("working");

let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
let ocean = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri',
        maxZoom: 13
});

// Create our map, giving it the streetmap and what will be the earthquake layer to display on load.    
let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 4,
    layers: [street]
});

    // Create a baseMaps object.
let baseMaps = {
      "Street": street,
      "Topographic Map": topo,
      "Ocean Seabed Map": ocean
};

    // Create an overlay object to hold our overlay.

let earthquake = new L.layerGroup();
let plateBoundaries = new L.layerGroup();
let orogeniesBoundaries = new L.layerGroup();

// create a default overlay to add to the base overlap on load
let overlayMaps = {
    "Earthquakes": earthquake,
    "Plate Boundaries": plateBoundaries,
    "Orogeny Zones": orogeniesBoundaries
};

// Incorporate default baseMaps and overlayMaps
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
   }).addTo(myMap);

// Use this link to get the GeoJSON data.
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Getting our GeoJSON data
d3.json(queryUrl).then(function(data) {
  // Creating a GeoJSON layer with the retrieved data
  function createFeatures(feature) {
      return {
        radius: [feature.properties.mag * 5],
        color: "#ffffff",
        fillColor: chooseColor(feature.geometry.coordinates[2]),
        fillOpacity: 0.75,
        weight: 1
      };
    } 

    // The function that will determine the color of a earthquake based on the depth category that it belongs to
    function chooseColor(depth) {
      if (depth < 10) return "#ccff99";
      else if (depth < 30) return "#ffff99";
      else if (depth < 50) return "#ffcc66";
      else if (depth < 70) return "#ff9933";
      else if (depth < 90) return "#ff3300";
      else if (depth <= 90) return "#990000";
      else return "#000000";
    }

    // Create a GeoJSON layer containing the features array on the earthquakeData object
    // Run function once for each needed statistic in the earthquake array
    // Use the point to layer function described in the leaflet documentation
    L.geoJSON(data, {
            pointToLayer: function(feature, latlng) {
                console.log(data)
                return L.circleMarker(latlng);
            },
        // The detail properties of each earthquake marker is determine by the createFeatures function
        detail: createFeatures,
      // Give each earthquake a popup text
      onEachFeature: function(feature, layer) {
        layer.bindPopup(`<h3>${feature.properties.place} "Magnitude: "${feature.properties.mag}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
        }  
  
    }).addTo(earthquake);

    // add earthquake layer to map
    earthquake.addTo(myMap);

// Create Legend on the bottom right for earthquake depth
let legend = L.control({
  position: "bottomright"
});  

// Insert the legend Div class
legend.onAdd = function() {
     let div = L.DomUtil.create("div", "info legend");
          depth = ['-10', '10', '30', '50', '70', '90'],
          labels = [];

      div.innerHTML += '<h4> Epicenter Depth</h4>'    //<hr><p>KM Estimate</p> '

      // loop thru  the intervals to create a label with corresponding color
      for (var i = 0; i < depth.length; i++) {
          '<i style="background:' + chooseColor(depth[i]) + '"></i> ' +
          depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
        }
        return div;
    };

    // Add the info legend to the map
    legend.addTo(myMap);

    // Filter the JSON data generously provided by Fraxen
    d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_orogens.json").then(function(orogenData) {
        // Adding our geoJSON data, along with style information, to the tectonicplates
        // layer.
        L.geoJson(orogenData, {
          fillColor: "#ccccb3",
          fillOpacity: 0.5
        }).addTo(orogeniesBoundaries);

        // Then add the tectonicplates layer to the map.
        orogeniesBoundaries.addTo(myMap);
    });
   
    // Filter the JSON data generously provided by Fraxen
    d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function(plateData) {
      // Adding our geoJSON data, along with style information, to the tectonicplates
      // layer.
      L.geoJson(plateData, {
        color: "#ff9900",
        weight: 3
      }).addTo(plateBoundaries);

      // Then add the tectonicplates layer to the map.
      plateBoundaries.addTo(myMap);
  });

}); 
