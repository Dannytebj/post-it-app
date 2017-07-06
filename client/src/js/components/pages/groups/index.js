import React, { Component } from 'react';
import superagent from 'superagent';
import Navigator from '../../navigation';
import viewActions from '../../../actions/viewActions.js';
import UserStore from '../../../stores/UserStore.js';
import TextBox from '../../commons/textbox.js';
import Button from '../../commons/button.js';
import GroupList from './groupList';
import '../../../../index.scss';


const { createGroup } = viewActions;
// const { fetchGroups } = AddUser;

class Groups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newGroupName: '',
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
        const { groupName } = this.state;
        createGroup(groupName);
        return;
    }
    // checkUserId(arr){
    //     const currentUserId = localStorage.getItem('uid');
    //     Object.entries(arr).forEach(([key, value]) => {
    //         console.log(value['users']);

    //     })
    // }

    fetchGroups(){
        this.setState({
            isFetchingData: true
        });
        const userUid = localStorage.getItem('uid');
        superagent
            .get(`https://postitdanny.herokuapp.com/getUsers`)
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
                console.log(this.state.groupList);
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
                <h1>Create A Group!</h1>
                <TextBox
                onChange={(value) => { this.setState({ groupName: value }); }}
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
