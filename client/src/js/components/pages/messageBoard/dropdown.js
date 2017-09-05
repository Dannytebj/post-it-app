import React from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({onChange, currentValue, label }) => {
    return (
        <div>
            <label>{label}</label>
            <select>
                <option 
                onChange = { (e) =>{
                    onChange(e.target.value);
                }
                }>{currentValue}</option>
            </select>
        </div>
    );
};
Dropdown.propTypes = {
    onChange: PropTypes.func.isRequired,
    currentValue: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
}
export default Dropdown;