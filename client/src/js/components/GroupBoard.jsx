import React, { Component } from 'react';
import ViewActions from '../actions/AppActions';
import GroupStore from '../stores/GroupStore';
import GroupList from './GroupList';
import Layout from './Layout';


const { getGroups, createGroup } = ViewActions;

class Groups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupList: GroupStore.getGroups(),
      isFetchingData: false,
      fetchMessage: '',
    };
    this._onChange = this._onChange.bind(this);
    this.fetchGroups = this.fetchGroups.bind(this);
  }
  componentWillMount() {
    GroupStore.addChangeListener(this._onChange);
  }
  componentWillUnmount() {
    GroupStore.removeChangeListener(this._onChange);
  }
  _onChange() {
    this.setState({
      groupList: GroupStore.getGroups(),
    });
  }
  doCreateGroup(event) {
    event.preventDefault();
    const newGroupName = this.refs.groupName.value.trim();
    const userUid = localStorage.getItem('userUid');
    const userName = localStorage.getItem('userName');
    if (newGroupName !== '') {
      createGroup(newGroupName, userUid, userName);
      this.refs.groupName.value = '';
    }
  }  
  fetchGroups() {
    const userUid = localStorage.getItem('userUid');
    getGroups(userUid);
  }
  render() {
    const { groupList } = this.state;
    return (
      <div>
        <Layout/>
        <div className="exTab1 container">
          <ul className="nav nav-pills">
            <li className="active">
              <a href="" data-target=".1a" data-toggle="tab">Create A Group</a>
            </li>
            <li><a className="fetchGroups" href="" onClick = {this.fetchGroups} 
              data-target=".2a"  data-toggle="tab">View Your Groups</a>
            </li>
          </ul>

          <div className="tab-content clearfix">
            <div className="tab-pane active 1a" id="1a" aria-hidden="true">
              <h3>Enter Group Name</h3>
              <form onSubmit={this.doCreateGroup.bind(this)}>
                <div className="form-group row">
                  <div className ="col-sm-4">
                    <input type="text" ref="groupName" 
                      className="form-control grpInput" 
                      id="groupName" required={true} />
                  </div>
                  <div className="col-sm-4">
                    <button type="submit" className="send" 
                      className="btn btn-primary grpButton" >
                      Create Group</button>
                  </div>
                </div>
              </form>
            </div>
            <div className="tab-pane 2a" id="2a" aria-hidden="true">
              <h3>The groups you Belong to;</h3>
              <GroupList groupList= {groupList}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Groups;
