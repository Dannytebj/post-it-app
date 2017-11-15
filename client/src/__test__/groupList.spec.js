import React from 'react';
import { shallow, mount } from 'enzyme';
import localStorageMock from './mocks/localstorageMock';
import GroupList from '../js/components/GroupList';
import Groups from '../js/components/Groups';

jest.mock('toastr', () => jest.fn());
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('The GroupList Component', () => {
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
  it('should contain <Group/>', () => {
    const wrapper = shallow(<GroupList groupList={groupList} />);
    expect(wrapper.find(Groups)).toHaveLength(2);
  });
});
