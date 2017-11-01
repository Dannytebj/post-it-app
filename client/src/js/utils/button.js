import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick, value }) => {
    return (<div>
        <button
            type = "text"
            onClick = { () => {
                onClick();
            } }
        >{ value }</button>
    </div>);
};

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
};

export default Button;
