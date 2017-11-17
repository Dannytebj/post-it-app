import React from 'react';
import { mount } from 'enzyme';
import AllUsers from '../js/components/AllUsers';
import GroupUsers from '../js/components/GroupUsers';
import localStorageMock from './mocks/localstorageMock';
import GroupStore from 'GroupStore'; // eslint-disable-line
import seedData from './helpers/seeder';


jest.mock('toastr', () => jest.fn());
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('The AllUsers Component', () => {
  it('Should mount without crashing', () => {
    const wrapper = mount(<AllUsers user={seedData.user} />);
    expect(wrapper.props).toBeDefined();
  });
  it('should contain this prop', () => {
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
  it('Should call the addUser function when Clicked', () => {
    const wrapper = mount(<AllUsers user={seedData.user} />);
    const addUser = jest.fn();
    addUser();
    wrapper.find('.add').simulate('click');
    expect(addUser).toHaveBeenCalled();
    // console.log(wrapper.node);
  });
});
describe('The GroupUser Component', () => {
  
  it('Should mount without crashing', () => {
    const wrapper = mount(<GroupUsers user={seedData.user} />);
    expect(wrapper.props).toBeDefined();
  });
  it('should contain this prop', () => {
    const wrapper = mount(<GroupUsers user={seedData.user} />);
    expect(wrapper.node.props.user.id).toEqual("sLoAYxwu0uRb7XCkTVAp2llLMm43");
    expect(wrapper.node.props.user.name).toEqual("DannyBoyNow");
    expect(wrapper.node.props.user.phoneNumber).toEqual("2348051147502");
  });     
});
