import React, { Component } from 'react';
import $ from 'jquery';
import ViewActions from '../actions/AppActions';
import GroupStore from '../stores/GroupStore';
import GroupList from './GroupList';
import Layout from './Layout';

const { getGroups } = ViewActions;


/**
 * @description This class is
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
    this.onChange = this.onChange.bind(this);
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
    GroupStore.addChangeListener(this.onChange);
  }
  /**
   * @description enables toggling of group side bar
   * when component mounted
   * 
   * @memberof GroupLayout
   */
  componentDidMount() {
    $("#menu-toggle").click((e) => {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  }
  /**
   * @description Removes change listener just before 
   * the component unmounts
   * 
   * @memberof GroupLayout
   */
  componentWillUnmount() {
    GroupStore.removeChangeListener(this.onChange);
  }
  /**
 *   @description This method is passed to the change listeners
 * to update the state of the component when there is a 
 * change in the store
 * 
 * @memberof GroupLayout
 */
  onChange() {
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
        <a href="#menu-toggle" className="btn btn-default toggler" 
          id="menu-toggle">Toggle Groups</a>

      </div>
    );
  }
}

export default GroupLayout;
