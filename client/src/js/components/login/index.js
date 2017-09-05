import React, { Component } from 'react';
import UserStore from '../../stores/UserStore';
import TextBox from '../commons/textbox.js';
import Button from '../commons/button.js';
import ViewActions from '../../actions/viewActions';
import Google from './googleSignIn.js';
import '../../../index.scss';

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
            username: '',
            phoneNumber:''
        };
        this._onChange = this._onChange.bind(this);
        this.clickSign = this.clickSign.bind(this);
        this.toggleSignInUp = this.toggleSignInUp.bind(this);
    }
    componentDidMount() {
        UserStore.addChangeListener(this._onChange);
    }
    componentWillUnmount() {
        UserStore.removeChangeListener(this._onChange);
    }
    _onChange() {
        this.forceUpdate();
    }
    toggleSignInUp() {
        this.setState({
            signingIn: !this.state.signingIn
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
        <div className="panel panel-success">
        <div className="panel-heading"><h3>PostIT... #JustPostIt</h3></div>
        <div className="panel-body">
                  <div className="form">
        <div className="login">
            {UserStore.getMessage()}
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
            <Button
                onClick={ this.clickSign }
                value={ signingIn ? 'Sign In' : 'Sign up' }
                /><p> OR</p>
                <br/><hr/>
            <div className="googleBut">
            <Google />
            </div>
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


module.exports = Login;