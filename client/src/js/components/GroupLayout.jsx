import React, { Component } from 'react';
import ViewActions from '../actions/AppActions';
import GroupStore from '../stores/GroupStore';
import GroupList from './GroupList';
import Layout from './Layout';

const { getGroups } = ViewActions;


/**
 * @description This class is the Parent of the message components
 * 
 * @class GroupLayout
 * @extends {Component}
 */
class GroupLayout extends Component {
  /**
   * @constructor
   * Creates an instance of GroupLayout.
   * @param {any} props 
   * @memberof GroupLayout
   */
  constructor(props) {
    super(props);

    this.state = {
      groupList: GroupStore.getGroups(),
    };
    this._onChange = this._onChange.bind(this);
    this.fetchGroups = this.fetchGroups.bind(this);
  }
  /**
   * @description Adds a change listener to the
   * GroupStore just before the component is mounted
   * 
   * @memberof GroupLayout
   */
  componentWillMount() {
    this.fetchGroups();
    GroupStore.addChangeListener(this._onChange);
  }
  /**
   * @description Removes change listener just before 
   * the component unmounts
   * 
   * @memberof GroupLayout
   */
  componentWillUnmount() {
    GroupStore.removeChangeListener(this._onChange);
  }
  /**
 *   @description This method is passed to the change listeners
 * to update the state of the component when there is a 
 * change in the store
 * 
 * @memberof GroupLayout
 */
  _onChange() {
    this.setState({
      groupList: GroupStore.getGroups(),
    });
  }
  /**
 * @description this method when called triggers the getgroups actions
 * 
 * @memberof GroupLayout
 */
  fetchGroups() {
    const userUid = localStorage.getItem('userUid');
    getGroups(userUid);
  }
  /**
   * 
   * 
   * @returns 
   * @memberof GroupLayout
   */
  render() {
    const { groupList } = this.state;
    return (
      <div>
        <Layout/>
        <GroupList groupList= {groupList}/>
      </div>
    );
  }
}

export default GroupLayout;
