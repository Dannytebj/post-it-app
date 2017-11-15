// import AppActions from '../js/actions/AppActions';
import AppConstants from '../js/constants/AppConstants';
import UserStore from '../js/stores/UserStore';
import AppDispatcher from '../js/dispatcher/AppDispatcher';

/* global jest */
jest.mock('axios');
jest.mock('../js/dispatcher/AppDispatcher');

describe('PostIt UserStore', () => {
  const signIn = {
    source: 'VIEW_ACTION',
    action: {
      type: AppConstants.CLICK_SIGN_IN,
      payload: { email: 'dannytebj@gmail.com', password: 'asd123' },
    },
  };
  const mockCall = AppDispatcher.register.mock.calls[0][0];
  it('should successfully call the signIn API', () => {
    mockCall(signIn);
    const emitChange = jest.fn();
    emitChange();
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
    expect(emitChange).toHaveBeenCalled();
  });
});

describe('PostIt UserStore', () => {
  const signUp = {
    source: 'VIEW_ACTION',
    action: {
      type: AppConstants.CLICK_SIGN_UP,
      payload: {
        username: 'New User',
        email: 'dannytebj@gmail.com',
        password: 'asd123',
        phoneNumber: '09876543212',
      },
    },
  };
  const mockCall = AppDispatcher.register.mock.calls[0][0];
  it('should successfully call the signUp API', () => {
    mockCall(signUp);
    const emitChange = jest.fn();
    emitChange();
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
    expect(emitChange).toHaveBeenCalled();
  });
});

describe('PostIt UserStore', () => {
  const signOut = {
    source: 'VIEW_ACTION',
    action: {
      type: AppConstants.CLICK_SIGN_OUT,
    },
  };
  const mockCall = AppDispatcher.register.mock.calls[0][0];
  it('should successfully call the signOut API', () => {
    mockCall(signOut);
    const emitChange = jest.fn();
    emitChange();
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
    expect(emitChange).toHaveBeenCalled();
  });
});

describe('PostIt UserStore', () => {
  const signInWithGoogle = {
    source: 'VIEW_ACTION',
    action: {
      type: AppConstants.SIGN_IN_GOOGLE,
      payload: { idToken: 'vblaygvygcb<JHVu236tr8thbcljhBG73' },
    },
  };
  const mockCall = AppDispatcher.register.mock.calls[0][0];
  it('should successfully call the signInWithGoogle API', () => {
    mockCall(signInWithGoogle);
    const emitChange = jest.fn();
    emitChange();
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
    expect(emitChange).toHaveBeenCalled();
  });
});

describe('PostIt UserStore', () => {
  const sendPasswordReset = {
    source: 'VIEW_ACTION',
    action: {
      type: AppConstants.RESET_PASSWORD,
      payload: { email: 'dannyboy@gmail.com' },
    },
  };
  const mockCall = AppDispatcher.register.mock.calls[0][0];
  it('should successfully call the sendPasswordReset API', () => {
    mockCall(sendPasswordReset);
    const emitChange = jest.fn();
    emitChange();
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
    expect(emitChange).toHaveBeenCalled();
  });
});
