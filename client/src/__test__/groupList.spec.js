import React from 'react';
import { shallow } from 'enzyme';
import localStorageMock from './mocks/localstorageMock';
import GroupList from '../js/components/GroupList';
import Groups from '../js/components/Groups';
import seedData from './helpers/seeder';


jest.mock('toastr', () => jest.fn());
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('The GroupList Component', () => {
  it('should contain <Group/>', () => {
    const wrapper = shallow(<GroupList groupList={seedData.groupList} />);
    expect(wrapper.find(Groups)).toHaveLength(2);
  });
});
