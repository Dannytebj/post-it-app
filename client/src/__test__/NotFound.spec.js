import React from 'react';
import Img from 'react-image';
import { shallow } from 'enzyme';
import localStorageMock from './mocks/localstorageMock';
import NotFound from '../js/components/NotFound';


Object.defineProperty(window, 'localStorage', { value: localStorageMock });


describe('Navigator Component', () => {
  const wrapper = shallow(<NotFound/>);
  it('should have <Img />', () => {
    expect(wrapper.find(Img)).toHaveLength(1);
  });
});
