import React from 'react';
import PropTypes from 'prop-types';

const MessageTextBox = ({ onChange, currentValue, className }) => (
  <div>
    <input className={className}
      type = "text"
      onChange = { (event) => {
        onChange(event.target.value);
      } }
      value = { currentValue }
    />
  </div>);


MessageTextBox.propTypes = {
  onChange: PropTypes.func.isRequired,
  currentValue: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default MessageTextBox;
