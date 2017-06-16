import React, { Component } from 'react';
import Navigator from '../../navigation';

class AddUser extends Component {
    render() {
        return (<div className="page">
            <Navigator/>
            <div className="page-content">
                Welcome to Add User
            </div>
        </div>);
    }
}

export default AddUser;