import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import localStorageMock from './mocks/localstorageMock';
import  CreateGroup  from '../js/components/CreateGroup';
import Layout from '../js/components/Layout';
import TextBox from '../js/utils/textbox';
import GroupStore from 'GroupStore'; // eslint-disable-line

jest.mock('toastr', () => jest.fn());
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('The CreateGroup Component', () => {
  let wrapper;
  beforeEach(() => {
    localStorage.setItem('userUid', 'chbkh-yl19');
    localStorage.setItem('userName', 'Havana');
    wrapper = mount(<MemoryRouter><CreateGroup/></MemoryRouter>);
  });
  it('should have the <Layout /> component defined', () => {
    expect(wrapper.find(Layout)).toHaveLength(1);
  });

  it('should have a textbox component working properly', () => {
    const component = shallow(
      <CreateGroup />,
    );
    const event = {
      preventDefault: jest.fn(),
    };
    component.find('.groupName').simulate('change',
      { target: { value: 'Test Group' } });
    component.find('form').simulate('submit', event);
    expect(wrapper.find(TextBox)).toHaveLength(1);
  });

  it('Should call removeChangeListener when component unmounts', () => {
    const listenerSpy2 = spyOn(GroupStore, 'removeChangeListener');
    wrapper.unmount();
    expect(listenerSpy2).toHaveBeenCalled();
  });
});
