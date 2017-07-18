import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import ViewActions from '../../actions/viewActions';
import './login.scss';

const { signInWithGoogle } = ViewActions;
class Google extends Component {
    constructor(props){
        super(props);
        this.onSignIn = this.onSignIn.bind(this);        
    }
     
    onSignIn(googleUser) {
        console.log('called onSignIn funtion!!');
        const idToken = googleUser.getAuthResponse().id_token;
        console.log(idToken);
        signInWithGoogle(idToken);
       
    }


render() {
    return(
    <GoogleLogin
        scope="https://www.googleapis.com/auth/plus.login"
        clientId="276992209544-34s0o6vjvtahe85c8al49m9a5o390ats.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={this.onSignIn}    
    />
    );
}
}
module.exports= Google;