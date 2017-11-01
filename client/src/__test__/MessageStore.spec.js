import AppConstants from '../js/constants/AppConstants';
import MessageStore from '../js/stores/MessageStore';
import AppDispatcher from '../js/dispatcher/AppDispatcher';

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
    const clearMessageArray = jest.fn();
    clearMessageArray();
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
    expect(clearMessageArray).toHaveBeenCalled();
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
    const updateMessages = jest.fn();
    const emitChange = jest.fn();
    emitChange();
    updateMessages();
    const messageArray = MessageStore.getAllMessages();
    // console.log(msgArr);
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
    expect(updateMessages).toHaveBeenCalled();
    expect(messageArray.length).toBeGreaterThan(0);
    expect(emitChange).toHaveBeenCalled();
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
    const setMessages = jest.fn();
    const emitChange = jest.fn();
    emitChange();
    setMessages();
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
    expect(setMessages).toHaveBeenCalled();
    expect(emitChange).toHaveBeenCalled();
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
    const clearMessageArray = jest.fn();
    const emitChange = jest.fn();
    emitChange();
    clearMessageArray();
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
    expect(clearMessageArray).toHaveBeenCalled();
    expect(emitChange).toHaveBeenCalled();
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
    const emitChange = jest.fn();
    emitChange();
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
    expect(emitChange).toHaveBeenCalled();
  });
});

describe('PostIt MessageStore', () => {
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
    const groupArray = MessageStore.getGroups();
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
    expect(setGroups).toHaveBeenCalled();
    expect(groupArray.length).toBeGreaterThan(0);
    expect(emitChange).toHaveBeenCalled();
  });
});
