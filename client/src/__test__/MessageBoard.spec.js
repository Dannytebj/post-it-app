import React from 'react';
import { shallow, mount } from 'enzyme';
import localStorageMock from './mocks/localstorageMock';
import MessageBoard from '../js/components/MessageBoard';
import MessageGroupList from '../js/components/MessageGroupList';
import Layout from '../js/components/Layout';
import MessageStore from 'MessageStore'; // eslint-disable-line

jest.mock('toastr', () => jest.fn());
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('The MessageBoard Component', () => {
  let groupList;
  beforeEach(() => {
    groupList = [
      {
        groupId: "-KqA34JyVjKTzw0-Pbrx",
        groupName: "The ThroneRoom Priests",
        isAdmin: true,
      },
      {
        groupId: "-Kr5X4AB7meaxVPSWFIt",
        groupName: "oreoluwade",
        isAdmin: false,
      },
    ];
  });
  it('should have the <Layout />', () => {
    const wrapper = mount(<MessageBoard/>);
    expect(wrapper.find(Layout)).toHaveLength(1);
  });
  it('should have the <MessageGroupList />', () => {
    const wrapper = mount(<MessageBoard/>);
    expect(wrapper.find(MessageGroupList)).toHaveLength(1);
  });
 
  it('Should addChangeListener when component will mount', () => {
    const listenerSpy = spyOn(MessageStore, 'addChangeListener');
    const wrapper = mount(<MessageBoard/>);
    localStorage.setItem('userUid', '15253628egdfdfwrswt2628');
    const fetchGroups = jest.fn();
    fetchGroups();
    expect(wrapper.node.fetchGroups).toBeDefined();
    expect(fetchGroups).toHaveBeenCalled();    
    expect(listenerSpy).toHaveBeenCalled();
  });
  it('Should removeChangeListener when component will unMount', () => {
    const listenerSpy2 = spyOn(MessageStore, 'removeChangeListener');
    const wrapper = mount(<MessageBoard/>);
    wrapper.unmount();
    expect(listenerSpy2).toHaveBeenCalled();
  });
});
