import React, { Component } from 'react';
import superagent from 'superagent';
import Navigator from '../../navigation';
import viewActions from '../../../actions/viewActions.js';
import UserStore from '../../../stores/UserStore.js';
import TextBox from '../../commons/textbox.js';
import Button from '../../commons/button.js';
import GroupList from './groupList';
// import User from './user.js';
// import '../../../../index.scss';


const { createGroup } = viewActions;
// const { fetchGroups } = AddUser;

class Groups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newGroupName:'',
            groupList:[],
            isFetchingData: false,
            fetchMessage:''
        };
        this._onChange = this._onChange.bind(this);
        this.createGroup = this.createGroup.bind(this);
        this.fetchGroups = this.fetchGroups.bind(this);

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
    createGroup(){
        const { newGroupName } = this.state;
        createGroup(newGroupName);
        return;
    }
    
    fetchGroups(){
        this.setState({
            isFetchingData: true
        });
        const userUid = localStorage.getItem('uid');
        superagent
            .get(`https://postitdanny.herokuapp.com/getGroup/${userUid}/`)
            .end(
                (error, response) => {
                    if (error) {
                        console.log(error);
                        this.setState({
                            isFetchingData: false,
                            fetchMessage: 'Error fetching Data'
                    });
                    return;
                }
                // this.checkUserId(JSON.parse(response.text));
                this.setState({
                    isFetchingData: false,
                    groupList: JSON.parse(response.text),
                    fetchMessage: 'Successfully Loaded'
                });
                }
            )
    }
    render() {
        const { groupList, isFetchingData, fetchMessage, newGroupName } = this.state;

        if ( isFetchingData ){
            return <span>Loading!!</span>
        }
        return (
        <div className="page">
            <Navigator/>
            <div className="page-content">
                <div className="form">
                    <div>
                        <Button
                        onClick={ this.fetchGroups } value={'View Group' }
                        />
                        { fetchMessage }
                       <GroupList groupList={groupList} /> 
                    </div>
                {UserStore.getMessage()}
                <hr />
                <h1>Create A Group!</h1>
                <TextBox
                onChange={(value) => { this.setState({ newGroupName: value }); }}
                label="Group Name"
                currentValue={newGroupName}
                />
                <Button
                onClick={ this.createGroup }
                value={'Create Group' }
                />
               
            </div>
            </div>
        </div>);
    }
}

export default Groups;
