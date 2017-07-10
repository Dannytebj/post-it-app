import React, { Component } from 'react';
import superagent from 'superagent';
import Button from '../../commons/button.js';
import Navigator from '../../navigation';
import UserList from './userList';

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            groupUsers: [],
            filteredUsers:[],            
            isFetchingData: false,
            fetchMessage: ''
        }
        this.fetchUsers = this.fetchUsers.bind(this);
        // this.fetchGroups = this.fetchGroups.bind(this);
    }
    getCurrentUser(arr){
        // Gets loggedIn user's details
        const currentUserId = localStorage.getItem('uid');
        Object.entries(arr).forEach(([key, value]) => {
            if (value['id'] === currentUserId){
                localStorage.setItem('currentUser', JSON.stringify(value['groups']));
            }

        });

    }
getGroupUsers() {
        superagent
            .get(`https://postitdanny.herokuapp.com/group/${groupId}`)
            .end((error, response) => {
                if (error){
                    this.state({
                        fetchMessage: 'Error Fetching group users'
                    });
                    return;
                }
                this.setState({
                    groupUsers: JSON.parse(response.text)
                });
            });
    }    
    
    fetchUsers() {
        this.setState({
            isFetchingData: true
        });
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
    filterUsers() {
        const { userList, groupUsers, filteredUsers} = this.state;
        fetchUsers();
        getGroupUsers();
        const newArray = userList.filter((userId) => {
            return (groupUsers.indexOf(userId) < 0);

        });
        this.setState({ 
            filteredUsers: newArray });
            console.log(filteredUsers);

        
    }

    render() {
        const { filteredUsers, isFetchingData, fetchMessage } = this.state;

        if ( isFetchingData ){
            return <span>Loading!!</span>
        }
        return (
    <div className="page">
            <Navigator/>
            <div className="page-content">
                <div className="trey">
            <Button value="Get Users" onClick={this.filterUsers } />
            { fetchMessage }
            <UserList userList={filteredUsers}/>
        </div>
    </div>
</div>)
    }
}
export default AddUser;
