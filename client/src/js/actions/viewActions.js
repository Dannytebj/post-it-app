import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants';

const ViewActions = {
/**
 * Define action methods for User view Actions
 * @param {*} email user email address
 * @param {*} password user password
 */
  signIn: (email, password) => {
    AppDispatcher.handleViewAction({
      type: Constants.CLICK_SIGN_IN,
      payload: { email, password }
    });
  },
  /**
 * Define action methods for User view Actions
 * @param {*} email user email address
 * @param {*} password user password
 * @param {*} username users fullname
 * @param {*} phoneNumber Users phone Number
 */
  signUp: (username, email, password, phoneNumber) => {
    AppDispatcher.handleViewAction({
      type: Constants.CLICK_SIGN_UP,
      payload: { username, email, password, phoneNumber },
    });
  },
  /**
 * Flux Action Method to sign Out users
 */
  signOut: () => {
    AppDispatcher.handleViewAction({
      type: Constants.CLICK_SIGN_OUT,
    });
  },
  /**
 * Action methods that lets User create a group .
 * @param {*} groupName name of the group created
 */

  createGroup: (groupName) => {
    AppDispatcher.handleViewAction({
      type: Constants.CLICK_CREATE_GROUP,
      payload: { groupName },
    });
  },
  /**
     * Action method that let's Users Sign In with Gogle
     */
  signInWithGoogle: (idToken) => {
    AppDispatcher.handleViewAction({
      type: Constants.SIGN_IN_GOOGLE,
      payload: { idToken },
    });
  },
  /**
     * Action method that lets users reset password
     * @param {*} email the email of the user
     */
  sendPasswordReset: (email) => {
    AppDispatcher.handleViewAction({
      type: Constants.RESET_PASSWORD,
      payload: { email },
    });
  },
};

export default ViewActions;
