import React from 'react';
import { shallow, mount } from 'enzyme';
import { Switch, Router, MemoryRouter } from 'react-router-dom';
import GroupsBoard from '../js/components/GroupsBoard';
import localStorageMock from './mocks/localstorageMock';
import GroupLayout from '../js/components/GroupLayout';
import GroupStore from 'GroupStore'; // eslint-disable-line
import AddUser from '../js/components/AddUser';

jest.mock('toastr', () => jest.fn());
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('The GroupsBoard Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<MemoryRouter><GroupsBoard/></MemoryRouter>);
    localStorage.setItem('isAdmin', 'isAdmin');
  });
  it('should have these components mounted', () => {
    expect(wrapper.find(GroupLayout)).toHaveLength(1);
    expect(wrapper.find(AddUser)).toHaveLength(1);
    expect(wrapper.find(Router)).toHaveLength(2);
    expect(wrapper.find(Switch)).toHaveLength(1);
  });
  it('Should call removeChangeListener when component unmounts', () => {
    const listenerSpy2 = spyOn(GroupStore, 'removeChangeListener');
    wrapper.unmount();
    expect(listenerSpy2).toHaveBeenCalled();
  });
  
  it('should should simulate a click event', () => {
    const showAllUsers = jest.fn();
    showAllUsers();
    const wrapper = shallow(<GroupsBoard/>);
    wrapper.find('button').simulate('click');
    expect(showAllUsers).toHaveBeenCalled();
  });
});

