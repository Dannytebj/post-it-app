import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import AppAPI from '../utils/AppAPI';

/**
 * @description This flux store handles signingIn,
 * signingUp, signingOut, and ResetPassword
 * 
 * @class LoginStore
 * @extends {EventEmitter}
 */
class LoginStore extends EventEmitter {
  /**
   * @constructor
   * Creates an instance of LoginStore.
   * @memberof LoginStore
   */
  constructor() {
    super();
    this.dispatchToken = AppDispatcher.register(
      this.dispatcherCallback.bind(this));
  }
  /**
 * @description This method emits a change event
 * everytime the store is updated
 * 
 * @memberof LoginStore
 */
  emitChange() {
    this.emit('change');
  }
  /**
   * @description This method listens for change event
   * in the store and on change calls the callback
   * 
   * @param {any} callback 
   * @memberof LoginStore
   */
  addChangeListener(callback) {
    this.on('change', callback);
  }
  /**
  * @description This method removes change listeners
  * 
  * @param {any} callback 
  * @memberof LoginStore
  */
  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }
  /**
 * 
 * 
 * @param {any} { action } 
 * @returns 
 * @memberof LoginStore
 */
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
