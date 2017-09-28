import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import Group from '../pages/groups/';

describe('Groups Component', () => {
   
    it('tests the Group component renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Group />, div);
    });

    it('should call createGroup function if button click', () => {
        const createGroup = jest.fn();
        const wrapper = shallow(<button onClick = {createGroup} />);
        wrapper.find('button').simulate('click');
        expect(createGroup).toBeCalled();
    });

    it('allows us to set props', () => {
        const wrapper = mount(<Group newGroupName="baz" />);
        expect(wrapper.props().newGroupName).toEqual('baz');
        wrapper.setProps({newGroupName: 'foo' });
        expect(wrapper.props().newGroupName).toEqual('foo');
    });

});

// describe('GroupList Component', () => {



// })