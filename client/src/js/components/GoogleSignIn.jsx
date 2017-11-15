import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import ViewActions from '../actions/AppActions';

const { signInWithGoogle } = ViewActions;
/**
 * 
 * 
 * @class Google
 * @extends {Component}
 */
class Google extends Component {
  /**
   * Creates an instance of Google.
   * @param {any} props 
   * @memberof Google
   */
  constructor(props) {
    super(props);
    this.onSignIn = this.onSignIn.bind(this);        
  }
  /**
   * 
   * 
   * @param {any} googleUser 
   * @memberof Google
   */
  onSignIn(googleUser) {
    const idToken = googleUser.getAuthResponse().id_token;
    signInWithGoogle(idToken);
  }

  /**
 * @description jsx component for signing in with google
 * 
 * @returns {string} authentication token
 * @memberof Google
 */
  render() {
    return (
      <GoogleLogin className="googleBut loginBtn loginBtn--google"
        scope="https://www.googleapis.com/auth/plus.login"
        clientId="276992209544-34s0o6vjvtahe85c8al49m9a5o390ats.apps.googleusercontent.com" // eslint-disable-line
        buttonText="Sign In with Google"
        onSuccess={this.onSignIn}    
      />
    );
  }
}
export default Google;
