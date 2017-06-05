import React, { Component } from 'react';
import UserStore from '../../stores/UserStore';
import TextBox from '../commons/textbox.js';
import Button from '../commons/button.js';
import ViewActions from '../../actions/viewActions';
import './login.scss';

const { signIn } = ViewActions;
const { signUp } = ViewActions;

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            signingIn: true,
            username: ''
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
    clickSign() {
        const { email, password, username, signingIn } = this.state;
        if (signingIn) {
            signIn(email, password);
            return;
        }
        signUp( username,email, password);
    }
    render() {
        const { email, password, username, signingIn } = this.state;
        return (
        <div className="form">
        <div className="login">
            {UserStore.getMessage()}
            { (!signingIn) ? <TextBox
                onChange={(value) => { this.setState({ username: value }); }}
                label="name"
                currentValue={username}
                /> : <div/> }
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
                />
            { (signingIn) ?
                <p className="message">Not registered? <a onClick={this.toggleSignInUp}>Sign Up</a></p> :
                <p className="message">Already registered? <a onClick={this.toggleSignInUp}>Sign In</a></p> }
            </div>
        </div>
        );
    }
}


module.exports = Login;