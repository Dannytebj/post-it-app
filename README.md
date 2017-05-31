# PostIt
PostIt is a simple application that allows friends and colleagues create groups for notifications. This way one person can post notifications to everyone by sending a message once. The application allows people create accounts, create groups and add registered users to the groups, and then send messages out to these groups whenever they want.

## Getting Started
Presently, because this app is still in development, you can only test its features using PostMan, and nodemon to run on console.

## Features
API routes for users to create accounts and login to the application:
POST: /user/signup Username, Password & Email Address
POST: /user/signin Username & Password

An API route that allow users create broadcast groups:
POST: /group

An API route that allow users add other users to groups:
POST: /group/<group id>/user

##  How to run the API's
FYI,these API's use the POST method, So you can test them using PostMan :
1) https://postitdanny.herokuapp.com/signIn
2) https://postitdanny.herokuapp.com/signUp
3) https://postitdanny.herokuapp.com/group
4) https://postitdanny.herokuapp.com/signOut

### Installing
After collecting and installing the prerequisites:
-
Install dependencies
```
npm install
```

##  Dependencies
  express
  firebase:
  body-parser

  ## Acknowledgments
* Andela Bootcamp Facilitators and BFAs
* Andela Bootcampers
* Developer community
