// Use this link to get the GeoJSON data.
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
var boundariesUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";
var orogeniesURL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_orogens.json"

// Create three layerGroups
var earthquake = L.layerGroup();
var plateBoundaries = L.layerGroup();
var orogeniesBoundaries = L.layerGroup()

// Create the tile layers
var satelliteMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.satellite",
  accessToken: "mapbox_api_key"
});

var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var ocean = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri',
        maxZoom: 13
});

// Create a baseMaps object.
var baseMaps = {
    "SatelliteMap": satelliteMap,
    "Topographic Map": topo,
    "Ocean Seabed Map": ocean
};

// create a default overlay to add to the base overlap on load
var overlayMaps = {
    "Earthquakes": earthquake,
    "Plate Boundaries": plateBoundaries,
    "Orogeny Zones": orogeniesBoundaries
};

// Create our map, giving it the streetmap and what will be the earthquake layer to display on load.    
var myMap = L.map("map", {
    center: [
        37.09, -95.71
    ],
    zoom: 2,
    layers: [street, earthquake]
});

// Incorporate default baseMaps and overlayMaps
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(myMap);

// Getting our GeoJSON data
d3.json(queryUrl).then(function(earthquakeData) {
    // get markerSize by multiplying magnitude
    function scaledMarker(magnitude) {
        return magnitude * 5;
    };  
    // Tis function that will determine the color of a earthquake based on the depth category that it belongs to
    function chooseColor(depth) {
      switch(true) {
        case depth < 10: 
            return "#ccff99";
        case depth < 30: 
            return "#ffff99";
        case depth < 50: 
            return "#ffcc66";
        case depth < 70: 
            return "#ff9933";
        case depth < 90: 
            return "#ff3300";
        case depth <= 90: 
            return "#990000";
        default:
            return "#000000";
      }
    }    

        // Create a GeoJSON layer containing the features array on the earthquakeData object
        // Run function once for each needed statistic in the earthquake array
        // Use the point to layer function described in the leaflet documentation
    L.geoJSON(earthquakeData, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng,
            {
              radius: scaledMarker(feature.properties.mag),
              color: "#ffffff",
              fillColor: chooseColor(feature.geometry.coordinates[2]),
              fillOpacity: 0.75,
              stroke: true,
              weight: 0.75
            }
        ); 
    },
    onEachFeature: function(feature, layer) {
        layer.bindPopup(`<h3>${feature.properties.place} "Magnitude: "${feature.properties.mag}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
    }  
}).addTo(earthquake);    
// add earthquake layer to map
earthquake.addTo(myMap);      

// Filter the JSON data generously provided by Fraxen
d3.json(boundariesUrl, function(data) {
    // Adding our geoJSON data, along with style information, to the tectonic plates layer.
    L.geoJson(data, {
       color: "#ff9900",
       weight: 3
    }).addTo(plateBoundaries);
    // Then add the tectonicplates layer to the map.
    plateBoundaries.addTo(myMap);
});

    // Filter the JSON data generously provided by Fraxen
d3.json(orogeniesURL,function(data) {
    // Adding our geoJSON data, along with style information, to the tectonicplates layer.
    L.geoJson(data, {
        fillColor: "#ccccb3",
        fillOpacity: 0.5
    }).addTo(orogeniesBoundaries);
    // Then add the tectonicplates layer to the map.
    orogeniesBoundaries.addTo(myMap);
});
        
    // Create Legend on the bottom right for earthquake depth
    var legend = L.control({position: "bottomright"});
    // Insert the legend Div class
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend"),
        depth = [-10, 10, 30, 50, 70, 90];
    
        div.innerHTML += "<h4>Epicenter Depth</h4>"
    
        // loop thru  the intervals to create a label with corresponding color
        for (var i = 0; i < depth.length; i++) {
            div.innerHTML +=
            '<i style="background:' + chooseColor(depth[i]) + '"></i> ' +
            depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
            }
        return div;
    };
    // Add the info legend to the map
    legend.addTo(myMap);        
}); 