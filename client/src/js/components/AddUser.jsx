import React, { Component } from 'react';
import GroupStore from '../stores/GroupStore';
import ViewActions from '../actions/AppActions';
import AllUserList from './AllUserList.jsx';


const { getAllUsers } = ViewActions;

class  AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allUserList: GroupStore.getAllUsers(),
    };
    this.onChange = this.onChange.bind(this);
  }
  componentWillMount() {
    GroupStore.on('updateAllUsers', () => {
      this.setState({
        allUserList: GroupStore.getAllUsers(),
      });
    });
  }
  componentWillUnmount() {
    GroupStore.removeChangeListener(this.onChange);
  }
  onChange() {
    this.forceUpdate();
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
                  className="close" data-dismiss="modal" aria-label="Close">
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
