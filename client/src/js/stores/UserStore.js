import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import Constants from '../constants/';
import superagent from 'superagent';
import { browserHistory } from "react-router";

/**
 * This Store Handles Sign In, SignIn(Google)
 * Sign Out, Create Group, and SignOut.
 * @param {string} message - Initialized empty string to 
 * hold status messages from server
 * @param {object} received - Initialized empty object to 
 * hold response data from server
 * @param {array} userArray - Holds an array of Users from dataBase
 */
let message = '';
let received = {};
let userArray = [];

class LoginStore extends EventEmitter {
    constructor() {
        super();
        this.dispatchToken = AppDispatcher.register(
            this.dispatcherCallback.bind(this));
    }
    /**
     * @method getMessage - Returns status message from server
     * @return {string} - current status message
     */
    getMessage() {
        return message;
    }
    /**
     * @method getUsers
     * @return {array} - Returns an Array of Users
     */
    getUsers (){
       return userArray;
    }

    /**
     * 
     * @param {*} email - email of user
     * @param {*} password - users password
     * @return {array} array of users   
     */
    clickSignIn({ email, password }) {
        console.log('...signing user in');
        superagent.post('/signIn')
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
    /**
     * 
     * @param {*} email - email of user
     * @param {*} password - users password
     * @param {*} username - hold Users full name
     * @param {*} phoneNumber - holds user phone numbers 
     * @return {array} array of users   
     */

    clickSignUp({ email, password, username, phoneNumber}) {
        superagent.post('https://postitdanny.herokuapp.com/signUp')
            .send({username: username ,
                 email: email, 
                 password: password,
                 phoneNumber: phoneNumber})
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
    /**
     * Sign's Users Out and clears localstorage
     */
    clickSignOut(){
        superagent.post('https://postitdanny.herokuapp.com/signOut')
            .end((error, response) => {
                if(error!== null){
                    message = response.text.toString();
                } else {
                    window.location.reload();
                    browserHistory.push('/');
                    gapi.auth2.getAuthInstance().signOut();
                    message = response.text.toString();
                    localStorage.clear();
                    
                }
                this.emitChange();
            });
    }
    /**
     * 
     * @param {*} groupName - Holds group name
     * @return {string} response from server   
     */
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
    /**
     * Method that handles signIn with Google Option
     * @param {*} idToken - token collected from google 
     */
    signInWithGoogle({ idToken }) {
        superagent
            .post('https://postitdanny.herokuapp.com/signIn/google')
            .send({ idToken: idToken })
            .set('Accept', 'application/json')
            .end((error, response) => {
                received = JSON.parse(response.text);
                if (error !== null) {
                    message = ({'message' :response.status.toString(), 
                    'error': error.message })
                } else {
                    console.log('there were no errors');
                    const userName = received.user.displayName,
                    userUid = received.user.uid;
                    localStorage.setItem('userName', userName);
                    localStorage.setItem('uid', userUid);
                    browserHistory.push('home');
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
                this.getAllUsers();
                break;
            case Constants.SIGN_IN_GOOGLE:
                this.signInWithGoogle(action.payload);
                break;
            default:
                console.log('default', action);
                break;
        }
        return true;
    }

}

export default new LoginStore();
