import { AUTH_SUCCESSFUL, AUTH_LOGGED_OUT } from '../actions/auth';
import reducer, { AuthState } from './auth';

const mockState: AuthState = {
  authenticated: false,
  allowAnonymousReadonly: false,
};

it('handles the auth successful action', () => {
  const state = reducer(mockState, {
    type: AUTH_SUCCESSFUL,
  });
  expect(state.authenticated).toBe(true);
});

it('handles the log out action', () => {
  const state = reducer(mockState, {
    type: AUTH_LOGGED_OUT,
  });
  expect(state.authenticated).toBe(false);
});
