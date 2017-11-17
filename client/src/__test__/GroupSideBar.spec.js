import React from 'react';
import { NavLink, MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import GroupSideBar from '../js/components/GroupSideBar';
import localStorageMock from './mocks/localstorageMock';
import seedData from './helpers/seeder';


jest.mock('toastr', () => jest.fn());
Object.defineProperty(window, 'localStorage', { value: localStorageMock });


describe('The GroupSideBar Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<MemoryRouter>
      <GroupSideBar group = { seedData.group }/></MemoryRouter>,
    );
  });
    
  it('should have NavLink', () => {
    expect(wrapper.find(NavLink)).toHaveLength(1);
  });
  it('should have these nodes', () => {
    const wrapper = shallow(<GroupSideBar group = { seedData.group }/>);
    expect(wrapper.find('p')).toHaveLength(1);
  });
  
  it('should simulates a click event', () => {
    const setGroupId = jest.fn();
    setGroupId();
    const wrapper = shallow(<GroupSideBar group = { seedData.group }/>);
    wrapper.find('p').simulate('click');
    expect(setGroupId).toHaveBeenCalled();
  });
});
