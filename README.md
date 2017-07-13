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

### Functionalities Currently Working
At the present stage of development, the following functionalities have been implemented;
The front end of Postit is developed with ReactJs using the Flux Architecture;
1) Components to SignUp, SignIn and SignOut users
2) A component that allows registered users create a group 
3) A component that allows registered users add other users to their group

##  How to run PostIt
After cloning repo, change directory to client and install dependencies; 
```
npm install
```
change directory to clients and install dependencies too;
```
cd client && npm install
```
Next, still in the client directory run;
```
npm run start:dev
```
This will start the client server on http://localhost:3000 . go to a web browser and start using Postit.

### N.B 
After signing up, new user must activate account via email provided before you can sign In and use postit.

##  Dependencies
  express
  firebase
  body-parser
  supertest
  chai
  react
  flux
  react-router
  keymirror
  underscore

  ## Acknowledgments
* Andela Bootcamp Facilitators and BFAs
* Andela Bootcampers
* Developer community
