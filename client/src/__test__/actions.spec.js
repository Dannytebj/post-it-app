import AppActions from '../js/actions/AppActions';
import AppConstants from '../js/constants/AppConstants';
import AppDispatcher from '../js/dispatcher/AppDispatcher';

/* global jest */

jest.mock('axios');
jest.mock('../js/dispatcher/AppDispatcher');

describe('PostIt Actions', () => {
  let dispatcher;
  let email;
  let username;
  let phoneNumber;
  let password;
  beforeEach(() => {
    dispatcher = jest.spyOn(AppDispatcher, 'dispatch');
  });
  afterEach(() => {
    dispatcher.mockReset();
  });
  it('should dispatch a view action that sign In users', () => {
    email = 'danny@myself.com';
    password = 'asd123';
    AppActions.signIn(email, password);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      type: AppConstants.CLICK_SIGN_IN,
      payload: { email, password },
    });
  });
  it('should dispatch a view action that sign Up users', () => {
    email = 'danny@myself.com';
    password = 'asd123';
    phoneNumber = '09876543211';
    username = 'Jimmy Jatt';
    AppActions.signUp(email, password, username, phoneNumber);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      type: AppConstants.CLICK_SIGN_UP,
      payload: { email, password, username, phoneNumber },
    });
  });
  it('should dispatch a view action that sign Out users', () => {
    AppActions.signOut();
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      type: AppConstants.CLICK_SIGN_OUT,
    });
  });
  it('should dispatch a view action that signIn users With Google', () => {
    const idToken = '343526282927345#$$$#dgskaidb';
    AppActions.signInWithGoogle(idToken);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      type: AppConstants.SIGN_IN_GOOGLE,
      payload: { idToken },
    });
  });

  it('should dispatch a view action that sends Password Reset', () => {
    email = 'danny@myself.com';
    AppActions.sendPasswordReset(email);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      type: AppConstants.RESET_PASSWORD,
      payload: { email },
    });
  });
  it('should dispatch a view action that gets Groups', () => {
    const userUid = '343526282927345#$$$#dgskaidb';
    AppActions.getGroups(userUid);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      type: AppConstants.GET_GROUPS,
      payload: { userUid },
    });
  });
  it('should dispatch a view action that creates a Group', () => {
    const userUid = '343526282927345#$$$#dgskaidb';
    const groupName = 'Test';
    const userName = 'Falz';
    AppActions.createGroup(groupName, userUid, userName);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      type: AppConstants.CREATE_GROUP,
      payload: { groupName, userUid, userName },
    });
  });
  it('should dispatch a view action that receive Groups', () => {
    const groups = {};
    AppActions.receiveGroups(groups);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      type: AppConstants.RECEIVE_GROUPS,
      payload: { groups },
    });
  });
  it('should dispatch a view action that get Group Users', () => {
    const groupId = '343526282927345#$$$#dgskaidb';
    AppActions.getGroupUsers(groupId);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      type: AppConstants.GET_GROUP_USERS,
      payload: { groupId },
    });
  });
  it('should dispatch a view action that receive Group Users', () => {
    const groupUser = {};
    AppActions.receiveGroupUsers(groupUser);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      type: AppConstants.RECEIVE_GROUP_USERS,
      payload: { groupUser },
    });
  });
  it('should dispatch a view action that getAllUsers', () => {
    const groupId = '343526282927345#$$$#dgskaidb';
    AppActions.getAllUsers(groupId);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      type: AppConstants.GET_ALL_USERS,
      payload: { groupId },
    });
  });
  it('should dispatch a view action that receiveAllUsers', () => {
    const allUsers = {};
    AppActions.receiveAllUsers(allUsers);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      type: AppConstants.RECEIVE_ALL_USERS,
      payload: { allUsers },
    });
  });
  it('should dispatch a view action that adds User to group', () => {
    const id = '343526282927345#$$$#dgskaidb';
    const groupId = '12swd4we2343sjii8';
    const groupName = 'Test';
    const name = 'Falz';
    AppActions.addUser(groupId, groupName, name, id);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      type: AppConstants.ADD_USER,
      payload: { groupId, groupName, name, id },
    });
  });
  it('should dispatch a view action that returns response from add user', 
    () => {
      AppActions.addUserResponse();
      expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
        type: AppConstants.ADD_USER_RESPONSE,
      });
    });
  it('should dispatch a view action that posts Message', () => {
    const id = '343526282927345#$$$#dgskaidb';
    const groupId = '12swd4we2343sjii8';
    const priority = 'Urgent';
    const message = 'Test Message';
    const name = 'Falz';
    AppActions.postMessage(groupId, message, priority, id, name);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      type: AppConstants.POST_MESSAGE,
      payload: { groupId, message, priority, id, name },
    });
  });
  it('should dispatch a view action that gets Messages', () => {
    const groupId = '12swd4we2343sjii8';
    AppActions.getMessages(groupId);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      type: AppConstants.GET_ALL_MESSAGES,
      payload: { groupId },
    });
  });
  it('should dispatch a view action that updates Message Store', () => {
    const id = '343526282927345#$$$#dgskaidb';
    const message = 'Test Message';
    const name = 'Falz';
    AppActions.updateMessageStore(id, message, name);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      type: AppConstants.UPDATE_MESSAGE_STORE,
      payload: { id, message, name },
    });
  });
  it('should dispatch a view action that receives All Messages', () => {
    const messages = {};
    AppActions.receiveAllMessages(messages);
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      type: AppConstants.RECEIVE_ALL_MESSAGES,
      payload: { messages },
    });
  });
  it('should dispatch a view action that reset Message Store', () => {
    AppActions.resetMessageStore();
    expect(AppDispatcher.handleViewAction).toHaveBeenCalledWith({
      type: AppConstants.RESET_STORE,
    });
  });
});
