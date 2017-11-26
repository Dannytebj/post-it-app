[![Build Status](https://travis-ci.org/Dannytebj/post-it-app.svg?branch=dev1)](https://travis-ci.org/Dannytebj/post-it-app)
[![Coverage Status](https://coveralls.io/repos/github/Dannytebj/post-it-app/badge.svg?branch=dev1)](https://coveralls.io/github/Dannytebj/post-it-app?branch=dev1)

PostIt is a simple application that allows friends and colleagues create groups for notifications. This way one person can post notifications to everyone by sending a message once. The application allows people create accounts, create groups and add registered users to the groups, and then send messages out to these groups whenever they want.
To view the project visit this [PostitByDanny](https://postitdanny.herokuapp.com)

## Key Features of this Application
+ Users can Create Account
+ Users can Log in

*Once user is authenticated:*
+ Users can Create group
+ Users can add other users to a group
+ Users can send broadcast message to group members
+ Users can retrieve all the messages posted to groups the user belongs to
+ Users can get in app notification, email notification and sms notification depending on the message prioriy
+ Users can Sign in with Google account
+ Users can reset thier Password


## Requirements
+ Node Enviroment 
+ Git 
+ Firebase Database Account
+ Postman
+ Google Chrome 

*N.B:* See package.json for project dependencies

## Local Installation Guide
* Ensure Node is installed
* clone the repo with the following command `git clone`
* Run `npm install` to install all the dependencies needed to run the application
* Install `webpack` globally
* To test the application, run `npm run test1`
* On your local machine Run `npm start` to start the server and visit `http://localhost:9999`

## Technologies
 * [ECMAScript 6](http://es6-features.org/): This is the newest version of JavsScript with new features such as arrow functions, spread and rest operators and many more.
 * [REACT](https://facebook.github.io/react/): REACT is a JavaScript framework developed by Facebook and it is used for developing web application. REACT is the 'VIEW' in the MVC architecture.
 * [FLUX](http://facebook.github.io/flux/): Flux is an architecture used for building stable and efficient web applications. Flux design is a unidirectional flow of data.
 * [Babel:](https://babeljs.io/)  Babel is used to transpile es6 down to es5.
 * [Webpack:](https://webpack.github.io/docs/what-is-webpack.html)  Webpack is used to bundle modules with dependencies and run mundane tasks.
 * [Axios:](https://www.npmjs.com/package/axios)  Axios is an http client library used in making API calls.
 * [Jest:](https://facebook.github.io/jest/) Jest is used to run tests.

 ## Coding Style
- Airbnb 

## Language
- Javascript


## Limitations
+ Users cannot choose to accept invitation request
+ Users cannot leave a group
+ Users cannot delete a message when sent

## Contributions
 Contributions are always welcome. If you are interested in enhancing the features in the project, follow these steps below:
 + Fork the project to your repository then clone it to your local machine.
 + Create a new branch and make features that will enhance it.
 + If the you wish to update an existing enhancement submit a pull request against `dev1` branch.
 + If you find bugs in the application, create a `New Issue` and let me know about it.
 + If you need clarification on what is not clear, contact me via mail [daniel.atebije@andela.com](mailto:daniel.atebije@andela.com)

## Author
    Daniel Atebije

## License & Copyright
MIT © [Daniel Atebije](https://github.com/Dannytebj)

Licensed under the [MIT License](LICENSE).