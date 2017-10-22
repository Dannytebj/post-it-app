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
let groupArray = [];
let groupUsersArray = [];
let allUserArray = [];

function addToGroupArray(payload) {
  const { newGroupName } = payload;
  groupArray.push(newGroupName);
}
function addToUserArray(payload) {
  const { groupUser } = payload;
    // console.log(allUserArray, ' ====> From GroupStore');
  // groupUsersArray.push(groupUser);
}
function setGroups(payload) {
  const { groups } = payload;
  groupArray = groups;
  // console.log(groupArray, ' ====> From GroupStore');
  // return groupArray;
}
function setGroupUsers(payload) {
  const { groupUser } = payload;
  // console.log(groupUser, '======> groupStore');
  groupUsersArray = groupUser;
  return groupUsersArray;
}
function setAllUsers(payload) {
  const { allUsers } = payload;
  allUserArray = allUsers;
  // return allUserArray;
}

class GroupStore extends EventEmitter {
  constructor() {
    super();
    this.dispatchToken = AppDispatcher.register(
      this.dispatcherCallback.bind(this));
  }
  
  getGroups() {
    return groupArray;
  }
  getUsers() {
    return groupUsersArray;
  }
  getAllUsers() {
    return allUserArray;
  }
  emitChange() {
    this.emit('change');
  }
  addChangeListener(callback) {
    this.on('change', callback);
    // this.on('updateGroups', callback);
    // this.on('updateAllUsers', callback);
    // this.on('updateGroupUsers', callback);
    // this.on('userAdded', callback);
  }

  // Remove change listener
  removeChangeListener(callback) {
    this.removeListener('change', callback);
    // this.removeListener('updateGroups', callback);
    // this.removeListener('updateGroupUsers', callback);
    // this.removeListener('updateAllUsers', callback);
    // this.removeListener('userAdded', callback);
  }

  dispatcherCallback({ action }) {
    switch (action.type) {
      case AppConstants.GET_GROUPS:
        AppAPI.getGroups(action.payload);
        this.emitChange();
        break;
      case AppConstants.RECEIVE_GROUPS:
        setGroups(action.payload);
        this.emitChange();
        break;
      case AppConstants.CREATE_GROUP:
        addToGroupArray(action.payload);
        AppAPI.createGroup(action.payload);
        this.emitChange();
        break;
      case AppConstants.GET_GROUP_USERS:
        AppAPI.getGroupUsers(action.payload);
        this.emitChange();
        break;
      case AppConstants.RECEIVE_GROUP_USERS:
        setGroupUsers(action.payload);
        this.emitChange();
        // this.emit('updateGroupUsers');
        break;
      case AppConstants.GET_ALL_USERS:
        AppAPI.getAllUsers(action.payload);
        this.emitChange();
        break;
      case AppConstants.RECEIVE_ALL_USERS:
        setAllUsers(action.payload);
        this.emitChange();
        // this.emit('updateAllUsers');
        break;
      case AppConstants.ADD_USER:
        AppAPI.addUser(action.payload);
        addToUserArray(action.payload);
        this.emitChange();
        break;
      case AppConstants.ADD_USER_RESPONSE:
        this.emitChange();
        // this.emit('updateGroupUsers');
        break;
      default:
        break;
    }
    return true;
  }
}

export default new GroupStore();
