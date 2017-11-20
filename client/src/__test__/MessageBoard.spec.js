import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import localStorageMock from './mocks/localstorageMock';
import MessageBoard from '../js/components/MessageBoard';
import MessageGroupList from '../js/components/MessageGroupList';
import Layout from '../js/components/Layout';
import MessageStore from 'MessageStore'; // eslint-disable-line
import seedData from './helpers/seeder';


jest.mock('toastr', () => jest.fn());
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('The MessageBoard Component', () => {
  it('should have the <Layout /> component defined', () => {
    const wrapper = mount(<MemoryRouter><MessageBoard/></MemoryRouter>);
    expect(wrapper.find(Layout)).toHaveLength(1);
  });
  it('should have the <MessageGroupList /> component defined', () => {
    const wrapper = mount(<MemoryRouter><MessageBoard/></MemoryRouter>);
    expect(wrapper.find(MessageGroupList)).toHaveLength(1);
  });
  it('should have MessageGroupList defined with groupList prop', () => {
    const wrapper = (<MessageGroupList groupList= {seedData.groupList}/>);
    expect(wrapper.props).toBeDefined();
  });
});
