import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Groupmessage extends Component {
    constructor(props) {
      super(props);
    };


  render() {
    const { messages } = this.props;
    return(
      <div>
        <li>{messages.message}</li>
      </div>
    )
  }
}

Groupmessage.propTypes = {
    messages: PropTypes.object.isRequired
}

export default Groupmessage;