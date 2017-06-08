import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import Constants from '../constants/';
import superagent from 'superagent';
import { browserHistory } from "react-router";
// import Welcome from '../components/commons/main';

let message = '';
let token;

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
                    message = response.text.toString();
                } else {
                    // token = response.data.token;
                    // console.log(token);
                    // this.set('userToken', token);
                    // console.log(token.uid);
                    message = response.text.toString();
                    browserHistory.push('main');
                    // window.location.href = `${window.location.origin}/main`;
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
                     browserHistory.push('main');
                    // window.location.href = `${window.location.origin}/main`;
                }
                this.emitChange();
            });

    }

    clickSignOut(){
        superagent.post('https://postitdanny.herokuapp.com/signOut')
            .end((error, response) => {
                if(error!== null){
                    message = response.text.toString();
                } else {
                    message = response.text.toString();
                     browserHistory.push('login');
                }
            })
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
            case Constants.CLICK_SIGN_OUT:
                this.clickSignOut()
                break;
            default:
                console.log('default', action);
                break;
        }
        return true;
    }

}

export default new LoginStore();
