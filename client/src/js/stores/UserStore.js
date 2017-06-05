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

    clickSignIn({ email, password }) {
        console.log(email, password);
        superagent.post('https://postitdanny.herokuapp.com/signIn')
            .send({ email: email, password: password })
            .set('Accept', 'application/json')
            .end((error, response) => {
                if (error !== null) {
                    message = response.status.toString();
                } else {
                    message = response.status.toString();
                }
                this.emitChange();
            });
    }

    clickSignUp({ email, password, username}) {
        superagent.post('https://postitdanny.herokuapp.com/signUp')
            .send({username: username , email: email, password: password})
            .set('Accept', 'application/json')
            .end((error, response) => {
                if (error !== null) {
                    message = response.status.toString();
                } else {
                    message = response.text.toString();
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
            case Constants.CLICK_SIGN_UP:
                this.clickSignUp(action.payload);
                break;
            default:
                console.log('default', action);
                break;
        }
        return true;
    }

}

export default new LoginStore();
