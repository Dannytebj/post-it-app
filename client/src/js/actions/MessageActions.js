import AppDispatcher from '../dispatcher/AppDispatcher';
import {
    ADD_NEW_MESSAGE,
    GET_ALL_MESSAGES
} from '../constants/messageConstants.js';

// Define action methods
const MessageActions = {
    // postMessage: (message, groupId) => {
    //     AppDispatcher.handleViewAction({
    //         type: ADD_NEW_MESSAGE,
    //         payload: { message, groupId }
    //     })
    // },
    addMessage: (message, groupId) => {
        AppDispatcher.handleViewAction({
            type:ADD_NEW_MESSAGE,
            payload: {message, groupId}
        })
    },
    getGroupMessages:(groupId)=> {
        AppDispatcher.handleViewAction({
            type: GET_ALL_MESSAGES,
            payload: { groupId }
        })

    }

};

module.exports = MessageActions;