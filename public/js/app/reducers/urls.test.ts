import { URLS_SET_TEXT } from '../actions/urls';
import reducer, { UrlsState } from './urls';

const mockState: UrlsState = {
    text: 'http://example.com'
};

it('handles the set url action', () => {
    const state = reducer(mockState, {
        type: URLS_SET_TEXT, text: 'test'
    });
    expect(state.text).toBe('test');
});
