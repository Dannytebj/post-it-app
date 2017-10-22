import React from 'react';
import PropTypes from 'prop-types';
import Messages from './Messages.jsx';

const MessageList = ({ messageList }) => {
  return (
    <ul className="list-group">
      {
        messageList.map((messages, index) => {
          return (<Messages messages={messages} key={index}/>);
        })
      }
    </ul>
  );
};

MessageList.propTypes = {
  messageList: PropTypes.array.isRequired,
};

export default MessageList;
