import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import Navigator from '../navigation';



describe('Navigator Component', () => {
   
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Navigator/>, div);
    });

});