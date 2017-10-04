import React, { Component } from 'react';
import superagent from 'superagent';
import GroupActions from '../../../actions/groupActions';
import groupStore from '../../../stores/groupStore';
import TextBox from '../../commons/textbox.js';
import Button from '../../commons/button.js';
import GroupList from './groupList';
import Layout from '../layout';

const ReactToastr = require('react-toastr');
const { ToastContainer } = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
const { getGroups, createGroup } = GroupActions;
class Groups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newGroupName:'',
            groupList:groupStore.allGroups(),
            isFetchingData: false,
            fetchMessage:''
        };
        this._onChange = this._onChange.bind(this);
        this.doCreateGroup = this.doCreateGroup.bind(this);
        this.fetchGroups = this.fetchGroups.bind(this);

    }
    componentWillMount(){
        groupStore.on('updateGroupStore', ()=> {
        let message = groupStore.getMessage();
            this.setState({
                groupList:groupStore.allGroups()
            });
        this.container.success(
          "Messsage:",
          message, {
            timeOut: 5000,
            extendedTimeOut: 3000
          });
      });    
        groupStore.on('getGroupError', ()=> {
        let message = groupStore.getMessage();
        this.container.error(
          message,
          'Sorry and Error has ocurred',{
            timeOut: 5000,
            extendedTimeOut: 3000
          })
        });
        groupStore.on('createGroupError', ()=> {
        let message = groupStore.getMessage();
        this.container.error(
          message,
          'Sorry and Error has ocurred',{
            timeOut: 5000,
            extendedTimeOut: 3000
          })
        });
    }
    componentDidMount() {
        groupStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        groupStore.removeChangeListener(this._onChange);
    }
    _onChange() {
        this.forceUpdate();
    }
    doCreateGroup(){
        const { newGroupName } = this.state;
        const userId = localStorage.getItem('uid');
        const userName = localStorage.getItem('userName')
        createGroup(newGroupName, userId, userName);
        this.setState({
            fetchMessage: groupStore.getMessage(),
        });
        return;
    }
    
    fetchGroups(){
        const userUid = localStorage.getItem('uid');
        getGroups(userUid);
        this.setState({
            fetchMessage: groupStore.getMessage(),
        });
        return;
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
    <ToastContainer ref={(input) => {this.container = input;}}
                        toastMessageFactory={ToastMessageFactory}
                        className="toast-top-right"
                        preventDuplicates= {true} />
<div className="row">
    <Layout/>
  <div className="col-sm-9">
      <div className="jumbotron">
          <div className="panel panel-default">
            <div className="panel-body">
          <p><h2>Welcome,</h2><br/> Here you can view groups you belong to, and add 
              a user to that group if it was a group you created !</p>
            <Button
                onClick={ this.fetchGroups } value={'View Your Groups' }
            />
          </div>
          </div>
        <div className="form1">
            {(fetchMessage) ? <div className="alert alert-info" role="alert">
               {fetchMessage}
            </div> : ''}
            <div className="groups">
 
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
                onClick={ this.doCreateGroup }
                value={'Create Group' }
            />
            </div>
              </div>
            </div>
        </div>
    </div>
</div>
    );
    }
}

export default Groups;
