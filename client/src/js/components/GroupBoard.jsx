import React, { Component } from 'react';
import ViewActions from '../actions/AppActions';
import GroupStore from '../stores/GroupStore';
import GroupList from './GroupList.jsx';
import Layout from './Layout.jsx';


const { getGroups, createGroup } = ViewActions;

class Groups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupList: GroupStore.getGroups(),
      isFetchingData: false,
      fetchMessage: '',
    };
    this.onChange = this.onChange.bind(this);
    this.fetchGroups = this.fetchGroups.bind(this);
  }
  componentWillMount() {
    GroupStore.on('updateGroups', () => {
      this.setState({
        groupList: GroupStore.getGroups(),
      });
    });
  }
  componentWillUnmount() {
    GroupStore.removeChangeListener(this.onChange);
  }
  onChange() {
    this.forceUpdate();
  }
  doCreateGroup(event) {
    event.preventDefault();
    const newGroupName = this.refs.groupName.value.trim();
    const userId = localStorage.getItem('userUid');
    const userName = localStorage.getItem('userName');
    if (newGroupName !== '') {
      createGroup(newGroupName, userId, userName);
      this.refs.groupName.value = '';
    }
  }  
  fetchGroups() {
    const userUid = localStorage.getItem('userUid');
    console.log('fetching groups!!');
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
            <li><a href="" onClick = {this.fetchGroups} data-target=".2a"  data-toggle="tab">View Your Groups</a>
            </li>
          </ul>

          <div className="tab-content clearfix">
            <div className="tab-pane active 1a" id="1a" aria-hidden="true">
              <h3>Enter Group Name</h3>
              <form onSubmit={this.doCreateGroup.bind(this)}>
                <div className="form-group row">
                  <div className ="col-sm-4">
                    <input type="text" ref="groupName" className="form-control" 
                      id="groupName" required={true} />
                  </div>
                  <div className="col-sm-4">
                    <button type="submit" className="send" 
                      className="btn btn-primary" >Create Group</button>
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
