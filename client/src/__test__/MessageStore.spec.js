import AppConstants from '../js/constants/AppConstants';
import MessageStore from '../js/stores/MessageStore';
import AppDispatcher from '../js/dispatcher/AppDispatcher';
import seedData from './helpers/seeder';


/* global jest */
jest.mock('axios');
jest.mock('../js/dispatcher/AppDispatcher');

describe('PostIt MessageStore', () => {
  const postMessage = {
    source: 'VIEW_ACTION',
    action: {
      type: AppConstants.POST_MESSAGE,
      payload: { 
        id: '22446438dhdhdjkwi2',
        message: 'Test Message',
        name: 'Danny B',
      },
    },
  };
  const mockCall = AppDispatcher.register.mock.calls[0][0];
  it('should successfully call post message on POST_MESSAGE', () => {
    mockCall(postMessage);
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });
});

describe('PostIt MessageStore', () => {
  const getMessages = {
    source: 'VIEW_ACTION',
    action: {
      type: AppConstants.GET_ALL_MESSAGES,
      payload: { 
        groupId: '22446438dhdhdjkwi2',
      },
    },
  };
  const mockCall = AppDispatcher.register.mock.calls[0][0];
  it('should successfully call GetMessages API', () => {
    mockCall(getMessages);
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });
});

describe('PostIt MessageStore', () => {
  const updateMessageStore = {
    source: 'VIEW_ACTION',
    action: {
      type: AppConstants.UPDATE_MESSAGE_STORE,
      payload: { 
        id: '22446438dhdhdjkwi2',
        message: 'Test Message',
        name: 'Danny B',
      },
    },
  };
  const mockCall = AppDispatcher.register.mock.calls[0][0];
  it('should successfully call updateMessages when messages are posted', () => {
    mockCall(updateMessageStore);
    const messageArray = MessageStore.getAllMessages();
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
    expect(messageArray.length).toBeGreaterThan(0);
  });
});

describe('PostIt MessageStore', () => {
  const receiveAllMessages = {
    source: 'VIEW_ACTION',
    action: {
      type: AppConstants.RECEIVE_ALL_MESSAGES,
      payload: { 
        id: '22446438dhdhdjkwi2',
        message: 'Test Message',
        name: 'Danny B',
      },
    },
  };
  const mockCall = AppDispatcher.register.mock.calls[0][0];
  it('should call setMessages when messages are gotten from API', () => {
    mockCall(receiveAllMessages);
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });
});

describe('PostIt MessageStore', () => {
  const resetMessageStore = {
    source: 'VIEW_ACTION',
    action: {
      type: AppConstants.RESET_STORE,
    },
  };
  const mockCall = AppDispatcher.register.mock.calls[0][0];
  it('should clear Message array', () => {
    mockCall(resetMessageStore);
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });
});

describe('PostIt MessageStore', () => {
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

describe('PostIt MessageStore', () => {
  const groups = seedData.groups;
  const receiveGroups = {
    source: 'VIEW_ACTION',
    action: {
      type: AppConstants.RECEIVE_GROUPS,
      payload: { groups },
    },
  };
  const mockCall = AppDispatcher.register.mock.calls[0][0];
  it('should successfully call GetGroups API', () => {
    mockCall(receiveGroups);
    const groupArray = MessageStore.getGroups();
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
    expect(groupArray.length).toBeGreaterThan(0);
  });
});
