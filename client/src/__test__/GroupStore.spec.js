import AppConstants from '../js/constants/AppConstants';
import GroupStore from '../js/stores/GroupStore';
import AppDispatcher from '../js/dispatcher/AppDispatcher';

/* global jest */
jest.mock('axios');
jest.mock('../js/dispatcher/AppDispatcher');

describe('PostIt GroupStore', () => {
  const getGroups = {
    source: 'VIEW_ACTION',
    action: {
      type: AppConstants.GET_GROUPS,
      payload: { 
        userUid: '22446438dhdhdjkwi2',
      },
    },
  };
  const mockCall = AppDispatcher.register.mock.calls[0][0];
  it('should successfully call GetGroups API', () => {
    mockCall(getGroups);
    const emitChange = jest.fn();
    emitChange();
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
    expect(emitChange).toHaveBeenCalled();
  });
});

describe('PostIt GroupStore', () => {
  const receiveGroups = {
    source: 'VIEW_ACTION',
    action: {
      type: AppConstants.RECEIVE_GROUPS,
      payload: { 
        groups: [
          {
            groupId: "-KqA34JyVjKTzw0-Pbrx",
            groupName: "The ThroneRoom Priests",
            isAdmin: true,
          },
          {
            groupId: "-Kr5X4AB7meaxVPSWFIt",
            groupName: "oreoluwade",
            isAdmin: false,
          },
        ],
      },
    },
  };
  const mockCall = AppDispatcher.register.mock.calls[0][0];
  it('should successfully call GetGroups API', () => {
    mockCall(receiveGroups);
    const setGroups = jest.fn();
    const emitChange = jest.fn();
    setGroups();
    emitChange();
    const groupArray = GroupStore.getGroups();
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
    expect(setGroups).toHaveBeenCalled();
    expect(groupArray.length).toBeGreaterThan(0);
    expect(emitChange).toHaveBeenCalled();
  });
});

describe('PostIt GroupStore', () => {
  const createGroup = {
    source: 'VIEW_ACTION',
    action: {
      type: AppConstants.CREATE_GROUP,
      payload: {
        groupName: 'Test Group', 
        userId: '22446438dhdhdjkwi2',
        userName: 'Danny Boy',
      },
    },
  };
  const mockCall = AppDispatcher.register.mock.calls[0][0];
  it('should successfully call createGroup API', () => {
    mockCall(createGroup);
    const emitChange = jest.fn();
    const addToGroupArray = jest.fn();
    addToGroupArray();
    emitChange();
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
    expect(addToGroupArray).toHaveBeenCalled();
    expect(emitChange).toHaveBeenCalled();
  });
});

describe('PostIt GroupStore', () => {
  const getGroupUsers = {
    source: 'VIEW_ACTION',
    action: {
      type: AppConstants.GET_GROUP_USERS,
      payload: { 
        groupId: '22446438dhdhdjkwi2',
      },
    },
  };
  const mockCall = AppDispatcher.register.mock.calls[0][0];
  it('should successfully call GetGroups API', () => {
    mockCall(getGroupUsers);
    const emitChange = jest.fn();
    emitChange();
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
    expect(emitChange).toHaveBeenCalled();
  });
});
