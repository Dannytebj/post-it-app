import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import SignOut from '../pages/signOut';
import Home from '../pages/home';
import localStorageMock from '../__localStorageMock__/localStorageMock.js';

describe('SignOut Component', () => {
    beforeEach(() =>{
        localStorageMock.setItem('user','Foo');
    });
   
    it('tests the signOut component renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<SignOut/>, div);
    });

    it('should call logOut function if button click', () => {
        const logOut = jest.fn();
        const wrapper = shallow(<a onClick = {logOut} />);
        wrapper.find('a').simulate('click');
        expect(logOut).toBeCalled();
    });

});

describe('Home Component', () => {
   
    it('tests the Home component renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Home />, div);
    });
});