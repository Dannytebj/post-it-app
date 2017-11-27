import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import localStorageMock from './mocks/localstorageMock';
import GroupLayout from '../js/components/GroupLayout';
import GroupList from '../js/components/GroupList';
import Layout from '../js/components/Layout';
import MessageStore from 'MessageStore'; // eslint-disable-line
import seedData from './helpers/seeder';


jest.mock('toastr', () => jest.fn());
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('The GroupLayout Component', () => {
  it('should have the <Layout /> component defined', () => {
    const wrapper = mount(<MemoryRouter><GroupLayout/></MemoryRouter>);
    expect(wrapper.find(Layout)).toHaveLength(1);
  });
  it('should have the <GroupList /> component defined', () => {
    const wrapper = mount(<MemoryRouter><GroupLayout/></MemoryRouter>);
    expect(wrapper.find(GroupList)).toHaveLength(1);
  });
  it('should have GroupList prop defined', () => {
    const wrapper = (<GroupList groupList= {seedData.groupList}/>);
    expect(wrapper.props).toBeDefined();
  });
});
