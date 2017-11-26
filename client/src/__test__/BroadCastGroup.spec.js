import React from 'react';
import { shallow, mount } from 'enzyme';
import { Switch, Router, MemoryRouter } from 'react-router-dom';
import BroadCastGroup from '../js/components/BroadCastGroup';
import localStorageMock from './mocks/localstorageMock';
import MessageStore from 'MessageStore'; // eslint-disable-line
import MessageBoard from '../js/components/MessageBoard';
import MessageTextBox from '../js/utils/msgText';

jest.mock('toastr', () => jest.fn());
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('The BroadCastGroup Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<MemoryRouter><BroadCastGroup/></MemoryRouter>);
  });
  it('should have these components mounted', () => {
    expect(wrapper.find(MessageBoard)).toHaveLength(1);
    expect(wrapper.find(MessageTextBox)).toHaveLength(1);
    expect(wrapper.find(Router)).toHaveLength(2);
    expect(wrapper.find(Switch)).toHaveLength(1);
  });
  it('Should call removeChangeListener when component unmounts', () => {
    const listenerSpy = spyOn(MessageStore, 'removeChangeListener');
    wrapper.unmount();
    expect(listenerSpy).toHaveBeenCalled();
  });
  
  it('should button is clicked should call sendMessage method', () => {
    const sendMessageSpy = jest.spyOn(BroadCastGroup.prototype, 'sendMessage');
    const wrapper = shallow(<BroadCastGroup/>);
    wrapper.find('button').simulate('click');
    expect(sendMessageSpy).toHaveBeenCalled();
  });
});

