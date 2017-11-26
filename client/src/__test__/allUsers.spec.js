import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import AllUsers from '../js/components/AllUsers';
import GroupUsers from '../js/components/GroupUsers';
import localStorageMock from './mocks/localstorageMock';
import GroupStore from 'GroupStore'; // eslint-disable-line
import seedData from './helpers/seeder';


jest.mock('toastr', () => jest.fn());
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('The AllUsers Component', () => {
  it('Should have a user prop defined', () => {
    const wrapper = mount(<AllUsers user={seedData.user} />);
    expect(wrapper.props).toBeDefined();
  });
  it('should have user prop defined with these attributes', () => {
    const wrapper = mount(<AllUsers user={seedData.user} />);
    expect(wrapper.node.props.user.id).toEqual("sLoAYxwu0uRb7XCkTVAp2llLMm43");
    expect(wrapper.node.props.user.name).toEqual("DannyBoyNow");
    expect(wrapper.node.props.user.phoneNumber).toEqual("2348051147502");
  });
  it('Should addChangeListener when component will mount', () => {
    const listenerSpy = spyOn(GroupStore, 'addChangeListener');
    const wrapper = mount(<AllUsers user={seedData.user} />);
    expect(wrapper.node.addUser).toBeDefined();
    expect(wrapper.node.createAddButton).toBeDefined();
    expect(listenerSpy).toHaveBeenCalled();
  });
  it('Should removeChangeListener when component will unMount', () => {
    const listenerSpy2 = spyOn(GroupStore, 'removeChangeListener');
    const wrapper = mount(<AllUsers user={seedData.user} />);
    wrapper.unmount();
    expect(listenerSpy2).toHaveBeenCalled();
  });
  it('Should call the addUser method when Clicked', () => {
    const addUserSpy = jest.spyOn(AllUsers.prototype, 'addUser');
    const wrapper = mount(<AllUsers user={seedData.user} />);
    wrapper.find('.add').simulate('click');
    expect(addUserSpy).toHaveBeenCalled();
  });
});
describe('The GroupUser Component', () => {
  it('Should have a user prop defined', () => {
    const wrapper = mount(<GroupUsers user={seedData.user} />);
    expect(wrapper.props).toBeDefined();
  });
  it('should have user prop defined with these attributes', () => {
    const wrapper = mount(<GroupUsers user={seedData.user} />);
    expect(wrapper.node.props.user.id).toEqual("sLoAYxwu0uRb7XCkTVAp2llLMm43");
    expect(wrapper.node.props.user.name).toEqual("DannyBoyNow");
    expect(wrapper.node.props.user.phoneNumber).toEqual("2348051147502");
  });     
});
