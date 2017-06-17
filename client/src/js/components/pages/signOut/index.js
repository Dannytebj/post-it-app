import React, { Component } from 'react';
import UserStore from '../../../stores/UserStore';
import viewActions from '../../../actions/viewActions';
import { browserHistory } from "react-router";


const{ signOut } =viewActions;
class SignOut extends Component {
    constructor(){
        super();
        this._onChange = this._onChange.bind(this);
        this.logOut = this.logOut.bind(this);
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
    logOut(){
        signOut();
     return ;
    }
    home(){
       browserHistory.push('home');
       return; 
    }
    render(){
        return(
            <div className="page-content">
            <p className="message">Are you sure?</p>
            <ul>
                <li><a onClick = {this.logOut} >Yes</a></li>
                <li><a onClick={this.home} >No</a></li>
            </ul>    
            </div>
        )
};

}
export default SignOut;