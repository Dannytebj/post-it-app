import React, { Component } from 'react';
import ViewActions from '../actions/AppActions';
import GroupStore from '../stores/GroupStore';
import TextBox from '../utils/textbox';
import Layout from './Layout';


const { createGroup } = ViewActions;

/**
 * @description This class handles creating groups
 * 
 * @class Groups
 * @extends {Component}
 */
class CreateGroup extends Component {
  /**
   * @description Creates an instance of Groups.
   * @constructor
   * @param {any} props 
   * @memberof Groups
   */
  constructor(props) {
    super(props);
    this.state = {
      fetchMessage: '',
      newGroupName: '',
    };
    this.onChange = this.onChange.bind(this);
    this.doCreateGroup = this.doCreateGroup.bind(this);
  }
  /**
   * @description Adds a change listener to the
   * Groupstore just before the component is mounted
   * 
   * @memberof Groups
   */
  componentWillMount() {
    GroupStore.addChangeListener(this.onChange);
  }
  /**
   * @description Removes change listener just before 
   * the component unmounts
   * 
   * @memberof Groups
   */
  componentWillUnmount() {
    GroupStore.removeChangeListener(this.onChange);
  }
  /**
   *  @description This method is passed to the change listeners
   * to update the state of the component when there is a 
   * change in the store
   * 
   * @memberof Groups
   */
  onChange() {
  }
  /**
   * @description This method calls the createGroup Action
   * 
   * @param {any} event 
   * @memberof Groups
   */
  doCreateGroup(event) {
    event.preventDefault();
    const { newGroupName } = this.state;
    const userUid = localStorage.getItem('userUid');
    const userName = localStorage.getItem('userName');
    if (newGroupName !== '') {
      createGroup(newGroupName, userUid, userName);
      this.setState({
        newGroupName: '',
      });
    } 
  }
  /**
   * 
   * 
   * @returns jsx component of the GroupBoard
   * @memberof Groups
   */
  render() {
    const { newGroupName } = this.state;
    return (
      <div>
        <Layout/>
        <div className="exTab1 container">
          <div className="tab-content clearfix">
            <div className="tab-pane active 1a" id="1a" aria-hidden="true">
              <div className="row">
                <p className ="col-md-6 para">
                  <strong>Welcome to your GroupBoard,
                  </strong><br/>
                  Post-It allows you to create groups and add other users 
                  to that group.
                  To create a group, kindly enter the name of your group 
                  and click the Create Group button
                </p>
              </div>
              <form onSubmit={this.doCreateGroup}>
                <div className="form-group row">
                  <div className ="col-sm-6">
                    <TextBox
                      className = "groupName"
                      onChange={(value) => { 
                        this.setState({ newGroupName: value }); 
                      }}
                      label=""
                      currentValue={newGroupName}
                    />
                  </div>
                  <div className="col-sm-4">
                    <button type="submit" className="send" 
                      className="btn btn-primary grpButton" >
                      Create Group</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateGroup;
