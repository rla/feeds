import {
    showSpinner,
    hideSpinner,
    SPINNER_SHOW,
    SPINNER_HIDE
} from './spinner';
import mockStore from '../testing/mockStore';

it('dispatches the show action', async () => {
    const store = mockStore({});
    await store.dispatch(showSpinner());
    const actions = store.getActions();
    expect(actions).toEqual([{ type: SPINNER_SHOW }]);
});

it('dispatches the hide action', async () => {
    const store = mockStore({});
    await store.dispatch(hideSpinner());
    const actions = store.getActions();
    expect(actions).toEqual([{ type: SPINNER_HIDE }]);
});
