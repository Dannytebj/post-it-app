import React, { Component } from 'react';
import superagent from 'superagent';
import viewActions from '../../../actions/viewActions.js';
import UserStore from '../../../stores/UserStore.js';
import TextBox from '../../commons/textbox.js';
import Button from '../../commons/button.js';
import GroupList from './groupList';
import Layout from '../layout';
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
            .set('Accept', 'application/json')
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
                this.setState({
                    isFetchingData: false,
                    groupList: JSON.parse(response.text),
                    fetchMessage: 'Successfully Loaded'
                });
                }
            )
    }
    render() {
        const { groupList, 
            isFetchingData, 
            fetchMessage, 
            newGroupName } = this.state;

        if ( isFetchingData ){
            return <span>Loading!!</span>
        }
        return (
<div className="container-fluid">
<div className="row">
    <Layout/>
  <div className="col-sm-9">
      <div className="jumbotron">
          <div className="panel panel-default">
            <div className="panel-body">
          <p>Welcome, Here you can view groups you belong to, and add 
              a user to that group if it was a group you created !</p>
          </div>
          </div>
        <div className="form">
            <div className="alert alert-info" role="alert">
                {UserStore.getMessage()}
            </div>
            <Button
                onClick={ this.fetchGroups } value={'View Group' }
            />
                { fetchMessage }
            <GroupList groupList={groupList} /> 
                <hr />
            <h3>Create A Group!</h3>
            <TextBox
                onChange={(value) => { 
                    this.setState({ newGroupName: value }); }}
                label="Group Name"
                currentValue={newGroupName}
            />
            <Button
                onClick={ this.createGroup }
                value={'Create Group' }
            />
              </div>
            </div>
        </div>
    </div>
</div>
    );
    }
}

export default Groups;
