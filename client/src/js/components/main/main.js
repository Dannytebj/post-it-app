import React,{ Component } from 'react';
import UserStore from '../../stores/UserStore';
import viewActions from '../../actions/viewActions'
import './style.scss';

const { signOut } = viewActions;

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this._onChange = this._onChange.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        UserStore.addChangeListener(this._onChange);
    }
    componentWillUnmount() {
        UserStore.removeChangeListener(this._onChange);
    }
    _onChange() {
        this.forceUpdate();
    }
    logout(){
        signOut();
        return ;
    }

    
render() {
     return (
     <div className ="container">
        <h1>Welcome, </h1>
         <div className ="sidenav">
            <ul>
                <li><a>Home</a></li>
                <li><a>Create BroadCast Groups</a></li>
                <li><a>Add Users</a></li>
                <li><a onClick = {this.logout}>Sign Out</a></li>
            </ul>
         </div>
    </div>
    );
}

}

export default Welcome;
