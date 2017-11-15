import React from 'react';
import { MemoryRouter } from 'react-router-dom';
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
    const wrapper = mount(<MemoryRouter><MessageBoard/></MemoryRouter>);
    expect(wrapper.find(Layout)).toHaveLength(1);
  });
  it('should have the <MessageGroupList />', () => {
    const wrapper = mount(<MemoryRouter><MessageBoard/></MemoryRouter>);
    expect(wrapper.find(MessageGroupList)).toHaveLength(1);
  });
  it('should have MessageGroupList', () => {
    const wrapper = (<MessageGroupList groupList= {groupList}/>);
    expect(wrapper.props).toBeDefined();
  });
});
