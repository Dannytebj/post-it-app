import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import Constants from '../constants/';
import superagent from 'superagent';
import { browserHistory } from "react-router";
// import Welcome from '../components/commons/main';

let message = '';
let received = {};
let userArray = [];


class LoginStore extends EventEmitter {
    constructor() {
        super();
        this.dispatchToken = AppDispatcher.register(this.dispatcherCallback.bind(this));
    }
    getMessage() {
        return message;
    }
    getUsers (){
       return userArray;
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
                    // message = received.message;
                    const userName = received.userName,
                        userUid = received.userUid;
                    localStorage.setItem('userName', userName);
                    localStorage.setItem('uid', userUid);
                    browserHistory.push('home');
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
                    window.location.reload();
                    browserHistory.push('/');
                }
            })
    }

    clickCreateGroup({ groupName }) {
        superagent.post('https://postitdanny.herokuapp.com/group')
        .send({ groupName: groupName})
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
    getGroup(){
        superagent.get('https://postitdanny.herokuapp.com/getUsers')
        .set('Accept', 'application/json')
            .end((error, response) => {
                const collected = JSON.parse(response.text);
                if(error !== null) {
                    message = response.text.toString();
                } else {
                    // console.log(Object.values(collected));
                    Object.entries(collected).forEach(([key, value]) => {
                        userArray = value['name'];
                        // console.log(users);
                    })
                    // Object.keys(collected).forEach((key) => {
                    //     let obj =collected[key];
                    //     console.log(obj);
                    // });
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
            case Constants.CLICK_SIGN_OUT:
                this.clickSignOut()
                break;
            case Constants.CLICK_CREATE_GROUP:
                this.clickCreateGroup(action.payload);
                break;
            case Constants.GET_USER:
                this.getGroup()
                break;
            default:
                console.log('default', action);
                break;
        }
        return true;
    }

}

export default new LoginStore();
