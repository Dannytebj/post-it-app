import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import Login from '../login';

describe('Login Component', () => {
   
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Login/>, div);
    });

    it('should call clickSign function if button click', () => {
        const clickSign = jest.fn();
        const wrapper = shallow(<button onClick = {clickSign} />);
        wrapper.find('button').simulate('click');
        expect(clickSign).toBeCalled();
    });

    it('should call toggleSignInUp function if clicked', () => {
        const toggleSignInUp = jest.fn();
        const wrapper = shallow(<a onClick = {toggleSignInUp} />);
        wrapper.find('a').simulate('click');
        expect(toggleSignInUp).toBeCalled();
    });

    it('allows us to set props', () => {
        const wrapper = mount(<Login username="baz" />);
        expect(wrapper.props().username).toEqual('baz');
        wrapper.setProps({ username: 'foo' });
        expect(wrapper.props().username).toEqual('foo');
    });

});

