import { ThunkDispatch } from './thunk';
import { FeedsState } from '../store';
import * as api from '../api';

export const AUTH_SUCCESSFUL = 'AUTH_SUCCESSFUL';
export const AUTH_LOGGED_OUT = 'AUTH_LOGGED_OUT';

export type AuthSuccessful = {
    type: typeof AUTH_SUCCESSFUL
};

export type AuthLoggedOut = {
    type: typeof AUTH_LOGGED_OUT
};

export type AuthAction = AuthSuccessful | AuthLoggedOut;

export const login = () => {
    return async (dispatch: ThunkDispatch, getState: () => FeedsState) => {
        const state = getState();
        const result = await api.login(state.login.user, state.login.pass);
        if (result) {
            dispatch(authSuccessful());
        }
    };
};

export const logout = () => {
    return async (dispatch: ThunkDispatch) => {
        await api.logout();
        dispatch(authLoggedOut());
    };
};

export const authSuccessful = () => ({ type: AUTH_SUCCESSFUL });

const authLoggedOut = () => ({ type: AUTH_LOGGED_OUT });
