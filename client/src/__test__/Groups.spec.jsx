import React from 'react';
import { NavLink, MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import Groups from '../js/components/Groups';
import localStorageMock from './mocks/localstorageMock';
import seedData from './helpers/seeder';


jest.mock('toastr', () => jest.fn());
Object.defineProperty(window, 'localStorage', { value: localStorageMock });


describe('The Groups Component', () => {
  it('should have NavLink component', () => {
    const wrapper = mount(<MemoryRouter>
      <Groups group = { seedData.group }/></MemoryRouter>);
    expect(wrapper.find(NavLink)).toHaveLength(1);
  });

  it('should have these p tag defined', () => {
    const wrapper = shallow(<Groups group = { seedData.group }/>);
    expect(wrapper.find('p')).toHaveLength(1);
  });
  
  it('should call setGroupId method', () => {
    const setGroupIdSpy = jest.spyOn(Groups.prototype, 'setGroupId');
    const wrapper = shallow(<Groups group = { seedData.group }/>);
    wrapper.find('p').simulate('click');
    expect(setGroupIdSpy).toHaveBeenCalled();
  });
});
