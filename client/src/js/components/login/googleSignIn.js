import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import ViewActions from '../../actions/viewActions';

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
    <GoogleLogin className="googleBut loginBtn loginBtn--google"
        scope="https://www.googleapis.com/auth/plus.login"
        clientId="276992209544-34s0o6vjvtahe85c8al49m9a5o390ats.apps.googleusercontent.com"
        buttonText="Sign In with Google"
        onSuccess={this.onSignIn}    
    />
    );
}
}
export default Google;