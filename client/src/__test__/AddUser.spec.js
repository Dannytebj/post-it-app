import React from 'react';
import { shallow, mount } from 'enzyme';
import AddUser from '../js/components/AddUser';
import AllUserList from '../js/components/AllUserList';
import GroupStore from 'GroupStore'; // eslint-disable-line


describe('The AddUser Component', () => {
  let allUserList;
  beforeEach(() => {
    allUserList = [
      {
        email: "mozezmic@yahoo.com",
        id: "GkGPwsW5m3VbjcV2zikUGzPA2rk1",
        name: "Mozes Michael",
        phoneNumber: "2348051147502",
      },
      {
        email: "NewGuy@gmail.com",
        id: "HNp9wzEWXAYPdmytTr1enTk1gRg2",
        name: "New Guy",
        phoneNumber: "2348051123456",
      },
      {
        email: "danielatebije12@gmail.com",
        id: "M0kPPleIXkY3rV36VajygmqVaNt1",
        name: "Mercy Audu",
        phoneNumber: "2348051147502",
      },
    ];
  }); 
  it('should mount properly with this prop', () => {
    const wrapper = mount(<AddUser/>);
    expect(wrapper.find(AllUserList)).toHaveLength(1);
  });
  it('Should addChangeListener when component will Mount', () => {
    const listenerSpy = spyOn(GroupStore, 'addChangeListener');
    const wrapper = mount(<AddUser/>);
    expect(listenerSpy).toHaveBeenCalled();
  });
  it('Should removeChangeListener when component will unMount', () => {
    const listenerSpy = spyOn(GroupStore, 'removeChangeListener');
    const wrapper = mount(<AddUser/>);
    wrapper.unmount();
    expect(listenerSpy).toHaveBeenCalled();
  });
});
