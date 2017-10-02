import { EventEmitter } from 'events';
import superagent from 'superagent';
import AppDispatcher from '../dispatcher/AppDispatcher';
import { GET_GROUPS, CREATE_GROUP } from '../constants/groupConstants';

let groupList = [];
let messages = '';

class GroupStore extends EventEmitter {
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
    return messages;
  }
  allGroups() {
    return groupList;
  }
  /**
     * 
     * @param {*} userUid - Holds group name
     * @return {string} response from server   
     */
  getGroups({ userUid }) {
    superagent
      .get(`/getGroup/${userUid}`)
      .set('Accept', 'application/json')
      .end((error, response) => {
        if (error) {
          console.log(error);  // eslint-disable-line
          messages = JSON.parse(error);
        } else {
          groupList = JSON.parse(response.text);
        }
        this.emit('updateGroupStore');
      });
  }
  /**
     * 
     * @param {*} groupName - Holds group name
     * @return {string} response from server   
     */
  createGroup({ groupName, userId, userName }) {
    superagent.post('/group')
      .send({ groupName, userId, userName })
      .set('Accept', 'application/json')
      .end((error, response) => {
        if (error !== null) {
          messages = response.status.toString();
        } else {
          messages = response.text.toString();
        }
        this.emitChange();
      });
  }

  emitChange() {
    this.emit('change');
  }
  addChangeListener(callback) {
    this.on('change', callback);
    this.on('updateGroupStore', callback);
  }
  // Remove change listener
  removeChangeListener(callback) {
    this.removeListener('change', callback);
    this.removeChangeListener('updateGroupStore', callback);
  }
  dispatcherCallback({ action }) {
    switch (action.type) {
      case GET_GROUPS:
        this.getGroups(action.payload);
        break;
      case CREATE_GROUP:
        this.createGroup(action.payload);
        break;
      default:
        break;
    }
    return true;
  }
}
export default new GroupStore();
