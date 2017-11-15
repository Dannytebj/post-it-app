import React from 'react';
import { NavLink, MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import localStorageMock from './mocks/localstorageMock';
import UserList from '../js/components/UserList';
import GroupUsers from '../js/components/GroupUsers';
import GroupStore from 'GroupStore'; //eslint-disable-line

jest.mock('toastr', () => jest.fn());
Object.defineProperty(window, 'localStorage', { value: localStorageMock });


describe('The UserList Component', () => {
  let wrapper;
  let props;
  let mountedUserList;

  const mountUserList = () => {
    if (!mountedUserList) {
      mountedUserList = mount(
        <UserList {...props} />,
      );
    }
    return mountedUserList;
  };

  props = {
    match: {
      params: {
        groupId: 'kGPwsW5m3VbjcV2zikU',
      },
    },
  };
  beforeEach(() => {
    wrapper = mountUserList();
  });
  
  it('should have props defined', () => {
    expect(wrapper.props).toBeDefined();
  });
  it('should call componentWillReceiveProps method', () => {
    const component = mountUserList();
    const componentWillReceivePropsSpy = jest.spyOn(
      component.instance(), 'componentWillReceiveProps',
    );
    const newProps = {
      match: {
        params: {
          groupId: 'kGPwsW5m3VbjcV2zikU',
        },
      },
    };

    component.instance().componentWillReceiveProps(newProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
  });
  it('should call onChange method', () => {
    const component = mountUserList();
    const onChangeSpy = jest.spyOn(
      component.instance(), 'onChange',
    );

    component.instance().onChange();
    expect(onChangeSpy).toHaveBeenCalled();
  });

  it('it renders a div', () => {
    const component = mountUserList();
    component.setState({
      userList: [
        {
          id: "GkGPwsW5m3VbjcV2zikUGzPA2rk1",
          name: "Mozes Michael",
          email: "mozez@gmail.com",
        },
      ],
    });
    expect(component.find('ul').length).toBeGreaterThan(0);
  });
  it('Should call removeChangeListener when component unmounts', () => {
    const listenerSpy2 = spyOn(GroupStore, 'removeChangeListener');
    wrapper.unmount();
    expect(listenerSpy2).toHaveBeenCalled();
  });
});
