import React, { Component } from 'react';
import { browserHistory } from "react-router";
import UserStore from '../stores/UserStore';
import viewActions from '../actions/AppActions';
import Layout from './Layout';


const { signOut } = viewActions;
class SignOut extends Component {
  constructor() {
    super();
    this._onChange = this._onChange.bind(this);
    this.logOut = this.logOut.bind(this);
    this.home = this.home.bind(this);
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
  logOut() {
    signOut();
  }
  home() {
    browserHistory.push('home');
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <Layout/>
          <div className="col-sm-9">
            <div className="well well-lg">
              <div className="btn-group" role="group" aria-label="Sign Out">
                <h3>Are you sure you want to leave?</h3>
                <button type="button" className="btn btn-default yes-btn" 
                  onClick={this.logOut}>Yes</button>
                <button type="button" className="btn btn-default no-btn" 
                  onClick={this.home}>No</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  
    );
  }
}
export default SignOut;
