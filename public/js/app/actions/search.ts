import { ThunkDispatch } from './thunk';
import { routeView } from './route';

export const SEARCH_SET_QUERY = 'SEARCH_SET_QUERY';

export type SearchSetQuery = {
    type: typeof SEARCH_SET_QUERY,
    query: string
};

export type SearchAction = SearchSetQuery;

/**
 * Submits the search form. Dispatches action to
 * show the search result view.
 */
export const submit = () => {
    return async (dispatch: ThunkDispatch) => {
        await dispatch(routeView('results'));
    };
};

export const setQuery = (query: string) =>
    ({ type: SEARCH_SET_QUERY, query });
