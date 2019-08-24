import { SEARCH_SET_QUERY, SearchAction } from '../actions/search';

export type SearchState = {
  query: string;
};

const initialState = {
  query: '',
};

export default (state = initialState, action: SearchAction): SearchState => {
  switch (action.type) {
    case SEARCH_SET_QUERY:
      return {
        ...state,
        query: action.query,
      };
    default:
      return state;
  }
};
