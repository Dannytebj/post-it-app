import React from 'react';
import { NavLink, MemoryRouter } from 'react-router-dom';
import {  mount } from 'enzyme';
import MyNavigator from '../js/components/Navigation';

describe('Navigator Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<MemoryRouter><MyNavigator/></MemoryRouter>);
  });
  it('should have NavLink', () => {
    expect(wrapper.find(NavLink)).toHaveLength(5);
  });
});
