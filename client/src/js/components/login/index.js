import React, { Component } from 'react';
import UserStore from '../../stores/UserStore';
import TextBox from '../commons/textbox.js';
import Button from '../commons/button.js';
import ViewActions from '../../actions/viewActions';

const { signIn } = ViewActions;
import './login.scss';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            signingIn: true,
            name: ''
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
        const { email, password, name, signingIn } = this.state;
        if (signingIn) {
            signIn(email, password);
            return;
        }
        signUp(email, password, name); // change to sign up
    }
    render() {
        const { email, password, name, signingIn } = this.state;
        return (
        <div className="form">
        <div className="login">
            {UserStore.getMessage()}
            { (!signingIn) ? <TextBox
                onChange={(value) => { this.setState({ name: value }); }}
                label="name"
                currentValue={name}
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