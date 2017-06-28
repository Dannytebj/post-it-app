# PostIt
PostIt is a simple application that allows friends and colleagues create groups for notifications. This way one person can post notifications to everyone by sending a message once. The application allows people create accounts, create groups and add registered users to the groups, and then send messages out to these groups whenever they want.

## Getting Started
Presently, because this app is still in development, The server is currently running on https://postitdanny.herokuapp.com/ , the API's can be accessed from a front end designed with React/ Flux Architecture.

## Features
API routes for users to create accounts and login to the application:
POST: /user/signup Username, Password & Email Address
POST: /user/signin Username & Password

An API route that allow users create broadcast groups:
POST: /group

An API route that allow users add other users to groups:
POST: /group/<group id>/user

An API route that allow users post messages to groups:
POST: /message/:groupId

An API that gets all registered users
GET: /getUsers

##  How to run the Run PostIt
After cloning repo, change directory to server and install dependencies; 
```
npm install
```
change directory to clients and install dependencies too;
```
cd install && npm install
```
next, still in the client directory run;
```
npm run start:dev
```
This will start the client server on localhost:3000 . go to a web browser and start using Postit

##  Dependencies
  express
  firebase:
  body-parser

  ## Acknowledgments
* Andela Bootcamp Facilitators and BFAs
* Andela Bootcampers
* Developer community
