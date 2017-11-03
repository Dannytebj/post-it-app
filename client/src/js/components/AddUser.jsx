import React, { Component } from 'react';
import GroupStore from '../stores/GroupStore';
import ViewActions from '../actions/AppActions';
import AllUserList from './AllUserList';


const { getAllUsers } = ViewActions;

class  AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allUserList: GroupStore.getAllUsers(),
    };
    this._onChange = this._onChange.bind(this);
    this.removeNode = this.removeNode.bind(this);
  }
  componentWillMount() {
    GroupStore.addChangeListener(this._onChange);
  }
  componentWillUnmount() {
    GroupStore.removeChangeListener(this._onChange);
  }
  _onChange() {
    this.setState({
      allUserList: GroupStore.getAllUsers(),
    });
  } 
  removeNode() {
    GroupStore.removeChangeListener(this._onChange);
  }

  
  render() {
    const { allUserList } = this.state;
    // console.log(allUserList, '====> Modal Component');
    return (
      <div> 
        <div className="modal fade addUser" 
          id="addUser" tabIndex="-1" role="dialog" 
          aria-labelledby="addUser" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" 
                  id="addUser">Add Users to Your Group</h5>
                <a type="button" className="times" 
                  className="close" onClick={this.removeNode} data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </a>
              </div>
              <div className="modal-body">
                <AllUserList  allUserList = { allUserList }/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AddUser;
