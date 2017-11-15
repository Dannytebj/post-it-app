import React from 'react';
import { NavLink, MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import Groups from '../js/components/Groups';
import localStorageMock from './mocks/localstorageMock';

jest.mock('toastr', () => jest.fn());
Object.defineProperty(window, 'localStorage', { value: localStorageMock });


describe('The Groups Component', () => {
  let group;
  let wrapper;
  beforeEach(() => {
    group =   {
      groupId: "-KqA34JyVjKTzw0-Pbrx",
      groupName: "The ThroneRoom Priests",
      isAdmin: true,
    };
  });
    
  it('should have NavLink', () => {
    wrapper = mount(<MemoryRouter><Groups group = { group }/></MemoryRouter>);
    expect(wrapper.find(NavLink)).toHaveLength(1);
  });

  it('should have these nodes', () => {
    const wrapper = shallow(<Groups group = { group }/>);
    expect(wrapper.find('p')).toHaveLength(1);
  });
  
  it('should simulates a click event', () => {
    const setGroupId = jest.fn();
    setGroupId();
    const wrapper = shallow(<Groups group = { group }/>);
    wrapper.find('p').simulate('click');
    expect(setGroupId).toHaveBeenCalled();
  });
});
