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

function addToGroupArray(payload) {
  const { newGroupName } = payload;
  groupArray.push(newGroupName);
}
function setGroups(payload) {
  const { groups } = payload;
  groupArray = groups;
  return groupArray;
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
  emitChange() {
    this.emit('change');
  }
  addChangeListener(callback) {
    this.on('change', callback);
    this.on('updateGroups', callback);
  }
  // Remove change listener
  removeChangeListener(callback) {
    this.removeListener('change', callback);
    this.removeListener('updateGroups', callback);

  }

  dispatcherCallback({ action }) {
    switch (action.type) {
      case AppConstants.GET_GROUPS:
        AppAPI.getGroups(action.payload);
        this.emitChange();
        break;
      case AppConstants.RECEIVE_GROUPS:
        setGroups(action.payload);
        this.emit('updateGroups');
        break;
      case AppConstants.CREATE_GROUP:
        addToGroupArray(action.payload);
        AppAPI.createGroup(action.payload);
        this.emitChange();
        break;
      default:
        break;
    }
    return true;
  }
}

export default new GroupStore();
