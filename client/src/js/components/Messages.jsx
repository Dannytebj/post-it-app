import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  messages: PropTypes.object.isRequired,
};
/**
 * @description This is a stateless component that helps display messages
 * @param {*} messages 
 * @returns A list element
 */
const Messages = ({ messages }) => (
  <div>
    <div>
      <span className=" center priorityTag">
        { `Priority: ${messages.priority}` }</span><br/>
      <span className="timeTag">{ messages.timeStamp }</span>
    </div>
    <span className="nameTag">{ messages.name }</span>
    <li className="well well-sm">
      { messages.message }
    </li>
  </div>
);

Messages.propTypes = propTypes;

export default Messages;

