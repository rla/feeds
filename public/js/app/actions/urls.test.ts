import { setText, submit, URLS_SET_TEXT } from './urls';
import mockStore from '../testing/mock/store';

it('dispatches the setText action', async () => {
  const store = mockStore({});
  await store.dispatch(setText('test'));
  const actions = store.getActions();
  expect(actions).toEqual([{ type: URLS_SET_TEXT, text: 'test' }]);
});

it('dispatches the submit action', async () => {
  const store = mockStore({ urls: { text: 'test' } });
  await store.dispatch(submit());
  const actions = store.getActions();
  expect(actions).toEqual([{ type: URLS_SET_TEXT, text: '' }]);
});
