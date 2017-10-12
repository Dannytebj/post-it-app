import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../utils/button';

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupUsers: false,
    };
    // this.collapse = this.collapse.bind(this);
    // this.fetchUsers = this.fetchUsers.bind(this);
  }
  showUsers() {
    const {groupName} =this.props.group;
  }
  render() {
    const { group } = this.props;
    return (
      <div className="groups">
        <div className="row">
          <div className="col-md-4">
            <li>
              <p className="groupName">{group.groupName}</p>
            </li>
          </div>
        </div>
      </div>
    );
  }
}

Group.propTypes = {
  group: PropTypes.object.isRequired,
};

export default Group;
