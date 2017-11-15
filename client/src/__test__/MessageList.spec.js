import React from 'react';
import { NavLink, MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import localStorageMock from './mocks/localstorageMock';
import MessageList from '../js/components/MessageList';
import Messages from '../js/components/Messages';
import MessageStore from 'MessageStore'; //eslint-disable-line

jest.mock('toastr', () => jest.fn());
Object.defineProperty(window, 'localStorage', { value: localStorageMock });


describe('The MessageList Component', () => {
  let wrapper;
  let messages;
  let props;
  let mountedMessageList;

  const mountMessageList = () => {
    if (!mountedMessageList) {
      mountedMessageList = mount(
        <MessageList {...props} />,
      );
    }
    return mountedMessageList;
  };

  props = {
    match: {
      params: {
        groupId: 'kGPwsW5m3VbjcV2zikU',
      },
    },
  };
  beforeEach(() => {
    wrapper = mountMessageList();
  });
  
  it('should have props defined', () => {
    expect(wrapper.props).toBeDefined();
  });
  it('should call componentWillReceiveProps method', () => {
    const component = mountMessageList();
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
    const component = mountMessageList();
    const onChangeSpy = jest.spyOn(
      component.instance(), 'onChange',
    );

    component.instance().onChange();
    expect(onChangeSpy).toHaveBeenCalled();
  });

  it('it renders a div', () => {
    const component = mountMessageList();
    component.setState({
      messageList: [
        {
          id: "GkGPwsW5m3VbjcV2zikUGzPA2rk1",
          name: "Mozes Michael",
          messages: "Hello World!!",
        },
      ],
    });
    expect(component.find('div').length).toBeGreaterThan(0);
  });
  it('Should call removeChangeListener when component unmounts', () => {
    const listenerSpy2 = spyOn(MessageStore, 'removeChangeListener');
    wrapper.unmount();
    expect(listenerSpy2).toHaveBeenCalled();
  });
});
