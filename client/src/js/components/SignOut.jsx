import React, { Component } from 'react';
import { browserHistory } from "react-router";
import UserStore from '../stores/UserStore';
import viewActions from '../actions/AppActions';
import Layout from './Layout';


const { signOut } = viewActions;
/**
 * @description This class handles the signing Out Users
 * 
 * @class SignOut
 * @extends {Component}
 */
class SignOut extends Component {
  /**
   * @constructor
   * Creates an instance of SignOut.
   * @memberof SignOut
   */
  constructor() {
    super();
    this._onChange = this._onChange.bind(this);
    this.logOut = this.logOut.bind(this);
    this.home = this.home.bind(this);
  }
  /**
  * @description Adds a change listener to the Userstore
  * when this component is mounted
  * 
  * @memberof SignOut
  */
  componentDidMount() {
    UserStore.addChangeListener(this._onChange);
  }
  /**
   * @description Removes change listener just before the component
   * will unmount
   * 
   * @memberof SignOut
   */
  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange);
  }
  /**
   *  @description This method is passed to the change listeners
   * to update the state of the component when there is a 
   * change in the store
   * 
   * @memberof SignOut
   */
  _onChange() {
    this.forceUpdate();
  } 
  /**
   * @description When this method is called, it
   * calls the signOut action
   * 
   * @memberof SignOut
   */
  logOut() {
    signOut();
  }
  /**
   * @description When this is called it
   * returns the user back to the home page
   * 
   * @memberof SignOut
   */
  home() {
    browserHistory.push('home');
  }
  /**
   * 
   * 
   * @returns the signOut jsx component
   * @memberof SignOut
   */
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
