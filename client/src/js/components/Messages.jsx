import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Messages extends Component {
  constructor(props){
    super(props);
  }
  render () {
    const { messages } = this.props;
    return (
      <div>
        <span className="nameTag">{ messages.name }</span>
        <li className="well well-sm">
          { messages.message }
        </li>
      </div>
    );
  }
}
Messages.propTypes = {
  messages: PropTypes.object.isRequired,
};
export default Messages;

