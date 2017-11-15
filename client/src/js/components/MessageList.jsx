import React, { Component } from 'react';
import shortid from 'shortid';
import MessageStore from '../stores/MessageStore';
import Messages from './Messages';

/**
 * 
 * 
 * @class MessageList
 * @extends {Component}
 */
class MessageList extends Component {
  /**
   * Creates an instance of MessageList.
   * @param {any} props 
   * @memberof MessageList
   */
  constructor(props) {
    super(props);
    this.state = {
      groupId: props.match.params.groupId,  // eslint-disable-line
      messageList: MessageStore.getAllMessages(),
    };
    this.onChange = this.onChange.bind(this);
  }

  /**
   * @description Adds a ChangeListener to store just
   * before the component mounts
   * 
   * @memberof MessageList
   */
  componentWillMount() {
    MessageStore.addChangeListener(this.onChange);
  }
  /**
     * @description Removes change listener just before 
     * the component unmounts
     * 
     * @memberof GroupMessages
     */
  componentWillUnmount() {
    MessageStore.removeChangeListener(this.onChange);
  }
  /**
   * 
   * 
   * @memberof BroadCastGroup
   */
  componentWillReceiveProps(newProps) {
    MessageStore.addChangeListener(this.onChange);
    this.setState({
      groupId: newProps.match.params.groupId,
    });
  }
  /**
   * @description This method is passed to the change listeners
   * to update the state of the component when there is a 
   * change in the store
   * 
   * @memberof GroupMessages
   */
  onChange() {
    this.state.messageList = MessageStore.getAllMessages();
  }

  /**
   * 
   * 
   * @returns 
   * @memberof MessageList
   */
  render() {
    const { messageList } = this.state;
    return (
      <div>
        <ul className="list-group"> 
          {
            messageList.map(messages => 
              (<Messages messages={messages} key={shortid.generate()}/>))
          } 
        </ul>  
      </div>
    );
  }
}

export default MessageList;
