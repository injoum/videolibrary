# videolibrary
Video library with user controll and permissions using angularjs and nodejs through mongodb

Contents:
  1. View non-premium videos and adding and editting them
  2. View premium videos and adding and editting them depending on the permission of your user
  3. View users and adding and editting them

Technology used:
  1. MongoDB for the database
  2. Node.JS with express framework
  3. AngularJS with ui-router component and ng-cookies

To run this project you need to:
  1. Download MongoDB and create a database called "app"
  2. Create two collections one called "videos" and on called "users"
  3. import the two JSON files in the database folder into that "app" database then create a text index in each collection one for "name" in the "users" collection and one for "title" in the "videos" collection. Then the database is set to go.
  
  note: (the text indexes are for the search functionality)
  
  2. Download Node.js
  

I used http-server simply to download that (after downloading node):

```
npm install http-server -g
```
to use go to the repository folder and run in CMD:

```
http-server
```

then go to the server folder and run a CMD and run:

```
node app.js
```

for further setting you can enter 'server' folder and edit the 'app.js' file for database configuration.

for changing node.js port settings, you must change the server settings in angularjs in the 'controllers' folder in the 'app.js' file
(you can change the link to the server).

Finally to enter the program the username and password is both "admin"

Hope everything work well. :)
