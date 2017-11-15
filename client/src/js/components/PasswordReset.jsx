import React, { Component } from 'react';
import UserStore from '../stores/UserStore';
import ViewActions from '../actions/AppActions';


const { sendPasswordReset } = ViewActions;

/**
 * @description This class contains a modal that renders
 * a textbox and button
 * 
 * @class PasswordReset
 * @extends {Component}
 */
class PasswordReset extends Component {
  /**
   * @constructor 
   * Creates an instance of PasswordReset.
   * @param {any} props 
   * @memberof PasswordReset
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
    this.onChange = this.onChange.bind(this);
  }
  /**
   * @description Adds a change listener to the Userstore
   * when this component is mounted
   * 
   * @memberof PasswordReset
   */
  componentDidMount() {
    UserStore.addChangeListener(this.onChange);
  }
  /**
   * @description Removes change listener just before the component
   * will unmount
   * 
   * @memberof PasswordReset
   */
  componentWillUnmount() {
    UserStore.removeChangeListener(this.onChange);
  }
  /**
   * @description This method is passed to the change listeners
   * to update the state of the component when there is a 
   * change in the store
   * 
   * @memberof PasswordReset
   */
  onChange() {
    this.forceUpdate();
  }
  /**
   * @description This method is called when the send
   * button is clicked. It calls the sendResetpassword
   * action with email as a parameter
   * 
   * @param {any} event 
   * @memberof PasswordReset
   */
  resetPassword(event) {
    event.preventDefault();
    const email = this.refs.email.value.trim();
    if (email !== '') {
      sendPasswordReset(email);
      this.refs.email.value = '';
    }
  }
  /**
   * 
   * 
   * @returns a modalcomponent for the reset Password
   * @memberof PasswordReset
   */
  render() {
    return (
      <div> 
        <div className="modal fade resetPassword" 
          id="resetPassword" tabIndex="-1" role="dialog" 
          aria-labelledby="resetPassword" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" 
                  id="resetPassword">Reset Password</h5>
                <a type="button" className="times" 
                  className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </a>
              </div>
              <div className="modal-body">
                <form className="reset-password" 
                  onSubmit={this.resetPassword.bind(this)}>
                  <div className="form-group">
                    <input type="email" ref="email" 
                      className="form-control reset-email" 
                      id="emailAddress" required={true} />
                    <button type="submit" className="send" 
                      className="btn btn-primary" >Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default PasswordReset;
