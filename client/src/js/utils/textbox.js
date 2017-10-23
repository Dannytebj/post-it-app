import React from 'react';
import PropTypes from 'prop-types';

const TextBox = ({ onChange, currentValue, label, isPassword }) => {
  return (<div>
    <label>{label}</label>
    <input className= "form-control"
      type = {isPassword ? 'password' : 'text'}
      onChange = { (event) => {
        onChange(event.target.value);
      } }
      value = { currentValue }
    />
  </div>);
};


TextBox.propTypes = {
  onChange: PropTypes.func.isRequired,
  currentValue: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isPassword: PropTypes.bool,
};

export default TextBox;
