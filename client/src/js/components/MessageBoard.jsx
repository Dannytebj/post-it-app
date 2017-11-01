import React, { Component } from 'react';
import ViewActions from '../actions/AppActions';
import MessageStore from '../stores/MessageStore';
import MessageGroupList from './MessageGroupList';
import Layout from './Layout';


const { getGroups } = ViewActions;

class MessageBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupList: MessageStore.getGroups(),
      isFetchingData: false,
      fetchMessage: '',
    };
    this._onChange = this._onChange.bind(this);
    this.fetchGroups = this.fetchGroups.bind(this);
  }
  componentWillMount() {
    this.fetchGroups();
    MessageStore.addChangeListener(this._onChange);
  }
  componentWillUnmount() {
    MessageStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({
      groupList: MessageStore.getGroups(),
    });
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
              <a href="" onClick = {this.fetchGroups}  data-target=".1a" data-toggle="tab">Message Board</a>
            </li>
            <li><a href="" data-target=".2a"  data-toggle="tab">empty</a>
            </li>
          </ul>
          <div className="tab-content clearfix">
            <div className="tab-pane active 1a" id="1a" aria-hidden="true">
              <h3>Your Groups</h3>
              <MessageGroupList groupList= {groupList}/>
            </div>
            <div className="tab-pane 2a" id="2a" aria-hidden="true">
              <h3>The groups you Belong to;</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MessageBoard;
