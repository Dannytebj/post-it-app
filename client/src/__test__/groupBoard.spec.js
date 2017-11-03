import React from 'react';
import { shallow, mount } from 'enzyme';
import localStorageMock from './mocks/localstorageMock';
import GroupBoard from '../js/components/GroupBoard';
import GroupList from '../js/components/GroupList';
import Layout from '../js/components/Layout';
import GroupStore from 'GroupStore'; // eslint-disable-line

jest.mock('toastr', () => jest.fn());
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('The GroupBoard Component', () => {
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
    const wrapper = mount(<GroupBoard/>);
    expect(wrapper.find(Layout)).toHaveLength(1);
  });
  it('should have the <GroupList />', () => {
    const wrapper = mount(<GroupBoard/>);
    expect(wrapper.find(GroupList)).toHaveLength(1);
  });
  it('should calls the fetchGroups method', () => {
    // const { getGroups } = ViewActions;
    const wrapper = mount(<GroupBoard/>);
    localStorage.setItem('userUid', '15253628egdfdfwrswt2628');
    const fetchGroups = jest.fn();
    fetchGroups();
    // const fetchGroupsSpy = jest.spyOn(ViewActions, 'getGroups');
    // fetchGroupsSpy();
    wrapper.find('.fetchGroups').simulate('click');
    expect(fetchGroups).toHaveBeenCalled();
  });
  it('Should addChangeListener when component will mount', () => {
    const listenerSpy = spyOn(GroupStore, 'addChangeListener');
    const wrapper = mount(<GroupBoard/>);
    expect(wrapper.node.doCreateGroup).toBeDefined();
    expect(wrapper.node.fetchGroups).toBeDefined();
    expect(listenerSpy).toHaveBeenCalled();
  });
  it('Should removeChangeListener when component will unMount', () => {
    const listenerSpy2 = spyOn(GroupStore, 'removeChangeListener');
    const wrapper = mount(<GroupBoard/>);
    wrapper.unmount();
    expect(listenerSpy2).toHaveBeenCalled();
  });
});
