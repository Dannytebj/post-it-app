import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AllUsers from './AllUsers';
import TextBox from '../utils/textbox';

const propTypes = {
  allUserList: PropTypes.array.isRequired,
};

/**
 * @description Receives an array of Object(allUser)
 * and creates a list element
 * 
 * @returns a list element
 * 
 * @param {Array} allUserList 
 */
// const AllUserList = ({ allUserList }) => (
//   <ul className="list-group">
//     {
//       allUserList.map(user => 
//         (<AllUsers user={user} key={user.id}/>))
//     }
//   </ul>
// );

/**
 * 
 * 
 * @class AllUserList
 * @extends {Component}
 */
class AllUserList extends Component {
  /**
   * Creates an instance of AllUserList.
   * @param {any} props 
   * @memberof AllUserList
   */
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };
  }

  /**
   * 
   * 
   * @returns 
   * @memberof AllUserList
   */
  render() {
    const { searchTerm } = this.state;
    const filteredUsers = this.props.allUserList.filter(
      user => user.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1,
    );
    return (
      <div className="row">
        <TextBox
          className = "searchTerm"
          onChange={(value) => { 
            this.setState({ searchTerm: value });
          }}
          label="Search For User"
          currentValue={searchTerm}
        />
        <ul className="userLists">
          {
            filteredUsers.map(user => 
              (<AllUsers user={user} key={user.id}/>))
          }
        </ul>
      </div>);
  }
}

AllUserList.propTypes = propTypes;

export default AllUserList;
