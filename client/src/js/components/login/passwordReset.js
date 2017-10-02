import React, { Component } from 'react';
import firebase from 'firebase';
import toastr from 'toastr';
import UserStore from '../../stores/UserStore';
import TextBox from '../commons/textbox.js';
import Button from '../commons/button.js';
import ViewActions from '../../actions/viewActions';

const ReactToastr = require('react-toastr');
const { ToastContainer } = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

const {sendPasswordReset} = ViewActions;
class PasswordReset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
        }
        // this.addAlert = this.addAlert.bind(this);
        // this._onChange = this._onChange.bind(this);

    }

    componentWillMount() {
      UserStore.on('messageSent', () => {
        let message =UserStore.getMessage();
        this.container.success(
          "Messsage:",
          message, {
            timeOut: 5000,
            extendedTimeOut: 3000
          });
      });
      UserStore.on('resetError', ()=> {
        let message =UserStore.getMessage();
        this.container.error(
          message,
          'Sorry and Error has ocurred',{
            timeOut: 5000,
            extendedTimeOut: 3000
          })
      })

    }
    resetPassword(e) {
      e.preventDefault()
      const email = this.refs.email.value.trim()
      if (email !== '') {
        sendPasswordReset(email);
        this.refs.email.value = '';
      }
    }
    render(){
        return(
          <div> 
            <ToastContainer ref={(input) => {this.container = input;}}
                        toastMessageFactory={ToastMessageFactory}
                        className="toast-top-right"
                        preventDuplicates= {true} />

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