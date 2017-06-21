import React, { Component } from 'react';
import Navigator from '../../navigation';
import viewActions from '../../../actions/viewActions.js';
import UserStore from '../../../stores/UserStore.js';
// import DataStore from  '../../../stores/dataStores.js';
import TextBox from '../../commons/textbox.js';
import Button from '../../commons/button.js';
import '../../../../index.scss';


const { createGroup } = viewActions;

class Groups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupName: ''
        };
        this._onChange = this._onChange.bind(this);
        this.do_createGroup = this.do_createGroup.bind(this);
    }
    componentDidMount() {
        UserStore.addChangeListener(this._onChange);
        // DataStore.addChangeListener(this._onChange);

    }
    componentWillUnmount() {
        UserStore.removeChangeListener(this._onChange);
        // DataStore.addChangeListener(this._onChange);
    }
    _onChange() {
        this.forceUpdate();
    }
    do_createGroup(){
        const { groupName } = this.state;
        createGroup(groupName);
        return;
    }
    do_fetchGroups() {

    }
    render() {
        const { groupName } = this.state;
        return (<div className="page">
            <Navigator/>
            <div className="page-content">
                {UserStore.getCurrentUser()}
                <div className="form">
                {UserStore.getMessage()}
                <h1>Create A Group!</h1>
                <TextBox
                onChange={(value) => { this.setState({ groupName: value }); }}
                label="Group Name"
                currentValue={groupName}
                />
                <Button
                onClick={ this.do_createGroup }
                value={'Create Group' }
                />
                <p>Click here to view List of Groups</p>
               
            </div>
            </div>
        </div>);
    }
}

export default Groups;
