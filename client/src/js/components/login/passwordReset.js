import React, { Component } from 'react';
import firebase from 'firebase';
import UserStore from '../../stores/UserStore';
import TextBox from '../commons/textbox.js';
import Button from '../commons/button.js';
import ViewActions from '../../actions/viewActions';

const sendPasswordReset = ViewActions;
class PasswordReset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        }
      // this._onChange = this._onChange.bind(this);
      // this.resetPassword = this.resetPassword.bind(this);
    }
    resetPassword(e) {
      e.preventDefault()
      const email = this.refs.email.value.trim()
      console.log(email);
      // if (email === '') {
      //   // sendPasswordReset(email);
      // }
      // // console.log('Chill first!!')
    }
    render(){
        return(
          <div> 
            <div className="modal fade exampleModal" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Reset Password</h5>
                    <a type="button" className="times" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </a>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={this.resetPassword.bind(this)}>
                      <div className="form-group">
                        <input type="email" ref="email" className="form-control" id="emailAddress" required />
                        <button type="submit" className="send" className="btn btn-primary" >Submit</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
}
export default PasswordReset;