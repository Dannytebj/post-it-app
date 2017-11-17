import React from 'react';
import { shallow, mount } from 'enzyme';
import AddUser from '../js/components/AddUser';
import AllUserList from '../js/components/AllUserList';
import GroupStore from 'GroupStore'; // eslint-disable-line


describe('The AddUser Component', () => {
  it('should mount properly with this prop', () => {
    const wrapper = mount(<AddUser/>);
    expect(wrapper.find(AllUserList)).toHaveLength(1);
  });
  it('Should addChangeListener when component will Mount', () => {
    const listenerSpy = spyOn(GroupStore, 'addChangeListener');
    const wrapper = mount(<AddUser/>);
    expect(listenerSpy).toHaveBeenCalled();
  });
  it('Should removeChangeListener when component will unMount', () => {
    const listenerSpy = spyOn(GroupStore, 'removeChangeListener');
    const wrapper = mount(<AddUser/>);
    wrapper.unmount();
    expect(listenerSpy).toHaveBeenCalled();
  });
});
