import {
    LOGIN_SET_USERNAME,
    LOGIN_SET_PASSWORD
} from '../actions/login';
import reducer, { LoginState } from './login';

const mockState: LoginState = {
    user: 'test',
    pass: 'test'
};

it('handles the set user action', () => {
    const state = reducer(mockState, {
        type: LOGIN_SET_USERNAME, user: 'john'
    });
    expect(state.user).toBe('john');
});

it('handles the set pass action', () => {
    const state = reducer(mockState, {
        type: LOGIN_SET_PASSWORD, pass: 'pass123'
    });
    expect(state.pass).toBe('pass123');
});
