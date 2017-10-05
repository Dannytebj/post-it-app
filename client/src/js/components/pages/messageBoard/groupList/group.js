import React, { Component } from 'react';
// import superagent from 'superagent';
import PropTypes from 'prop-types';
import Button from '../../../commons/button.js';
import MessageActions from '../../../../actions/MessageActions';
import MessageStore from "../../../../stores/MessageStore";
import Messages from '../messages.js';

const {getGroupMessages} = MessageActions;
class Group extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetchingData:false,
            fetchMessage:'',
            isFetchingGroup: false,
            messageFetched: false,
            groupIsSet:false
        };
        this.setGroup = this.setGroup.bind(this);
        this.collapse = this.collapse.bind(this);
    }
    setGroup(){
        localStorage.setItem('groupId', this.props.group.groupId);        
        const currentGroupId = this.props.group.groupId;
        getGroupMessages(currentGroupId);
        this.setState({
            groupIsSet: true
        });
        console.log('Fetching Group Messages!');
    }
    collapse(){
        this.setState({
            groupIsSet: false
        });
       MessageStore.clearMessages(); 
    }

  
    createUserAddButton(isLoading) {
        return isLoading ? <span>Loading</span> : <span>
            <Button onClick={ this.setGroup } 
            value={'Login to this group' } />  </span>;
    }
    render() {
        const { group } = this.props;
        const { groupFetched, isFetchingGroup, groupIsSet} = this.state;
        return (<div>
        <li>
            <p className="groupName">{group.groupName}</p><hr/>
            { (!groupFetched) ? this.createUserAddButton(isFetchingGroup) : ''}
        </li>
        <div className="messages">
           {(groupIsSet) ? <div><span id="hide" onClick={this.collapse}> 
               Close </span> <Messages /> </div> : ''}
        </div>       
       </div>
        );
    }
}

Group.propTypes = {
    group: PropTypes.object.isRequired
}

export default Group;
