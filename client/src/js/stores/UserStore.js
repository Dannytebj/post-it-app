import { EventEmitter } from 'events';
import superagent from 'superagent';
import { browserHistory } from "react-router";
import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/';

/**
 * This Store Handles Sign In, SignIn(Google)
 * Sign Out, Create Group, and SignOut.
 * @param {string} message - Initialized empty string to 
 * hold status messages from server
 * @param {object} received - Initialized empty object to 
 * hold response data from server
 * @param {array} userArray - Holds an array of Users from dataBase
 */
let message = '';
let received = {};
let userArray = []; // eslint-disable-line

class LoginStore extends EventEmitter {
  constructor() {
    super();
    this.dispatchToken = AppDispatcher.register(
      this.dispatcherCallback.bind(this));
  }
  /**
     * @method getMessage - Returns status message from server
     * @return {string} - current status message
     */
  getMessage() {
    return message;
  }
  /**
     * @method getUsers
     * @return {array} - Returns an Array of Users
     */
  getUsers() {
    return userArray;
  }

  /**
     * 
     * @param {string} email - email of user
     * @param {string} password - users password
     * @return {array} array of users   
     */
  clickSignIn({ email, password }) {
    // console.log('...signing user in');
    superagent.post('/signIn')
      .send({ email, password })
      .set('Accept', 'application/json')
      .end((error, response) => {
        if (error !== null) {
          message = response.text.toString();
          console.log(message);
          this.emit('signInError');
          // message = received.message;
        } else {
          received = JSON.parse(response.text);
          const userName = received.userName;
          const userUid = received.userUid;
          localStorage.setItem('userName', userName);
          localStorage.setItem('uid', userUid);
          browserHistory.push('home');
          this.emit('welcome');
        }
      });
  }
  /**
     * 
     * @param {string} email - email of user
     * @param {string} password - users password
     * @param {string} username - hold Users full name
     * @param {string} phoneNumber - holds user phone numbers 
     * @return {array} array of users   
     */

  clickSignUp({ email, password, username, phoneNumber }) {
    superagent.post('/signUp')
      .send({ username,
        email, 
        password,
        phoneNumber })
      .set('Accept', 'application/json')
      .end((error, response) => {
        if (error !== null) {
          message = response.text.toString();
          this.emit('signUpError');
        } else {
          message = response.text.toString();
          this.emit('welcome');
          browserHistory.push('home');
        }
      });
  }
  /**
     * Sign's Users Out and clears localstorage
     */
  clickSignOut() {
    superagent.post('/signOut')
      .end((error, response) => {
        if (error !== null) {
          message = response.text.toString();
        } else {
          window.location.reload();
          browserHistory.push('/');
          gapi.auth2.getAuthInstance().signOut();
          localStorage.clear();
          // message = response.text.toString();
        }
        this.emitChange();
      });
  }

  /**
     * Method that handles signIn with Google Option
     * @param {string} idToken - token collected from google 
     */
  signInWithGoogle({ idToken }) {
    superagent
      .post('/signIn/google')
      .send({ idToken })
      .set('Accept', 'application/json')
      .end((error, response) => {
        received = JSON.parse(response.text);
        if (error !== null) {
          message = ({ message: response.status.toString(), 
            error: error.message });
        } else {
          // console.log('there were no errors');
          const userName = received.user.displayName;
          const userUid = received.user.uid;
          localStorage.setItem('userName', userName);
          localStorage.setItem('uid', userUid);
          browserHistory.push('home');
        }
        this.emitChange();
      });
  }
  /**
     * 
     */
  resetPassword({ email }) {
    // console.log('sending password reset mail');
    superagent
      .post('/resetPassword')
      .send({ email })
      .set('Accept', 'application/json')
      .end((error, response) => {
        if (error !== null) {
          message = response.body.error.message;
          this.emit('resetError');
        } else {
          message = response.text.toString();
          this.emit('messageSent');
        }
      });
  }

  emitChange() {
    this.emit('change');
  }
  addChangeListener(callback) {
    this.on('change', callback);
    this.on('messageSent', callback);
    this.on('resetError', callback);
    this.on('signUpError', callback);
    this.on('signInError', callback);
    this.on('welcome', callback);
  }
  // Remove change listener
  removeChangeListener(callback) {
    this.removeListener('change', callback);
    this.removeListener('messageSent', callback);
    this.removeListener('resetError', callback);
    this.removeListener('signUpError', callback);
    this.removeListener('signInError', callback);
    this.removeListener('welcome', callback);
    
   
  }
  dispatcherCallback({ action }) {
    switch (action.type) {
      case Constants.CLICK_SIGN_IN:
        this.clickSignIn(action.payload);
        break;
      case Constants.CLICK_SIGN_UP:
        this.clickSignUp(action.payload);
        break;
      case Constants.CLICK_SIGN_OUT:
        this.clickSignOut();
        break;
      case Constants.GET_USER:
        this.getAllUsers();
        break;
      case Constants.SIGN_IN_GOOGLE:
        this.signInWithGoogle(action.payload);
        break;
      case Constants.RESET_PASSWORD:
        this.resetPassword(action.payload);
        break;
      default:
        break;
    }
    return true;
  }
}

export default new LoginStore();
