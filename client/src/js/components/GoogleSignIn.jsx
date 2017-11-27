import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import ViewActions from '../actions/AppActions';

const { signInWithGoogle } = ViewActions;
/**
 * 
 * 
 * @class GoogleSignIn
 * @extends {Component}
 */
class GoogleSignIn extends Component {
  /**
   * Creates an instance of GoogleSignIn.
   * @param {any} props 
   * @memberof GoogleSignIn
   */
  constructor(props) {
    super(props);
    this.onSignIn = this.onSignIn.bind(this);        
  }
  /**
   * 
   * 
   * @param {any} googleUser 
   * @memberof GoogleSignIn
   */
  onSignIn(googleUser) {
    const idToken = googleUser.getAuthResponse().id_token;
    signInWithGoogle(idToken);
  }

  /**
 * @description jsx component for signing in with GoogleSignIn
 * 
 * @returns {string} authentication token
 * @memberof GoogleSignIn
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
export default GoogleSignIn;
