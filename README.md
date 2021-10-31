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

Side note, I know that its supposed to be a live reload whenever its performed but in my first pull, I had a tsunami, only 1 out of 2000 earthquakes, but I didn't save the file so its lost to time. Such is life, tomorrow I just have to get the to overlayMaps working now that I have the json files and shold be done.The geoJSON exercise from day 1 was helpful to a degree, 
but I could have easily gone down a deadend trying to get that to work, instead I did the reverse of getting the two function for choosing color and radius first and working backwords. Worked pretty well, but well see after the place techtonic layers are loaded tomorrow.