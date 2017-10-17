import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GroupUsers extends Component {
  constructor(props){
    super(props);
  }
  render () {
    const { user } = this.props;
    return (
      <li className="list-group-item">
        { user.name }
      </li>

    );
  }
}
GroupUsers.propTypes = {
  user: PropTypes.object.isRequired,
};
export default GroupUsers;

