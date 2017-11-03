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
  signUp: (email, password, username, phoneNumber) => {
    AppDispatcher.handleViewAction({
      type: AppConstants.CLICK_SIGN_UP,
      payload: { email, password, username, phoneNumber },
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

  /**
 * Action methods that fetchs 
 * all Users in a group 
 * @param {string} groupId Array of Groups
 */

  getGroupUsers: (groupId) => {
    AppDispatcher.handleViewAction({
      type: AppConstants.GET_GROUP_USERS,
      payload: { groupId },
    });
  },

  /**
 * Action methods that receives 
 * all Users in a group from server response
 * @param {string} groupId Array of Groups
 */
  receiveGroupUsers: (groupUser) => {
    AppDispatcher.handleViewAction({
      type: AppConstants.RECEIVE_GROUP_USERS,
      payload: { groupUser },
    });
  },
  /**
 * Action methods that fetchs 
 * all Users 
 * @param {string} groupId Array of Groups
 */

  getAllUsers: (groupId) => {
    AppDispatcher.handleViewAction({
      type: AppConstants.GET_ALL_USERS,
      payload: { groupId },
    });
  },

  /**
 * Action methods that receives 
 * all Users from server response
 * @param {string} groupId Array of Groups
 */
  receiveAllUsers: (allUsers) => {
    AppDispatcher.handleViewAction({
      type: AppConstants.RECEIVE_ALL_USERS,
      payload: { allUsers },
    });
  },
  /**
 * Action methods that Adds 
 *  Users to a groupserver response
 * @param {string} groupId groupId to Add User
 * @param {string} groupName Name of Group
 * @param {string} name Name of User
 * @param {string} id Id of User
 */
  addUser: (groupId, groupName, name, id) => {
    AppDispatcher.handleViewAction({
      type: AppConstants.ADD_USER,
      payload: { groupId, groupName, name, id },
    });
  },
  addUserResponse: () => {
    AppDispatcher.handleViewAction({
      type: AppConstants.ADD_USER_RESPONSE,
    });
  },
  /**
 * Action methods that Adds 
 *  Users to a groupserver response
 * @param {string} groupId groupId to Add User
 * @param {string} message Name of Group
 * @param {string} name Name of User
 * @param {string} id Id of User
 * @param {string} priority priority of message
 */
  postMessage: (groupId, message, priority, id, name) => {
    AppDispatcher.handleViewAction({
      type: AppConstants.POST_MESSAGE,
      payload: { groupId, message, priority, id, name },
    });
  },
  getMessages: (groupId) => {
    AppDispatcher.handleViewAction({
      type: AppConstants.GET_ALL_MESSAGES,
      payload: { groupId },
    });
  },
  updateMessageStore: (id, message, name) => {
    AppDispatcher.handleViewAction({
      type: AppConstants.UPDATE_MESSAGE_STORE,
      payload: { id, message, name },
    });
  },
  receiveAllMessages: (messages) => {
    AppDispatcher.handleViewAction({
      type: AppConstants.RECEIVE_ALL_MESSAGES,
      payload: { messages },
    });
  }, 
  resetMessageStore: () => {
    AppDispatcher.handleViewAction({
      type: AppConstants.RESET_STORE,
    });
  },
};

export default ViewActions;
