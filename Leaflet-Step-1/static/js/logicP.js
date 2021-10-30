// get the map object
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 13,
});

// Adding a tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// get the query url from the usgs site for the last 7 days
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// d3.json(queryUrl).then(function (data) {

d3.geoJson(queryUrl).then(response=>{
  console.log(response.features);
  var eQuakeLocations=[];
  response.forEach(x=>{
    if(eQuakeLocations) eQuakeLocations.push([x.feature.geometry.coordinates[1], x.feature.geometry.coordinates[2], x.feature.geometry.coordinates[3]])
  
    L.geoJson(locations, {
        radius: 25  
    }).addTo(myMap);
    console.log(locations);

  }
)})