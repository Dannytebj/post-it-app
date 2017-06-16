import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import Constants from '../constants/';
import superagent from 'superagent';
import { browserHistory } from "react-router";
// import Welcome from '../components/commons/main';

let message = '';
let received = {};


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
             received = JSON.parse(response.text);
                if (error !== null) {
                    message = received.message;
                } else {
                    const token = received.token;
                    localStorage.setItem('userToken', token);
                    message = received.message;
                    browserHistory.push('home');
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
                     browserHistory.push('home');
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
                    localStorage.clear();
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
            case Constants.CLICK_CREATE_GROUP:
                this.clickCreateGroup(action.payload);
                break;
            default:
                console.log('default', action);
                break;
        }
        return true;
    }

}

export default new LoginStore();
