import React, { Component } from 'react';
import Navigator from '../../navigation';

class AddUser extends Component {
    constructor(props){
        super(props);
        this.state ={
            groupId: ''
        }
    }

   
    render() {
        console.log(this.props);
        return (<div className="page">
            <Navigator/>
            <div className="page-content">
                <h1>Welcome to Add User</h1>
            </div>
        </div>);
    }
}

export default AddUser;