import React from 'react';
import { shallow } from 'enzyme';
import localStorageMock from './mocks/localstorageMock';
import Layout from '../js/components/Layout';
import Home from '../js/components/Home';

jest.mock('toastr', () => jest.fn());
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('The Home Component', () => {
  it('should Mount and Have the Layout Component defined', () => {
    const wrapper = shallow(<Home/>);
    expect(wrapper.find(Layout)).toHaveLength(1);
  });
});
