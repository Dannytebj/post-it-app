import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import AppAPI from '../utils/AppAPI';

let groupArray = [];
let groupUsersArray = [];
let allUserArray = [];
/**
 * @description this function populates the groupArray with
 * groups fetched from database
 * 
 * @param {any} payload 
 */
function setGroups(payload) {
  const { groups } = payload;
  groupArray = groups;
}
/**
 * @description This function populates the groupUsersArray
 * with groupUsers fetched from database
 * 
 * @param {any} payload 
 * @returns 
 */
function setGroupUsers(payload) {
  const { groupUser } = payload;
  groupUsersArray = groupUser;
  return groupUsersArray;
}
/**
 * This function updates the groupUsersArray when 
 * a new user is added to the group 
 * 
 * @param {any} payload 
 */
function updateGroupUsers(payload) {
  const { groupId, groupName, name, id } = payload;
  const groupUser = { groupId, groupName, name, id };
  groupUsersArray.push(groupUser);
}
/**
 * @description This function populates the allUserArray
 * with all users fetched from the database
 * 
 * @param {any} payload 
 */
function setAllUsers(payload) {
  const { allUsers } = payload;
  allUserArray = allUsers;
}

/**
 * @description This flux store handles all group actions
 * 
 * @class GroupStore
 * @extends {EventEmitter}
 */
class GroupStore extends EventEmitter {
  /**
   * @constructor
   * Creates an instance of GroupStore.
   * @memberof GroupStore
   */
  constructor() {
    super();
    this.dispatchToken = AppDispatcher.register(
      this.dispatcherCallback.bind(this));
  }
  /**
   * 
   * 
   * @returns {array} groupArray
   * @memberof GroupStore
   */
  getGroups() {
    return groupArray;
  }
  /**
   * 
   * 
   * @returns {array} groupUsersArray
   * @memberof GroupStore
   */
  getUsers() {
    return groupUsersArray;
  }
  /**
   * 
   * 
   * @returns allUserArray
   * @memberof GroupStore
   */
  getAllUsers() {
    return allUserArray;
  }
  /**
   * @description This method emits a change event
   * everytime the store is updated
   * 
   * @memberof GroupStore
   */
  emitChange() {
    this.emit('change');
  }
  /**
   *  @description This method listens for change event
   * in the store and on change calls the callback
   * 
   * @param {any} callback 
   * @memberof GroupStore
   */
  addChangeListener(callback) {
    this.on('change', callback);
  }

  /**
   *  @description This method removes change listeners
   * 
   * @param {any} callback 
   * @memberof GroupStore
   */
  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }
  /**
 * 
 * 
 * @param {any} { action } 
 * @returns 
 * @memberof GroupStore
 */
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
        break;
      case AppConstants.GET_ALL_USERS:
        AppAPI.getAllUsers(action.payload);
        this.emitChange();
        break;
      case AppConstants.RECEIVE_ALL_USERS:
        setAllUsers(action.payload);
        this.emitChange();
        break;
      case AppConstants.ADD_USER:
        AppAPI.addUser(action.payload);
        updateGroupUsers(action.payload);
        this.emitChange();
        break;
      case AppConstants.ADD_USER_RESPONSE:
        this.emitChange();
        break;
      default:
        break;
    }
    return true;
  }
}

export default new GroupStore();
