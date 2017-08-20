import React from 'react';
import PropTypes from 'prop-types';

const TextBox = ({ onChange, currentValue, label, isPassword }) => {
    return (<div className="messageBox">
        <label>{label}</label>
        <input
            type = {isPassword ? 'password' : 'text'}
            onChange = { (e) => {
                onChange(e.target.value);
            } }
            value = { currentValue }
        />
    </div>);
};


TextBox.propTypes = {
    onChange: PropTypes.func.isRequired,
    currentValue: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    isPassword: PropTypes.bool
};

export default TextBox;
