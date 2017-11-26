import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import localStorageMock from './mocks/localstorageMock';
import MyNavigator from '../js/components/Navigation';
import Layout from '../js/components/Layout';


Object.defineProperty(window, 'localStorage', { value: localStorageMock });


describe('Layout Component', () => {
  let user;
  let wrapper;
  beforeEach(() => {
    user = 'Danny matt';
    localStorage.setItem('user', user);
    wrapper = shallow(<Layout/>);
  });
  
  it('should have <MyNavigator /> component', () => {
    expect(wrapper.find(MyNavigator)).toHaveLength(1);
  }); 
});
