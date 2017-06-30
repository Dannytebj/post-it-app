import React, { Component } from 'react';
import superagent from 'superagent';
import Button from '../../commons/button.js';
import UserList from './userList';

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            isFetchingData: false,
            fetchMessage: ''
        }
        this.fetchUsers = this.fetchUsers.bind(this);
    }
    fetchUsers() {
        this.setState({
            isFetchingData: true
        });
        superagent
            .get(`localhost:9999/getUsers`)
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
    render() {
        const { userList, isFetchingData, fetchMessage } = this.state;
        if ( isFetchingData ){
            return <span>Loading!!</span>
        }
        return (<div>
            <Button value="Get Users" onClick={this.fetchUsers}/>
            { fetchMessage }
            <UserList userList={userList}/>
        </div>)
    }
}
export default AddUser;
