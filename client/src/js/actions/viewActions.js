import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants';

// Define action methods
const ViewActions = {
    signIn: (email, password) => {
        AppDispatcher.handleViewAction({
            type: Constants.CLICK_SIGN_IN,
            payload: { email, password }
        });
    },
    signUp: (username, email, password) => {
        AppDispatcher.handleViewAction({
            type: Constants.CLICK_SIGN_UP,
            payload: { username, email, password }
        });
    },
    signOut: () => {
        AppDispatcher.handleViewAction({
            type: Constants.CLICK_SIGN_OUT
        });
    },
    createGroup: (groupName) => {
        AppDispatcher.handleViewAction({
            type:Constants.CLICK_CREATE_GROUP,
            payload: { groupName }
        });
    },
    addUser: (groupName, userId) => {
        AppDispatcher.handleViewAction({
            type:Constants.CLICK_ADD_USER,
            payload: { groupName, userId }
        });
    }
};

module.exports = ViewActions;
