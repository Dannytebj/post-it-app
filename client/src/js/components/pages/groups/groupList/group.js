import React, { Component } from 'react';
import superagent from 'superagent';
import PropTypes from 'prop-types';
import Button from '../../../commons/button.js';
import UserList from '../../addUser/userList';


class Group extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList:[],
            isFetchingData:false,
            fetchMessage:'',
            isAddingUser: false,
            userAdded: false
        };
        // this.addUser = this.addUser.bind(this);
        this.fetchUsers = this.fetchUsers.bind(this);
    }
    fetchUsers() {
        this.setState({
            isFetchingData: true
        });
        localStorage.setItem('groupId', this.props.group.groupId);
        superagent
            .get(`https://postitdanny.herokuapp.com/getUsers`)
            .end(
                (error, response) => {
                    if (error) {
                        console.log(error);
                        this.setState({
                            isFetchingData: false,
                            fetchMessage: 'Error Fetching Data'
                        });
                        return;
                    }
                    // this.getCurrentUser(JSON.parse(response.text));
                    this.setState({
                        isFetchingData: false,
                        userList: JSON.parse(response.text),
                        fetchMessage: 'Successfully Loaded'
                    });
                }
            )
    }

    createUserAddButton(isLoading) {
        return isLoading ? <span>Loading</span> : <span>
            <Button onClick={ this.fetchUsers } value={'Add Users' } />  </span>;
    }
    render() {
        const { group, user } = this.props;
        const { userAdded, isAddingUser, userList} = this.state;
        return (<div>
        <li>
            {group.groupName}
            { (!userAdded) ? this.createUserAddButton(isAddingUser) : ''}
        </li>
       <UserList userList = {userList} />
       
       </div>
        );
    }
}

Group.propTypes = {
    group: PropTypes.object.isRequired
}

export default Group;
