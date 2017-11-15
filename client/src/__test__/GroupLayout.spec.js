import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import localStorageMock from './mocks/localstorageMock';
import GroupLayout from '../js/components/GroupLayout';
import GroupList from '../js/components/GroupList';
import Layout from '../js/components/Layout';
import MessageStore from 'MessageStore'; // eslint-disable-line

jest.mock('toastr', () => jest.fn());
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('The GroupLayout Component', () => {
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
    const wrapper = mount(<MemoryRouter><GroupLayout/></MemoryRouter>);
    expect(wrapper.find(Layout)).toHaveLength(1);
  });
  it('should have the <GroupList />', () => {
    const wrapper = mount(<MemoryRouter><GroupLayout/></MemoryRouter>);
    expect(wrapper.find(GroupList)).toHaveLength(1);
  });
  it('should have GroupList props', () => {
    const wrapper = (<GroupList groupList= {groupList}/>);
    expect(wrapper.props).toBeDefined();
  });
});
