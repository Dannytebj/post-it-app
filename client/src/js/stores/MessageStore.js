import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import AppAPI from '../utils/AppAPI';


let groupArray = [];
let messageArray = [];
/**
 * @description This function sets the  messageArray with 
 * all messages fetched from  database
 *
 * @param {array} payload 
 */
function setMessages(payload) {
  const { messages } = payload;
  messageArray = messages;
}
/**
 * @description This function sets the groupArray with
 * all groups the user belongs to
 * 
 * @param {any} payload 
 */
function setGroups(payload) {
  const { groups } = payload;
  groupArray = groups;
}
/**
 * @description This function updates the messageArray when 
 * a new message is posted 
 * 
 * @param {any} payload 
 */
function updateMessages(payload) {
  const { id, message, name, priority, timeStamp } = payload;
  messageArray.push({ id, message, name, priority, timeStamp });
}
/**
 * @description This function resets the messageArray for 
 * new group messages
 * 
 */
function clearMessageArray() {
  messageArray = [];
}
/**
 * @description This flux store handles all message actions
 * 
 * @class MessageStore
 * @extends {EventEmitter}
 */
class MessageStore extends EventEmitter {
  /**
   * @constructor
   * Creates an instance of MessageStore.
   * @memberof MessageStore
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
   * @memberof MessageStore
   */
  getGroups() {
    return groupArray;
  }
  /**
 * @description returns all messages in the message array
 * 
 * @returns {array} messageArray
 * @memberof MessageStore
 */
  getAllMessages() {
    return messageArray;
  }
  /**
   * @description This method emits a change event
   * everytime the store is updated
   * 
   * @memberof MessageStore
   */
  emitChange() {
    this.emit('change');
  }
  /**
   * @description This method listens for change event
   * in the store and on change calls the callback
   * 
   * @param {any} callback 
   * @memberof MessageStore
   */
  addChangeListener(callback) {
    this.on('change', callback);
  }

  /**
   * @description This method removes change listeners
   * 
   * @param {any} callback 
   * @memberof MessageStore
   */
  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }
  /**
 * 
 * 
 * @param {any} { action } 
 * @returns 
 * @memberof MessageStore
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
      case AppConstants.POST_MESSAGE:
        AppAPI.postMessage(action.payload);
        this.emitChange();
        break;
      case AppConstants.GET_ALL_MESSAGES:
        clearMessageArray();
        AppAPI.getAllMessages(action.payload);
        this.emitChange();
        break;
      case AppConstants.RECEIVE_ALL_MESSAGES:
        setMessages(action.payload);
        this.emitChange();
        break;
      case AppConstants.UPDATE_MESSAGE_STORE:
        updateMessages(action.payload);
        this.emitChange();
        break;
      case AppConstants.RESET_STORE:
        clearMessageArray();
        this.emitChange();
        break;
      default:
        break;
    }
    return true;
  }
}
export default new MessageStore();
