import React, { Component } from 'react';
import UserStore from '../../stores/UserStore';
import ViewActions from '../../actions/viewActions';
import './index.scss';

const { signInWithGoogle } = ViewActions;

class GoogleSignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: ''
        };
        this._onChange = this._onChange.bind(this);
        this.onSignIn = this.onSignIn.bind(this);
    }
    onSignIn(googleUser) {
        const token = googleUser.getAuthResponse().id_token;
        signInWithGoogle({ userToken: token });
    }
    googleButton() {
        gagi.signin2.render('googleButton', {
            scope: 'https://www.googleapis.com/auth/plus.login',
            width: 200,
            height: 50,
            theme: 'dark',
            onsuccess: this.onSignIn
        });
    }
    componentDidMount() {
        window.addEventListener('button-Loaded', this.googleButton);
        // UserStore.addChangeListener(this._onChange);
    }
    componentWillUnmount() {
        UserStore.removeChangeListener(this._onChange);
    }
    _onChange() {
        this.forceUpdate();
    }

    render() {
        return ( 
        <div id ="googleButton" />
        );
    }
}// end of Class

module.exports = GoogleSignIn;