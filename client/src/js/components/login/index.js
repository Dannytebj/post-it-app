import React, { Component } from 'react';
import UserStore from '../../stores/UserStore';
import TextBox from '../commons/textbox.js';
import Button from '../commons/button.js';
import ViewActions from '../../actions/viewActions';
import Google from './googleSignIn.js';
import PassWordReset from './passwordReset';
import '../../../index.scss';


const ReactToastr = require('react-toastr');
const { ToastContainer } = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
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
            phoneNumber:''
        };
        // this._onChange = this._onChange.bind(this);
        this.clickSign = this.clickSign.bind(this);
        this.toggleSignInUp = this.toggleSignInUp.bind(this);
        this.toggleResetPass = this.toggleResetPass.bind(this);

    }
    componentWillMount() {
    //   UserStore.on('welcome', () => {
    //     let message =UserStore.getMessage();
    //     this.container.success(
    //       "Messsage:",
    //       message, {
    //         timeOut: 5000,
    //         extendedTimeOut: 3000
    //       });
    //   });
      UserStore.on('signUpError', ()=> {
        let message =UserStore.getMessage();
        this.container.error(
          message,
          'Sorry and Error has ocurred',{
            timeOut: 5000,
            extendedTimeOut: 3000
          })
      });
      UserStore.on('signInError', () => {
          let message = UserStore.getMessage();
          this.container.error(
              message,
              'Sorry and Error has ocurred', {
                  timeOut: 5000,
                  extendedTimeOut: 3000
              })
      });

    }

    // componentDidMount() {
    //     UserStore.removeChangeListener(this._onChange);
    // }
    
    // _onChange() {
    //     this.forceUpdate();
    // }
    toggleSignInUp() {
        this.setState({
            signingIn: !this.state.signingIn
        });
    }
    toggleResetPass(){
        this.setState({
            resetPass: true
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
        signUp( username,email, password, phoneNumber);
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
        <ToastContainer ref={(input) => {this.container = input;}}
                        toastMessageFactory={ToastMessageFactory}
                        className="toast-top-right"
                        preventDuplicates= {true} />
        <div className="panel panel-success">
        <div className="panel-heading"><h3>PostIT... #JustPostIt</h3></div>
        <div className="panel-body">
        <div className="form center-block">
         {(!signingIn) ? <h2><p className="centered">SIGN UP</p></h2> : <h2><p className="centered">SIGN IN</p></h2> }   
        <div className="login">
            { (!signingIn) ? <div><TextBox
                onChange={(value) => { this.setState({ username: value }); }}
                label="Full Name"
                currentValue={username}
                /> <TextBox
                onChange={(value) => { this.setState({ phoneNumber: value }); }}
                label="Phone Number"
                currentValue={phoneNumber}
                /> </div> : <div/> }
            <TextBox
                onChange={(value) => { this.setState({ email: value }); }}
                label="email"
                currentValue={email}
                />
            <TextBox
                onChange={(value) => { this.setState({ password: value }); }}
                label="password"
                currentValue={password}
                isPassword ={true}
                />
                <div className="bigButton">
            <Button
                onClick={ this.clickSign }
                value={ signingIn ? 'Sign In' : 'Sign up' }
                /></div>
                <br/>
                <p className="centered"> OR</p>
                <hr/>
            <div className="googleBut loginBtn loginBtn--google">
            <Google />
            </div>
                <p className="message">Forgot Password ? <a onClick={this.resetPassword} data-toggle="modal" data-target=".exampleModal">Reset Password</a></p>
                <PassWordReset /> 
            { (signingIn) ?
                <p className="message">Not registered? <a onClick={this.toggleSignInUp}>Sign Up</a></p> :
                <p className="message">Already registered? <a onClick={this.toggleSignInUp}>Sign In</a></p> }
            </div>
        </div>
        </div>
        </div>
  
        </div>
        );
    }
}

export default Login;
