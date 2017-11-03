import React from 'react';
import { shallow, mount } from 'enzyme';
import AddUser from '../js/components/AddUser';
import UserList from '../js/components/UserList';
import localStorageMock from './mocks/localstorageMock';
import Group from '../js/components/Group';
import GroupStore from 'GroupStore'; // eslint-disable-line
// import userList from './helpers/userList.json';

jest.mock('toastr', () => jest.fn());
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('The Group Component', () => {
  let group;
  let userList;
  beforeEach(() => {
    group =   {
      groupId: "-KqA34JyVjKTzw0-Pbrx",
      groupName: "The ThroneRoom Priests",
      isAdmin: true,
    };
    userList = [
      {
        email: "NewGuy@gmail.com",
        id: "HNp9wzEWXAYPdmytTr1enTk1gRg2",
        name: "New Guy",
        phoneNumber: "2348051123456",
      },
    ];
  });
  it('Should call addChangeListener', () => {
    const listenerSpy = spyOn(GroupStore, 'addChangeListener');
    const wrapper = mount(<Group group = {group}  />);
    // console.log(wrapper);
    expect(wrapper.find('.groupName').contains(group.groupName));
    expect(wrapper.node.showGroupUsers).toBeDefined();
    expect(listenerSpy).toHaveBeenCalled();
  });
  it('Should call the removeChangeListener', () => {
    const listenerSpy2 = spyOn(GroupStore, 'removeChangeListener');
    const wrapper = mount(<Group group = {group}  />);
    wrapper.unmount();
    expect(listenerSpy2).toHaveBeenCalled();
  });
  it('should have the UserList Component', () => {
    // const showGroupUsers = jest.fn();
    const wrapper = mount(<Group group = {group}  />);
    wrapper.find('.groupList').simulate('click');
    expect(<UserList userList ={userList} />).toBeDefined();
  });
  it('Should have the AddUser', () => {
    const wrapper = mount(<Group group = {group}  />);
    wrapper.find('.groupList').simulate('click');
    expect(AddUser).toHaveLength(1);
  });
});
