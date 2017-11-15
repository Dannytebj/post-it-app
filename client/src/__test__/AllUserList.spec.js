import React from 'react';
import { shallow, mount } from 'enzyme';
import AllUserList from '../js/components/AllUserList';
import AllUsers from '../js/components/AllUsers';
import GroupStore from 'GroupStore'; // eslint-disable-line

describe('The AllUserList component', () => {
  let allUserList;
  beforeEach(() => {
    allUserList = [
      {
        email: "mozezmic@yahoo.com",
        id: "GkGPwsW5m3VbjcV2zikUGzPA2rk1",
        name: "Mozes Michael",
        phoneNumber: "2348051147502",
      },
    ];
  }); 
  it('Should mount without crashing', () => {
    const wrapper = mount(<AllUserList allUserList={ allUserList } />);
    expect(wrapper.props).toBeDefined();
  });
});
