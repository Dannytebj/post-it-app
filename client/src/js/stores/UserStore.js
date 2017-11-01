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
