import React from 'react';
import Img from 'react-image';
import { shallow, mount } from 'enzyme';
import localStorageMock from './mocks/localstorageMock';
import MyNavigator from '../js/components/Navigation';
import NotFound from '../js/components/NotFound';


Object.defineProperty(window, 'localStorage', { value: localStorageMock });


describe('Navigator Component', () => {
  const wrapper = mount(<NotFound/>);
  it('should have <Img />', () => {
    expect(wrapper.find(Img)).toHaveLength(1);
  });
});
