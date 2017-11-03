import React from 'react';
import {  Route } from 'react-router';
import { shallow, mount } from 'enzyme';
import Routes from '../js/components/Routes';
import Login from '../js/components/Login';
import NotFound from '../js/components/NotFound';
import Home from '../js/components/Home';
import Groups from '../js/components/GroupBoard';
import MessageBoard from '../js/components/MessageBoard';
import SignOut from '../js/components/SignOut';
import localStorageMock from './mocks/localstorageMock';

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('The Routes Component', () => {
  it('Should render the correct routes', () => {
    const wrapper = shallow(<Routes/>);
    const pathMaps = wrapper.find(Route).reduce((pathMaps, route) => {
      const routeProps = route.props();
      pathMaps[routeProps.path] = routeProps.component; //eslint-disable-line
      return pathMaps;
    }, {});
    expect(pathMaps.home).toBe(Home);
    expect(pathMaps.group).toBe(Groups);
    expect(pathMaps.signOut).toBe(SignOut);
    expect(pathMaps['/']).toBe(Login);
    expect(pathMaps['/*']).toBe(NotFound);
    expect(pathMaps.message).toBe(MessageBoard);
  });
});

