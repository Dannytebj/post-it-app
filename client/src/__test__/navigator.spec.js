import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import MyNavigator from '../js/components/Navigation';

describe('Navigator Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MyNavigator/>, div);
  });
});
