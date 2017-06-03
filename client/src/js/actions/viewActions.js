import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants';

// Define action methods
const ViewActions = {
    signIn: (email, password) => {
        AppDispatcher.handleViewAction({
            type: Constants.CLICK_SIGN_IN,
            payload: { email, password }
        });
    }
};

module.exports = ViewActions;