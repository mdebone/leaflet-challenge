# leaflet-challenge

added the two leaflet folders and the corresponding app.js's and htmls. Got the javascript files wrong, they're logic not app, 
forgot to add the html code when I created the file, and added the two examples of us going over them in class to get me started, the ones about the json pull.

okay stoped being stupid and fixating on the trying to convert the date, I was thinking that if I had a scroll bar down along the bottom over the last 7 days it would be cool.
But no more, that idea is stupid. Added a bunch of revert copies that I need to prune, had to work around a stupid issue this afternoon as to why the stlye css was giving me so much trouble
on load, turned out it was because it was nested wrong, got that fixed and BLAM, table and everything loaded. Knowing a bit about geology, I think that my additional layers are 
going to be the plate boundaries, the orogenic zones, since those are what cause a lot of earthquakes, one plate subducting underneath another  and I found two github filters that already had them coded as a json.
Stretch goal is going to be finding a ocean seabed topography, cause I think that would be neat, would show the mid-ocean trenches that are spliting or subducting, either way a lot of activity there and earthqaukes abound

Okay so I screwed up in thinking that the depth was the size of the circle, and that the color was the magnitude indicator. Got that sorted out, and realized that my leaflet 1.7.1 versions of the css and that the script srce obviously doesn't go in the head but the body of the html. 
so that was causing more then a few errors and time lost, but its resolved. I spend quite a bit of time looking for topographic or benthic maps of the ocean floor cause I don't really like the openmaps's philosophy of just treating any and all bodies of water as 'blue'. 
No subterranian features, no mid-ocean plate boundaries to display, which cause earthquakes, no subducting ocean plates that cause earthquakes. Both of those would be deep, but I still thought it would be cool to have. Found one, and I am happy with the level of detail and when it is combined with,
the plate boundaries that was suggested in the assignment description I think it will make it pop. Since Fraxen, the git hub repository owner also had the orogenic zones in the same folder I went with that. Just shows where mountains are forming because they are being
uplifed by the subducting oceanic plate. So makes for a good visualization on why certain areas inland away from transform faults like the San Andreas have deep earthquakes. So those will be my two additional overlay maps. 

Side note, I know that its supposed to be a live reload whenever its performed but in my first pull, I had a tsunami, only 1 out of 2000 earthquakes, but I didn't save the file so its lost to time. 
Such is life, tomorrow I just have to get the to overlayMaps working now that I have the json files and shold be done.The geoJSON exercise from day 1 was helpful to a degree, 
but I could have easily gone down a deadend trying to get that to work, instead I did the reverse of getting the two function for choosing color and radius first and working backwords. 
Worked pretty well, but well see after the place techtonic layers are loaded tomorrow.

Met with my tutor and we went over why the first layer was loading but the second and third layers were not working. 
It was weird, because all three leaflet basemaps would load, but only the earthquakes of the layers would populate, obviously becauses its called in the myMap variable that creates the app, but no luck on either the tectonic plates loading,  or the orogenies loading. 
I had not really hoped on the orogonies layer loading because it was a feature function rather than a feature like the tectonic plates and the earthquake points, but the techtonic plate lines not loading was disconcerting to say the least.
Mainly because its literally just a connect the dot of latitude and longitudes and I downloaded the source code of the boundaries json and converted it into a js and thats exactly what it was, latlng A to latlng B to latlng C ad infinitum.

It turned out that my call for the featurelayers was incorrect after leaflet moved from 1.6.0, which we convered last week, to the new 1.7.1, that came out since then.
Just bad luck that, so I had to go through the process of updating my html to the new version, downloading an sha512 for the first time which was interesting and a cool benefit of knowing how to do that in the future.
All that was done, and then nothing populated when I opened to the live server. I had the data there from the console logs that I was trying, like 2000 earthquakes but they were not generating on any of the basemaps.

so d3.json(url, function(data) { doesn't work anymore you have to back to the old 'd3.json(url).then(function(data) { for each of the layers. And just like that BLAM, image of earth with appropiately scaled cirles with color denoting the depth appears on screen with the plate boundaries and the orogoenic zones.
Took me and the tutor an hour and a half to get it to work, and there 50 minute sessions so I was appreciative of him staying until it was solved. All that remains is that there color gauge is fill deep earthquakes as black rather than the
color that they are supposed to be. That didn't make sense, becuase I left the last range item of depth >=90 km as the catchall open function so it should have been populating them with some dark red, not the on error == black. 
But it was and still is so I have to figure that out tomorrow when I have the patience to do so, and find out what happend to my leaflet satelite imagery base layer, just dissapeared, but that will be easy to incorporate.

Im gonnna start cleaning the git hub repositories cause ohh boy did I make a bunch of copies each time I got something to work. 

Halfway thru cleaning the github repositories, it was a mess. I added another basemap, a true color earth view that Im calling satellite, redid the topo map's source to esri rather than the open topo map, and added the base map 'world'the base map has features like cities and countries so it acts like a streetmap in that,
no data was lost. And redid the colors on earthquake features because they were blending too much with the map colors, food for thought, earthtones are called earthtones cause they look like the colors of earth, so don't pick them for indicator colors.