import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import Constants from '../constants/';
import superagent from 'superagent';

let message = '';

class LoginStore extends EventEmitter {
    constructor() {
        super();
        this.dispatchToken = AppDispatcher.register(this.dispatcherCallback.bind(this));
    }
    getMessage() {
        return message;
    }
//     testing() {
//     superagent.get('https://postitdanny.herokuapp.com/')
//       .set('Accept', 'application/json')
//       .end(function(err, response) {
//         if (err){
//             return console.error(err);
//         } else{
//             message = response
//         }

//       });
//   }
    clickSignIn({ email, password }) {
        console.log(email, password);
        superagent.post('https://postitdanny.herokuapp.com/')
            .query({ email: email, password: password })
            .end((error, response) => {
                if (error !== null) {
                    message = response.status;
                } else {
                    message = response;
                }
                this.emitChange();
            });
    }
    emitChange() {
        this.emit('change');
    }
    addChangeListener(callback) {
        this.on('change', callback);
    }
    // Remove change listener
    removeChangeListener(callback) {
        this.removeListener('change', callback);
    }
    dispatcherCallback({ action }) {
        switch (action.type) {
            case Constants.CLICK_SIGN_IN:
                this.clickSignIn(action.payload);
                break;
            default:
                console.log('default', action);
                break;
        }
        return true;
    }

}

export default new LoginStore();
