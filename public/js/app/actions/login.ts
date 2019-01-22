import { ChangeEvent, FormEvent } from 'react';
import { login } from './auth';
import { ThunkDispatch } from './thunk';

export const LOGIN_SET_USERNAME = 'LOGIN_SET_USERNAME';
export const LOGIN_SET_PASSWORD = 'LOGIN_SET_PASSWORD';

export type LoginSetUsername = {
    type: typeof LOGIN_SET_USERNAME,
    user: string
};

export type LoginSetPassword = {
    type: typeof LOGIN_SET_PASSWORD,
    pass: string
};

export type LoginAction = LoginSetUsername | LoginSetPassword;

export const submit = (e: FormEvent) => {
    e.preventDefault();
    return (dispatch: ThunkDispatch) => {
        dispatch(login());
    };
};

export const setUser = (e: ChangeEvent<HTMLInputElement>) =>
    ({ type: LOGIN_SET_USERNAME, user: e.target.value });

export const setPass = (e: ChangeEvent<HTMLInputElement>) =>
    ({ type: LOGIN_SET_PASSWORD, pass: e.target.value });
