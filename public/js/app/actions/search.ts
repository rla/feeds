import { ThunkDispatch } from './thunk';
import * as router from '../router';
import { FeedsState } from '../store';

export const SEARCH_SET_QUERY = 'SEARCH_SET_QUERY';

export type SearchSetQuery = {
    type: typeof SEARCH_SET_QUERY,
    query: string
};

export type SearchAction = SearchSetQuery;

/**
 * Submits the search form.
 */
export const submit = () => {
    return async (dispatch: ThunkDispatch, getState: () => FeedsState) => {
        router.go('results', getState().search.query);
    };
};

export const setQuery = (query: string) =>
    ({ type: SEARCH_SET_QUERY, query });
