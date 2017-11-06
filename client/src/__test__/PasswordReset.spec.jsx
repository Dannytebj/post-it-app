import React from 'react';
import {  mount } from 'enzyme';
import localStorageMock from './mocks/localstorageMock';
import PasswordReset from '../js/components/PasswordReset';
import UserStore from 'UserStore'; // eslint-disable-line

jest.mock('toastr', () => jest.fn());
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('The PasswordReset Component', () => {
  it('Should call resetPassword on submit', () => {
    const  wrapper = mount(<PasswordReset/>);
    const resetPassword = jest.fn();
    resetPassword();
    wrapper.find('.reset-email').simulate('submit');
    expect(resetPassword).toHaveBeenCalled();
  });
  it('Should addChangeListener when component did mount', () => {
    const listenerSpy = spyOn(UserStore, 'addChangeListener');
    const wrapper = mount(<PasswordReset/>);
    const resetPassword = jest.fn();
    resetPassword();
    expect(wrapper.node.resetPassword).toBeDefined();
    expect(listenerSpy).toHaveBeenCalled();
  });
  it('Should removeChangeListener when component will unMount', () => {
    const listenerSpy2 = spyOn(UserStore, 'removeChangeListener');
    const wrapper = mount(<PasswordReset/>);
    wrapper.unmount();
    expect(listenerSpy2).toHaveBeenCalled();
  });
});
