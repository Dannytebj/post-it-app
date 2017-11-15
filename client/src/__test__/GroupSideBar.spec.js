import React from 'react';
import { NavLink, MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import GroupSideBar from '../js/components/GroupSideBar';
import localStorageMock from './mocks/localstorageMock';

jest.mock('toastr', () => jest.fn());
Object.defineProperty(window, 'localStorage', { value: localStorageMock });


describe('The GroupSideBar Component', () => {
  let group;
  let wrapper;
  beforeEach(() => {
    group =   {
      groupId: "-KqA34JyVjKTzw0-Pbrx",
      groupName: "The ThroneRoom Priests",
      isAdmin: true,
    };
    wrapper = mount(<MemoryRouter><GroupSideBar group = { group }/></MemoryRouter>);
  });
    
  it('should have NavLink', () => {
    expect(wrapper.find(NavLink)).toHaveLength(1);
  });
  it('should have these nodes', () => {
    const wrapper = shallow(<GroupSideBar group = { group }/>);
    expect(wrapper.find('p')).toHaveLength(1);
  });
  
  it('should simulates a click event', () => {
    const setGroupId = jest.fn();
    setGroupId();
    const wrapper = shallow(<GroupSideBar group = { group }/>);
    wrapper.find('p').simulate('click');
    expect(setGroupId).toHaveBeenCalled();
  });
});
