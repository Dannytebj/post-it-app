import React from 'react';
import { mount } from 'enzyme';
import localStorageMock from './mocks/localstorageMock';
import SignOut from '../js/components/SignOut';
import Layout from '../js/components/Layout';
import UserStore from 'UserStore'; // eslint-disable-line

jest.mock('toastr', () => jest.fn());
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('The SignOut Component', () => {
  it('should have the <Layout />', () => {
    const wrapper = mount(<SignOut/>);
    expect(wrapper.find(Layout)).toHaveLength(1);
  });
  it('should calls the logOut method', () => {
    const wrapper = mount(<SignOut/>);
    const logOut = jest.fn();
    logOut();
    wrapper.find('.yes-btn').simulate('click');
    expect(logOut).toHaveBeenCalled();
  });
  it('Should addChangeListener when component will mount', () => {
    const listenerSpy = spyOn(UserStore, 'addChangeListener');
    const wrapper = mount(<SignOut/>);
    expect(wrapper.node.home).toBeDefined();
    expect(wrapper.node.logOut).toBeDefined();
    expect(listenerSpy).toHaveBeenCalled();
  });
  it('Should removeChangeListener when component will unMount', () => {
    const listenerSpy2 = spyOn(UserStore, 'removeChangeListener');
    const wrapper = mount(<SignOut/>);
    wrapper.unmount();
    expect(listenerSpy2).toHaveBeenCalled();
  });
});
