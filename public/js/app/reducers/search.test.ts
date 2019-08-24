import { SEARCH_SET_QUERY } from '../actions/search';
import reducer, { SearchState } from './search';

const mockState: SearchState = {
  query: 'test',
};

it('handles the set query action', () => {
  const state = reducer(mockState, {
    type: SEARCH_SET_QUERY,
    query: 'query',
  });
  expect(state.query).toBe('query');
});
