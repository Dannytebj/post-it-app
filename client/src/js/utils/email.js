import React from 'react';
import PropTypes from 'prop-types';

const Email = ({onChange, email, label, currentValue}) => {
    return( 
    <div> 
        <label> {label} </label>
            <input
            type = {email}
             onChange = { (e) => {
                onChange(e.target.value);
            } }
            value = { currentValue}
        />
    </div>
        );
};

Email.PropTypes = {
    label: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    currentValue: PropTypes.func.isRequired,
    email: function(props, email, componentName) {
          if (!/emailRegex/.test(props[email])) {
               return new Error('Please Enter a Valid Email Address! Thanks.');
          }
        }
};
export default Email;