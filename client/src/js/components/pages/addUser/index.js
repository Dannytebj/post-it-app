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
            showUsers: true,
            userUid: '',
            userName:''
        }
        this._onChange = this._onChange.bind(this);
        this.toggleShowUsers = this.toggleShowUsers.bind(this);

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
do_fetchUsers() {
        getUser();
        document.getElementById("showButton").style.display = 'none'
        return;
    }
    getUserId(userUid , userName) {
        this.setState({
            userUid: this.state.userUid,
            userName:this.state.userName
        });
        // const userUid  = this.state;
        console.log('Please Work ' + userUid + userName);
        // return;
        // userId  = localStorage.get-
    }
   
    render() {
        // Define Variables needed
        const { showUsers, userUid, userName } = this.state;
        let userObject = {};
        userObject = UserStore.getUsers();
        const myDiv = document.getElementById("myDiv");

        // loop through Object received from Userstore
        Object.entries(userObject).forEach(([key, value]) => {
            let allUsers = value['name'];
            let userid = value['id'];
            // localStorage.setItem(allUsers, key);

        // Create list elements of users and append to div
        const ul = document.createElement("ul");
        ul.className = "nameList";
        const li = document.createElement('li');
        li.className = "listName";
        li.innerText = allUsers;
        li.id = userid;
        let lists = ul.appendChild(li);
        myDiv.appendChild(lists);
        li.onclick = this.getUserId.bind(this, li.innerText, li.id);
 
    });
    // let li = document.getElementsByClassName('listName');
        return (
            <div>
            <Navigator/>
         <div className="trey">
               { (showUsers) ? <div id ="showButton"> <Button
                onClick={ this.do_fetchUsers }
                value={ 'Get Users' }
                /> </div> : <div/> }
            <div id="myDiv"> 
             </div>    
               </div> 
            </div>
        );
    
    }
}

export default AddUser;