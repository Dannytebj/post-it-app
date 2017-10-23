import React, { Component } from 'react';
import UserStore from '../stores/UserStore';
import ViewActions from '../actions/AppActions';


const { sendPasswordReset } = ViewActions;

class PasswordReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
    // this.addAlert = this.addAlert.bind(this);
    this.onChange = this.onChange.bind(this);
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
  resetPassword(event) {
    event.preventDefault();
    const email = this.refs.email.value.trim();
    if (email !== '') {
      sendPasswordReset(email);
      this.refs.email.value = '';
    }
  }
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
                <form onSubmit={this.resetPassword.bind(this)}>
                  <div className="form-group">
                    <input type="email" ref="email" className="form-control" 
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
