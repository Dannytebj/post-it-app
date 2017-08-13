import React, { Component } from 'react';
import UserStore from '../../../stores/UserStore';
import viewActions from '../../../actions/viewActions';
import { browserHistory } from "react-router";
import Layout from '../layout';


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
<div className="container-fluid">
<div className="row">
    <Layout/>
  <div className="col-sm-9">
  <div className="well well-lg">
    <div className="btn-group" role="group" aria-label="Sign Out">
        <h3>Are you sure you want to leave?</h3>
  <button type="button" className="btn btn-default" onClick={this.logOut}>Yes</button>
  <button type="button" className="btn btn-default" onClick={this.home}>No</button>
</div>
  </div>
  </div>
</div>
</div>
  
        )
};

}
export default SignOut;