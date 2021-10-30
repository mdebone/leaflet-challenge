// get the query url from the usgs site for the last 7 days
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(queryUrl, function(data) {
    console.log(data.features);
    L.geoJson(data.features);
    
});