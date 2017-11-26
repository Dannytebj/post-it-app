import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import localStorageMock from './mocks/localstorageMock';
import Login from '../js/components/Login';
import TextBox from '../js/utils/textbox';
import Button from '../js/utils/button';
import Google from '../js/components/GoogleSignIn';
import PassWordReset from '../js/components/PasswordReset';
import UserStore from 'UserStore'; // eslint-disable-line

jest.mock('toastr', () => jest.fn());
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('The Login Component', () => {
  it('should have these Comonents defined', () => {
    const wrapper = mount(<Login/>);
    expect(wrapper.find(PassWordReset)).toHaveLength(1);
    expect(wrapper.find(Google)).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(TextBox)).toHaveLength(2);
  });
  it('should have an initial state  to be set to 0', () => {
    const wrapper = mount(<Login/>); 
    expect(wrapper.state().email.length).toEqual(0);
    expect(wrapper.state().password.length).toEqual(0);
    expect(wrapper.state().username.length).toEqual(0);
    expect(wrapper.state().phoneNumber.length).toEqual(0);
  });
  it('should show 4 textbox if state set to signingUp', () => {
    const wrapper = mount(<Login/>);
    wrapper.setState({ signingIn: false });
    expect(wrapper.find(TextBox)).toHaveLength(4);
  });
  it('should call toggleSignInUp function if clicked', () => {
    const wrapper = mount(<Login/>); 
    const toggleSignInUp = jest.fn();
    toggleSignInUp();
    wrapper.setState({ signingIn: true });
    wrapper.find('.toggler1').simulate('click');
    expect(toggleSignInUp).toHaveBeenCalled();
    expect(wrapper.state().signingIn).toBe(false);
  });
  it('should call resetPassword function if clicked', () => {
    const wrapper = mount(<Login/>); 
    const resetPassword = jest.fn();
    resetPassword();
    wrapper.find('.toggler3').simulate('click');
    expect(resetPassword).toHaveBeenCalled();
  });
  it('should update the state of email', () => {
    const wrapper = mount(<Login/>);
    wrapper.find('.email').simulate('change',
      { target: { value: 'danny@myself.com' } });
    expect(wrapper.state().email).toEqual('danny@myself.com');
  });
  it('should call the clickSign method when button is clicked', () => {
    const clickSignSpy = jest.spyOn(Login.prototype, 'clickSign');
    const wrapper = shallow(<Login/>);
    wrapper.find(Button).simulate('click'); 
    expect(clickSignSpy).toHaveBeenCalled();
  });
  it('should call the toggleSignInUp method when button is clicked', () => {
    const toggleSignInUpSpy = jest.spyOn(Login.prototype, 'toggleSignInUp');
    const wrapper = shallow(<Login/>);
    wrapper.find('.toggler1').simulate('click'); 
    expect(toggleSignInUpSpy).toHaveBeenCalled();
  });

  it('should have these defined functions', () => {
    const wrapper = mount(<Login />);
    expect(wrapper.node.clickSign).toBeDefined();
    expect(wrapper.node.onChange).toBeDefined();
    expect(wrapper.node.toggleSignInUp).toBeDefined();
    expect(wrapper.node.toggleResetPass).toBeDefined();
  });
  it('Should addChangeListener when component did mount', () => {
    const listenerSpy = spyOn(UserStore, 'addChangeListener');
    mount(<Login />);
    expect(listenerSpy).toHaveBeenCalled();
  });
  it('Should removeChangeListener when component will unMount', () => {
    const listenerSpy2 = spyOn(UserStore, 'removeChangeListener');
    const wrapper = mount(<Login />);
    wrapper.unmount();
    expect(listenerSpy2).toHaveBeenCalled();
  });
});

