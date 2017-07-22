import React, { Component } from 'react';
import superagent from 'superagent';
import PropTypes from 'prop-types';
import Button from '../../../commons/button.js';


class Group extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetchingData:false,
            fetchMessage:'',
            isFetchingGroup: false,
            messageFetched: false
        };
        this.getGroupMessages = this.getGroupMessages.bind(this);
    }
    getGroupMessages(){
        console.log('Fetching Group Messages!');
    }

  
    createUserAddButton(isLoading) {
        return isLoading ? <span>Loading</span> : <span>
            <Button onClick={ this.getGroupMessages } value={'Login to this group' } />  </span>;
    }
    render() {
        const { group } = this.props;
        const { groupFetched, isFetchingGroup} = this.state;
        return (<div id="groups">
        <li>
            {group.groupName}
            { (!groupFetched) ? this.createUserAddButton(isFetchingGroup) : ''}
        </li>
        <div className="chatBox">
            
        </div>
       {/* <UserList userList = {userList} /> */}
       
       </div>
        );
    }
}

Group.propTypes = {
    group: PropTypes.object.isRequired
}

export default Group;
