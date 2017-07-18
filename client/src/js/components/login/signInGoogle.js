import React, { Component } from 'react';
import UserStore from '../../stores/UserStore';
import ViewActions from '../../actions/viewActions';
// import './index.scss';

const { signInWithGoogle } = ViewActions;

class GoogleSignIn extends Component {
    constructor(props){
        super(props);
        // this._onChange = this._onChange.bind(this);
        this.onSignIn = this.onSignIn.bind(this);
    }
    googleButton() {
        gapi.signin2.render('g-signin2', {
        'scope': 'https://www.googleapis.com/auth/plus.login',
        'width': 200,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onSuccess': this.onSignIn
        });
    }
    
    onSignIn(googleUser) {
        console.log('called onSignIn funtion!!');
        const idToken = googleUser.getAuthResponse().id_token;
        console.log(idToken);
        signInWithGoogle(idToken);
    }

    signOut() {
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    }

    componentDidMount() {
        window.addEventListener('load', this.googleButton);
        window.onbeforeunload = function(e){
        gapi.auth2.getAuthInstance().signOut();
        };
    }
     // UserStore.addChangeListener(this._onChange);
//        window.addEventListener('success', this.onSignIn);
//         
   
    // componentWillUnmount() {
    //     UserStore.removeChangeListener(this._onChange);
    // }
    // _onChange() {
    //     this.forceUpdate();
    // }

    render() {
        return ( 
            <div id="g-signin2" data-width="300" data-height="200" data-longtitle="true" data-onsuccess={this.onSignIn}>
        </div> 
        );
    }
}// end of Class

module.exports = GoogleSignIn;