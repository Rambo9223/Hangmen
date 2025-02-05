To test the API with postman!

1. begin the server with npm start, you should see a 
message - "Listening on Port-8080" logged in the console.

2. Navigate to postman, ensure the desktop agent is running,
and enter the following in to the work environment 
- http://localhost:8080/api
Make sure a GET Request is selected, click send. 
This should return the Web-Project json file in it's current
state. 

3. To add a new item, change the GET request to POST,
enter the following in to the work environment 
- http://localhost:8080/list/
You need to give the new item an id, title, about and url
key and value. You can enter these in the Query parameter boxes
at the end the link in the workspace should look something like this

http://localhost:8080/list/?id=1&title=Item Title&about=Description of item&URL=http://itemURL.com

Hit send, if the item has been added you should get a success
message if not there will be an error. 
To check if the add was successful refer to section 2

4. To update an item, change the request to PUT,
enter the following in to the work environment 
- http://localhost:8080/list/
You need to give the item a new title, and/or a new about
key and value. You can enter these in the Query parameter boxes
at the end the link in the workspace should look something like this

http://localhost:8080/list/?id=1&newTitle=New Item title&newAbout=New Description of item

Hit send, if the item has been updated you should get a success
message if not there will be an error. 
To check if the add was successful refer to section 2

5. To delete an item, change the request to DELETE,
enter the following in to the work environment 
- http://localhost:8080/list/
You need to give the item id you wish to delete.
You can enter this in the Query parameter boxes
at the end the link in the workspace should look something like this

http://localhost:8080/list/?id=1

Hit send, if the item has been deleted you should get a success
message if not there will be an error. 
To check if the add was successful refer to section 2