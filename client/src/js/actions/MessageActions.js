import AppDispatcher from '../dispatcher/AppDispatcher';
import {
    ADD_NEW_MESSAGE,
    GET_ALL_MESSAGES
} from '../constants/messageConstants.js';

// Define action methods
const MessageActions = {
   /**
    * This action post messages to database
    @param {*} message - Variable that holds user messages
    @param {*} groupId 
    @param priority
    */
    addMessage: (message, groupId, priority) => {
        AppDispatcher.handleViewAction({
            type:ADD_NEW_MESSAGE,
            payload: {message, groupId, priority}
        })
    },
    /**
     * This action get's all messages in a group
     */
    getGroupMessages:(groupId)=> {
        AppDispatcher.handleViewAction({
            type: GET_ALL_MESSAGES,
            payload: { groupId }
        })

    }

};

module.exports = MessageActions;