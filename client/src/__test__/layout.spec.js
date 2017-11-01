import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import localStorageMock from './mocks/localstorageMock';
import MyNavigator from '../js/components/Navigation';
import Layout from '../js/components/Layout';


Object.defineProperty(window, 'localStorage', { value: localStorageMock });


describe('Navigator Component', () => {
  const wrapper = mount(<Layout/>);
  it('should have <Button />', () => {
    expect(wrapper.find(MyNavigator)).toHaveLength(1);
  });
});
