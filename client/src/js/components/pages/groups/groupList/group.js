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
            filtered:[],
            isFetchingData:false,
            fetchMessage:'',
            isFetchingGroup: false,
            groupFetched: false
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
        const { group } = this.props;
        const { groupFetched, isFetchingGroup, userList} = this.state;
        return (<div>
        <li>
            {group.groupName}
            { (!groupFetched) ? this.createUserAddButton(isFetchingGroup) : ''}
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
