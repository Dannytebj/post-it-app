import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants';

const ServerActions = {
    getUser: () => {
        AppDispatcher.handleServerAction({
            type: Constants.VIEW_CURRENT_USER,
        })
    }
};
module.exports = ServerActions;