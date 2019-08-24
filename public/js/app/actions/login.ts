import { login } from './auth';
import { ThunkDispatch } from './thunk';

export const LOGIN_SET_USERNAME = 'LOGIN_SET_USERNAME';
export const LOGIN_SET_PASSWORD = 'LOGIN_SET_PASSWORD';

export type LoginSetUsername = {
  type: typeof LOGIN_SET_USERNAME;
  user: string;
};

export type LoginSetPassword = {
  type: typeof LOGIN_SET_PASSWORD;
  pass: string;
};

export type LoginAction = LoginSetUsername | LoginSetPassword;

export const submit = () => {
  return async (dispatch: ThunkDispatch) => {
    await dispatch(login());
  };
};

export const setUser = (user: string) => ({ type: LOGIN_SET_USERNAME, user });

export const setPass = (pass: string) => ({ type: LOGIN_SET_PASSWORD, pass });
