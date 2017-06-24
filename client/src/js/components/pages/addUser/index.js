import React, { Component } from 'react';
import Navigator from '../../navigation';
import UserStore from '../../../stores/UserStore.js';
import viewActions from '../../../actions/viewActions.js';
// import TextBox from '../../commons/textbox.js';
import Button from '../../commons/button.js';
import '../../../../index.scss';


const { getUser } = viewActions
class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state ={
            showUsers: true
        }
        this._onChange = this._onChange.bind(this);
        // this.do_createGroup = this.do_createGroup.bind(this);
    }
    componentDidMount() {
        UserStore.addChangeListener(this._onChange);
        // DataStore.addChangeListener(this._onChange);

    }
    componentWillUnmount() {
        UserStore.removeChangeListener(this._onChange);
    }
    _onChange() {
        this.forceUpdate();
    }
    toggleShowUsers() {
        this.setState({
            showUsers: !this.state.showUsers
        });
    }
do_fetchGroups() {
        getUser();
        return;
    }
   
    render() {
        const { showUsers } = this.state;
        // console.log(this.props);
        return (
        <div className="page">
            <Navigator/>
            <div className="page-content">
                <h1>Welcome to Add User</h1>
                <div className="form">
                 <p>Click here to view List of Users</p>
               <Button
                onClick={ this.do_fetchGroups }
                value={'Get Users' }
                />
                 <div className ="showGroup">
                     <h1>Show users !</h1>
                </div>
                </div>
            </div>
        </div>);
    }
}

export default AddUser;