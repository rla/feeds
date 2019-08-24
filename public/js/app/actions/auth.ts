import { ThunkDispatch } from './thunk';
import { FeedsState } from '../store';
import { Api } from '../api';
import * as router from '../router';

export const AUTH_SUCCESSFUL = 'AUTH_SUCCESSFUL';
export const AUTH_LOGGED_OUT = 'AUTH_LOGGED_OUT';
export const AUTH_ALLOW_ANONYMOUS_READONLY = 'AUTH_ALLOW_ANONYMOUS_READONLY';

export type AuthSuccessful = {
  type: typeof AUTH_SUCCESSFUL;
};

export type AuthLoggedOut = {
  type: typeof AUTH_LOGGED_OUT;
};

export type AuthAllowAnonymousReadonly = {
  type: typeof AUTH_ALLOW_ANONYMOUS_READONLY;
};

export type AuthAction = AuthSuccessful | AuthLoggedOut | AuthAllowAnonymousReadonly;

export const login = () => {
  return async (dispatch: ThunkDispatch, getState: () => FeedsState, api: Api) => {
    const state = getState();
    const result = await api.login(state.login.user, state.login.pass);
    if (result) {
      await dispatch(authSuccessful());
      router.refresh();
    }
  };
};

export const logout = () => {
  return async (dispatch: ThunkDispatch, getState: () => FeedsState, api: Api) => {
    await api.logout();
    await dispatch(authLoggedOut());
  };
};

export const authSuccessful = () => ({ type: AUTH_SUCCESSFUL });

const authLoggedOut = () => ({ type: AUTH_LOGGED_OUT });

export const authAllowAnonymousReadonly = () => ({ type: AUTH_ALLOW_ANONYMOUS_READONLY });
