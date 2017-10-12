import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const ViewActions = {
/**
 * Define action methods for User view Actions
 * @param {*} email user email address
 * @param {*} password user password
 */
  signIn: (email, password) => {
    AppDispatcher.handleViewAction({
      type: AppConstants.CLICK_SIGN_IN,
      payload: { email, password },
    });
  },
  /**
 * Define action methods for User view Actions
 * @param {string} email user email address
 * @param {string} password user password
 * @param {string} username users fullname
 * @param {string} phoneNumber Users phone Number
 */
  signUp: (username, email, password, phoneNumber) => {
    AppDispatcher.handleViewAction({
      type: AppConstants.CLICK_SIGN_UP,
      payload: { username, email, password, phoneNumber },
    });
  },
  /**
 * Flux Action Method to sign Out users
 */
  signOut: () => {
    AppDispatcher.handleViewAction({
      type: AppConstants.CLICK_SIGN_OUT,
    });
  },
  /**
     * Action method that let's Users Sign In with Gogle
     */
  signInWithGoogle: (idToken) => {
    AppDispatcher.handleViewAction({
      type: AppConstants.SIGN_IN_GOOGLE,
      payload: { idToken },
    });
  },
  /**
     * Action method that lets users reset password
     * @param {*} email the email of the user
     */
  sendPasswordReset: (email) => {
    AppDispatcher.handleViewAction({
      type: AppConstants.RESET_PASSWORD,
      payload: { email },
    });
  },
  /**
 * Action method to get User's groups
 * @param {string} userUid 
 */
  getGroups: (userUid) => {
    console.log(userUid);
    AppDispatcher.handleViewAction({
      type: AppConstants.GET_GROUPS,
      payload: { userUid },
    });
  },

  /**
 * Action methods that lets User create a group .
 * @param {*} groupName name of the group created
 */

  createGroup: (groupName, userId, userName) => {
    AppDispatcher.handleViewAction({
      type: AppConstants.CREATE_GROUP,
      payload: { groupName, userId, userName },
    });
  },

  /**
 * Action methods that lets User Receives 
 * user's groups from server
 * @param {Array} groups Array of Groups
 */

  receiveGroups: (groups) => {
    AppDispatcher.handleViewAction({
      type: AppConstants.RECEIVE_GROUPS,
      payload: { groups },
    });
  },

};

export default ViewActions;
