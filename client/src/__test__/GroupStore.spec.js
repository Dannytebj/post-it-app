import AppConstants from '../js/constants/AppConstants';
import GroupStore from '../js/stores/GroupStore';
import AppDispatcher from '../js/dispatcher/AppDispatcher';
import seedData from './helpers/seeder';


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
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });
});

describe('PostIt GroupStore', () => {
  const groups = seedData.groups;
  const receiveGroups = {
    source: 'VIEW_ACTION',
    action: {
      type: AppConstants.RECEIVE_GROUPS,
      payload: { groups },
    },
  };
  const mockCall = AppDispatcher.register.mock.calls[0][0];
  it('should successfully call receiveGroups API', () => {
    mockCall(receiveGroups);
    const groupArray = GroupStore.getGroups();
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
    expect(groupArray.length).toBeGreaterThan(0);
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
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
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
  it('should successfully call getGroupUsers API', () => {
    mockCall(getGroupUsers);
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });
});

describe('PostIt GroupStore', () => {
  const groupUser = seedData.groupUser;
  const receiveGroupUsers = {
    source: 'VIEW_ACTION',
    action: {
      type: AppConstants.RECEIVE_GROUP_USERS,
      payload: { 
        groupUser,
      },
    },
  };
  const mockCall = AppDispatcher.register.mock.calls[0][0];
  it('should successfully call receiveGroupUsers Action', () => {
    mockCall(receiveGroupUsers);
    const groupUsersArray = GroupStore.getUsers();
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
    expect(groupUsersArray.length).toBeGreaterThan(0);
  });
});
describe('PostIt GroupStore', () => {
  const getAllUsers = {
    source: 'VIEW_ACTION',
    action: {
      type: AppConstants.GET_ALL_USERS,
      payload: { 
        groupId: '-KqA34JyVjKTzw0-Pbry',
      },
    },
  };
  const mockCall = AppDispatcher.register.mock.calls[0][0];
  it('should successfully call getAllUsers API', () => {
    mockCall(getAllUsers);
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });
});

describe('PostIt GroupStore', () => {
  const allUsers = seedData.allUsers;
  const receiveAllUsers = {
    source: 'VIEW_ACTION',
    action: {
      type: AppConstants.RECEIVE_ALL_USERS,
      payload: { allUsers },
    },
  };
  const mockCall = AppDispatcher.register.mock.calls[0][0];
  it('should successfully receive/set all Users array', () => {
    mockCall(receiveAllUsers);
    const allUserArray = GroupStore.getAllUsers();
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
    expect(allUserArray.length).toBeGreaterThan(0);
  });
});

describe('PostIt GroupStore', () => {
  const addUser = {
    source: 'VIEW_ACTION',
    action: {
      type: AppConstants.ADD_USER,
      payload: {
        groupId: "-KqA34JyVjKTzw0-Pbrx",        
        groupName: 'Test Group', 
        name: 'Danny Boy',
        id: '22446438dhdhdjkwi2',
      },
    },
  };
  const mockCall = AppDispatcher.register.mock.calls[0][0];
  it('should successfully call addUser API', () => {
    mockCall(addUser);
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });
});

describe('PostIt GroupStore', () => {
  const addUserResponse = {
    source: 'VIEW_ACTION',
    action: {
      type: AppConstants.ADD_USER_RESPONSE,
    },
  };
  const mockCall = AppDispatcher.register.mock.calls[0][0];
  it('should successfully call addUser API', () => {
    mockCall(addUserResponse);
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });
});

