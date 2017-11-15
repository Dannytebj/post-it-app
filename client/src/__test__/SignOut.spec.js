import React from 'react';
import { mount, shallow } from 'enzyme';
import localStorageMock from './mocks/localstorageMock';
import SignOut from '../js/components/SignOut';
import Layout from '../js/components/Layout';
import UserStore from 'UserStore'; // eslint-disable-line

jest.mock('toastr', () => jest.fn());
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('The SignOut Component', () => {
  it('should have the <Layout />', () => {
    const wrapper = shallow(<SignOut/>);
    expect(wrapper.find(Layout)).toHaveLength(1);
  });
});
