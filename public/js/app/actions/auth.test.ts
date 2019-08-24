import { login, logout, AUTH_LOGGED_OUT, AUTH_SUCCESSFUL } from './auth';
import mockStore from '../testing/mock/store';

it('dispatches the login action', async () => {
  const store = mockStore({ login: { user: 'test', pass: 'test' } });
  await store.dispatch(login());
  const actions = store.getActions();
  expect(actions).toEqual([{ type: AUTH_SUCCESSFUL }]);
});

it('dispatches the logout action', async () => {
  const store = mockStore({});
  await store.dispatch(logout());
  const actions = store.getActions();
  expect(actions).toEqual([{ type: AUTH_LOGGED_OUT }]);
});
