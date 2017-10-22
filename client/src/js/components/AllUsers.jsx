import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ViewActions from '../actions/AppActions';
import GroupStore from '../stores/GroupStore';

const { addUser } = ViewActions;

class AllUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddingUser: false,
      userAdded: false,
    };
    this.addUser = this.addUser.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    GroupStore.addChangeListener(this._onChange);
  }
  componentWillUnmount() {
    GroupStore.removeChangeListener(this._onChange);
  }
  _onChange() {
    this.setState({
      userAdded: false,
    });
  }
  addUser() {
    this.setState({
      isAddingUser: true,
    });
    const groupId  = localStorage.getItem('groupId');
    const groupName = localStorage.getItem('groupName');
    const { name, id } = this.props.user;
    addUser(groupId, groupName, name, id);
  }

  createAddButton(isAddingUser) {
    return isAddingUser ? '' : <span onClick={this.addUser}
      className="add glyphicon glyphicon-plus" aria-hidden="true"/>;
  }

  render() {
    const { user } = this.props;
    const { userAdded, isAddingUser } = this.state;
    return (
      <li className="list-group-item">
        { user.name } {(!userAdded) ? this.createAddButton(isAddingUser) : '' }
      </li>

    );
  }
}
AllUsers.propTypes = {
  user: PropTypes.object.isRequired,
};
export default AllUsers;

