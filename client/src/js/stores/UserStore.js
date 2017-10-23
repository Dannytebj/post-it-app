import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import AppAPI from '../utils/AppAPI';

/**
 * This Store Handles Sign In, SignIn(Google)
 * Sign Out, Create Group, and SignOut.
 * @param {string} message - Initialized empty string to 
 * hold status messages from server
 * @param {object} received - Initialized empty object to 
 * hold response data from server
 * @param {array} userArray - Holds an array of Users from dataBase
 */

class LoginStore extends EventEmitter {
  constructor() {
    super();
    this.dispatchToken = AppDispatcher.register(
      this.dispatcherCallback.bind(this));
  }

  /**
     * 
     * @param {string} email - email of user
     * @param {string} password - users password
     * @return {array} array of users   
     */
  clickSignIn({ email, password }) {
    superagent.post('/signIn')
      .send({ email, password })
      .set('Accept', 'application/json')
      .end((error, response) => {
        if (error !== null) {
          message = response.text.toString();
          // console.log(message);
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
  }
  // Remove change listener
  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }

  dispatcherCallback({ action }) {
    switch (action.type) {
      case AppConstants.CLICK_SIGN_IN:
        AppAPI.signIn(action.payload);
        this.emitChange();
        break;
      case AppConstants.CLICK_SIGN_UP:
        AppAPI.signUp(action.payload);
        this.emitChange();
        break;
      case AppConstants.CLICK_SIGN_OUT:
        AppAPI.signOut();
        this.emitChange();
        break;
      case AppConstants.SIGN_IN_GOOGLE:
        AppAPI.signInWithGoogle(action.payload);
        this.emitChange();
        break;
      case AppConstants.RESET_PASSWORD:
        AppAPI.resetPassword(action.payload);
        this.emitChange();
        break;
      default:
        break;
    }
    return true;
  }
}

export default new LoginStore();
