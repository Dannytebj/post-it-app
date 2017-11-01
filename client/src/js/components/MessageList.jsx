import React from 'react';
import PropTypes from 'prop-types';
import Messages from './Messages';

const MessageList = ({ messageList }) => (
  <ul className="list-group">
    {
      messageList.map((messages, index) => 
        (<Messages messages={messages} key={index}/>))
    }
  </ul>
);

MessageList.propTypes = {
  messageList: PropTypes.array.isRequired,
};

export default MessageList;
