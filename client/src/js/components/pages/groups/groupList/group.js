import React, { Component } from 'react';
import superagent from 'superagent';
import PropTypes from 'prop-types';
import Button from '../../../commons/button.js';
import UserList from '../../addUser/userList';
// import NewList from '../../addUser/userList/newList.js';


class Group extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList:[],
            isFetchingData:false,
            fetchMessage:'',
            isFetchingGroup: false,
            groupFetched: false,
            userIsSet: false
        };
        this.collapse = this.collapse.bind(this);
        this.fetchUsers = this.fetchUsers.bind(this);
    }

    getGroupUsers() {
        const groupId  = localStorage.getItem('groupId');
        superagent
            .get(`https://postitdanny.herokuapp.com/getGroupUsers/${groupId}`)
            .end((error, response) => {
                if (error){
                    this.state({
                        fetchMessage: 'Error Fetching group users'
                    });
                    return;
                } 
                this.setState({
                    newList: JSON.parse(response.text)
                });
            });
    }

    fetchUsers() {
        this.setState({
            isFetchingData: true
        });
        const groupId  = this.props.group.groupId;
        const groupName = this.props.group.groupName;
        localStorage.setItem('groupId', groupId);
        localStorage.setItem('groupName', groupName);
        // console.log(groupId);
        superagent
            .get(`https://postitdanny.herokuapp.com/getGroupUsers/${groupId}`)
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
                        fetchMessage: 'Successfully Loaded',
                        userIsSet: true
                    });
                }
            )
    }
    collapse(){
        this.setState({
            userIsSet: false
        });
    }

    createUserAddButton(isLoading) {
        return isLoading ? <span>Loading</span> : <span>
            <Button onClick={ this.fetchUsers } value={'Add Users' } />  </span>;
    }
    render() {
        const { group } = this.props;
        const { isFetchingGroup, userList, userIsSet} = this.state;
        return (<div id="groups">
        <li>
            {group.groupName}
            { (group.isAdmin) ? this.createUserAddButton(isFetchingGroup) : ''}
        </li>
        {(userIsSet) ? <div><span id="hide" onClick={this.collapse}> Hide </span> <UserList userList = {userList} /></div> : ''}
       
       
       </div>
        );
    }
}

Group.propTypes = {
    group: PropTypes.object.isRequired
}

export default Group;
