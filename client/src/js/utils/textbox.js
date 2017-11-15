import React from 'react';
import PropTypes from 'prop-types';

const TextBox = ({ onChange, currentValue, label, isPassword, className }) => 
  (<div>
    <label>{label}</label>
    <input className={className}
      type = {isPassword ? 'password' : 'text'}
      onChange = { (event) => {
        onChange(event.target.value);
      } }
      value = { currentValue }
    />
  </div>);


TextBox.propTypes = {
  onChange: PropTypes.func.isRequired,
  currentValue: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isPassword: PropTypes.bool,
  className: PropTypes.string,
};

export default TextBox;
