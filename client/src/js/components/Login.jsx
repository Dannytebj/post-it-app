import React, { Component } from 'react';
import UserStore from '../stores/UserStore';
import TextBox from '../utils/textbox';
import Button from '../utils/button';
import ViewActions from '../actions/AppActions';
import Google from './GoogleSignIn';
import PassWordReset from './PasswordReset';
import '../../scss/index.scss';

/**
 * Component That handles SignIn and SignUP
 */
const { signIn, signUp } = ViewActions;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      signingIn: true,
      resetPass: false,
      username: '',
      phoneNumber: '',
    };
    this.clickSign = this.clickSign.bind(this);
    this.onChange = this.onChange.bind(this);
    this.toggleSignInUp = this.toggleSignInUp.bind(this);
    this.toggleResetPass = this.toggleResetPass.bind(this);
  }
  componentDidMount() {
    UserStore.addChangeListener(this.onChange);
  }
  componentWillUnmount() {
    UserStore.removeChangeListener(this.onChange);
  }
  onChange() {
    this.forceUpdate();
  }

  toggleSignInUp() {
    this.setState({
      signingIn: !this.state.signingIn,
    });
  }
  toggleResetPass() {
    this.setState({
      resetPass: true,
    });
  }
    
  /**
     * Method that calls the signIn and 
     * signUp Action and passes payload to it
     */
  clickSign() {
    const { email, password, username, 
      signingIn, phoneNumber } = this.state;
    if (signingIn) {
      signIn(email, password);
      return;
    }
    signUp(email, password, username, phoneNumber);
  }

  render() {
    const { 
      email, 
      password, 
      username, 
      signingIn, 
      phoneNumber } = this.state;
    return (
      <div className="container-fluid">
        <div className="panel panel-success">
          <div className="panel-heading"><h5>PostIT... #JustPostIt</h5></div>
          <div className="panel-body">
            <div className="form center-block">
              {(!signingIn) ? <h2><p className="centered">SIGN UP</p></h2> :
                <h2><p className="centered">SIGN IN</p></h2> }   
              <div className="login">
                { (!signingIn) ? <div><TextBox
                  className = "fullName"
                  onChange={(value) => { this.setState({ username: value }); }}
                  label="Full Name"
                  currentValue={username}
                /> <TextBox
                  className = "phoneNumber"
                  onChange={(value) => { 
                    this.setState({ phoneNumber: value });
                  }}
                  label="Phone Number"
                  currentValue={phoneNumber}
                /> </div> : <div/> }
                <TextBox
                  className = "email"
                  onChange={(value) => { 
                    this.setState({ email: value });
                  }}
                  label="email"
                  currentValue={email}
                />
                <TextBox
                  className = "password"
                  onChange={(value) => { this.setState({ password: value }); }}
                  label="password"
                  currentValue={password}
                  isPassword ={true}
                />
                <div className="bigButton">
                  <Button
                    onClick={ this.clickSign }
                    value={ signingIn ? 'Sign In' : 'Sign up' }
                  />
                </div>
                <br/>
                <p className="centered"> OR</p>
                <hr/>
                <div className="googleBut loginBtn loginBtn--google">
                  <Google/>
                </div>
                <p className="message">Forgot Password ? 
                  <a className="toggler3" onClick={this.resetPassword}
                    data-toggle="modal" 
                    data-target=".resetPassword">Reset Password</a></p>
                <PassWordReset/>
                { (signingIn) ?
                  <p className="message">Not registered ? 
                    <a className="toggler1" onClick={this.toggleSignInUp}>Sign Up</a></p> :
                  <p className="message">Already registered? 
                    <a className="toggler2" onClick={this.toggleSignInUp}>Sign In</a></p> 
                }
              </div>
            </div>
          </div>
        </div>
  
      </div>
    );
  }
}

export default Login;
