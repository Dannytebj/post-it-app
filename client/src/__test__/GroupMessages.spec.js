import React from 'react';
import { shallow, mount } from 'enzyme';
import AllUsers from '../js/components/AllUsers';
import GroupUsers from '../js/components/GroupUsers';
import localStorageMock from './mocks/localstorageMock';
import MessageStore from 'MessageStore'; // eslint-disable-line
import GroupMessages from '../js/components/GroupMessages';
import MessageList from '../js/components/MessageList';
import MessageTextBox from '../js/utils/msgText';


jest.mock('toastr', () => jest.fn());
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('The GroupMessages Component', () => {
  let messageList;
  let group;
  //   let groupId;
  beforeEach(() => {
    messageList =
          {
            id: "sLoAYxwu0uRb7XCkTVAp2llLMm43",
            name: "DannyBoyNow",
            message: "Test Message!",
          };
    group =   
    {
      groupId: "-KqA34JyVjKTzw0-Pbrx",
      groupName: "The ThroneRoom Priests",
      isAdmin: true,
    };
  }); 
  it('Should call addChangeListener when component will mount', () => {
    const listenerSpy = spyOn(MessageStore, 'addChangeListener');
    const wrapper = mount(<GroupMessages group = {group}  />);
    expect(wrapper.find('.groupName').contains(group.groupName));
    expect(wrapper.node.showGroupMessages).toBeDefined();
    expect(listenerSpy).toHaveBeenCalled();
  });
  it('Should call removeChangeListener when component unmounts', () => {
    const listenerSpy2 = spyOn(MessageStore, 'removeChangeListener');
    const wrapper = mount(<GroupMessages group = {group}  />);
    wrapper.unmount();
    expect(listenerSpy2).toHaveBeenCalled();
  });
  it('Should Have a MessageTextBox Component', () => {
    const wrapper = mount(<GroupMessages group = {group}  />);
    const showGroupMessages = jest.fn();
    showGroupMessages();
    wrapper.find('.groupList').simulate('click');
    expect(showGroupMessages).toHaveBeenCalled();
    expect(localStorage.getItem('groupId')).toEqual('-KqA34JyVjKTzw0-Pbrx');
    expect(MessageTextBox).toHaveLength(1);
  });
  it('Should set groupId/groupName when showGroupMessages is clicked', () => {
    const wrapper = mount(<GroupMessages group = {group}  />);
    const showGroupMessages = jest.fn();
    showGroupMessages();
    wrapper.find('.groupList').simulate('click');
    expect(MessageTextBox).toHaveLength(1);
    wrapper.find('.msgText').simulate('change', 
      { target: { value: 'Test Message' } });
    expect(wrapper.state().message).toEqual('Test Message');
    expect(wrapper.find('.btn')).toHaveLength(2);
  });
  it('Should call sendMessage when send button is clicked', () => {
    const wrapper = mount(<GroupMessages group = {group}  />);
    const showGroupMessages = jest.fn();
    const sendMessage = jest.fn();
    sendMessage();
    showGroupMessages();
    wrapper.find('.groupList').simulate('click');
    expect(MessageTextBox).toHaveLength(1);
    expect(MessageList).toHaveLength(1);
    wrapper.find('.msgText').simulate('change', 
      { target: { value: 'Test Message' } });
    expect(wrapper.state().message).toEqual('Test Message');
    wrapper.find('.send-msg').simulate('click');
    expect(sendMessage).toHaveBeenCalled();
  });
  it('Should have a DropDown', () => {
    const wrapper = mount(<GroupMessages group = {group}  />);
    const showGroupMessages = jest.fn();
    showGroupMessages();
    wrapper.find('.groupList').simulate('click');
    expect(MessageTextBox).toHaveLength(1);
    expect(wrapper.find('.dropdown-menu')).toHaveLength(1);
  });
});
