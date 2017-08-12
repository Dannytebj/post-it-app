import React from 'react';
import PropTypes from 'prop-types';
import Groupmessage from './groupMessages';

const MessageList = ({ receivedMessage }) => {
    return (<ul>
        {
            receivedMessage.map((message, index) => {
                return (<Groupmessage messages= {message} key= {index} />);
            })
        }
    </ul>);
};

MessageList.propTypes = {
    receivedMessage: PropTypes.array.isRequired
};

export default MessageList;
