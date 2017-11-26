import React from 'react';
import { mount } from 'enzyme';
import AllUserList from '../js/components/AllUserList';
import GroupStore from 'GroupStore'; // eslint-disable-line
import seedData from './helpers/seeder';


describe('The AllUserList component', () => {
  it('Should mount with the allUserList prop defined ', () => {
    const wrapper = mount(<AllUserList allUserList={ seedData.allUserList } />);
    expect(wrapper.props).toBeDefined();
  });
});
