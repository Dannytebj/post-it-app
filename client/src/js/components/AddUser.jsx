import React, { Component } from 'react';
import GroupStore from '../stores/GroupStore';
import AllUserList from './AllUserList';


/**
 * @description This class List handles adding users not
 * currently in the current selected group
 * 
 * @class AddUser
 * @extends {Component}
 */
class  AddUser extends Component {
  /**
   * Creates an instance of AddUser.
   * @param {any} props 
   * @memberof AddUser
   */
  constructor(props) {
    super(props);
    this.state = {
      allUserList: GroupStore.getAllUsers(),
    };
    this._onChange = this._onChange.bind(this);
    this.removeNode = this.removeNode.bind(this);
  }
  /**
   * @description Adds a change listener to the
   * Groupstore just before the component is mounted
   * 
   * @memberof AddUser
   */
  componentWillMount() {
    GroupStore.addChangeListener(this._onChange);
  }
  /**
   * @description Removes change listener just before 
   * the component unmounts
   * 
   * @memberof AddUser
   */
  componentWillUnmount() {
    GroupStore.removeChangeListener(this._onChange);
  }
  /**
   * @description This method is passed to the change listeners
   * to update the component when there is a change in the store
   * 
   * @memberof AddUser
   */
  _onChange() {
    this.setState({
      allUserList: GroupStore.getAllUsers(),
    });
  } 
  /**
   * @description Removes the change listener when modal component is
   * closed
   * 
   * @memberof AddUser
   */
  removeNode() {
    GroupStore.removeChangeListener(this._onChange);
  }

  /**
   * 
   * 
   * @returns Jsx component that lists out all users
   * @memberof AddUser
   */
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
                  className="close" onClick={this.removeNode} 
                  data-dismiss="modal" aria-label="Close">
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
