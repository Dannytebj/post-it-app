import React from 'react';
import PropTypes from 'prop-types';
/**
 * @description This is a stateless component that helps display messages
 * @param {*} messages 
 * @returns A list element
 */
const Messages = ({ messages }) => (
  <div>
    <span className="nameTag">{ messages.name }</span>
    <li className="well well-sm">
      { messages.message }
    </li>
  </div>
);

Messages.propTypes = {
  messages: PropTypes.object.isRequired,
};
export default Messages;

