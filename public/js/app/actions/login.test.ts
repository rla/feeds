import {
    setPass,
    setUser,
    submit,
    LOGIN_SET_USERNAME,
    LOGIN_SET_PASSWORD
} from './login';
import mockStore from '../testing/mockStore';
import { AUTH_SUCCESSFUL } from './auth';

it('dispatches the setUser action', async () => {
    const store = mockStore({});
    await store.dispatch(setUser('test'));
    const actions = store.getActions();
    expect(actions).toEqual([{ type: LOGIN_SET_USERNAME, user: 'test' }]);
});

it('dispatches the setPass action', async () => {
    const store = mockStore({});
    await store.dispatch(setPass('test'));
    const actions = store.getActions();
    expect(actions).toEqual([{ type: LOGIN_SET_PASSWORD, pass: 'test' }]);
});

it('dispatches the submit action', async () => {
    const store = mockStore({ login: { user: 'test', pass: 'test' } });
    await store.dispatch(submit());
    const actions = store.getActions();
    expect(actions).toEqual([{ type: AUTH_SUCCESSFUL }]);
});
