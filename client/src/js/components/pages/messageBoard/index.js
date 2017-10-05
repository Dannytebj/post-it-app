import React, { Component } from 'react';
import superagent from 'superagent';
// import UserStore from '../../../stores/UserStore';
// import viewActions from '../../../actions/viewActions';
// import Button from './button.js';
import GroupList from './groupList/'
import Layout from '../layout';

// const { fetchGroups } = Groups;
class MessageBoard extends Component{
     constructor(props) {
        super(props);
        this.state = {
            groupList:[],
            isFetchingData: false,
            fetchMessage:'',
            showChatBox:false
        };
        this._onChange = this._onChange.bind(this);
        this.fetchGroups = this.fetchGroups.bind(this);
    }

    _onChange() {
        this.forceUpdate();
    }
  
      fetchGroups(){
        this.setState({
            isFetchingData: true
        });
        const userUid = localStorage.getItem('uid');
        superagent
            .get(`/getGroup/${userUid}`)
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
                    fetchMessage: 'Successfully Loaded',
                    showChatBox: true
                });
                }
            )
    }
render(){
    const { groupList, isFetchingData, fetchMessage, showChatBox} = this.state;
    if (isFetchingData){
        return <span>Loading!!!</span>
    }
    return(
<div className="container-fluid">
<div className="row">
    <Layout/>
  <div className="col-sm-9">
      <div className="jumbotron">
          <div className="panel panel-default">
            <div className="panel-body">
          <p>Welcome, Here are the list of group(s) you belong to, 
              to send messages log into a group and post messages! <br/>
              <button type="button" className="btn btn-primary btn-lg" 
              onClick={this.fetchGroups}>Start Chatting!</button>
              </p>
             
          </div>
          </div>
          {(!showChatBox) ? '' : 
            <div className="page-content">
            {(fetchMessage) ? <div className="alert alert-info" 
            role="alert">{fetchMessage}</div> : ''}
            <h4>Welcome to Message Board</h4>
            <div className="messageBoard">
            <GroupList groupList={groupList} />
            </div>
            </div>
            }
        </div>
        </div>
    </div>
</div>
    )
}
}
export default MessageBoard;
