import { ChangeEvent, FormEvent } from 'react';
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
export const submit = (e: FormEvent) => {
    e.preventDefault();
    return (dispatch: ThunkDispatch) => {
        dispatch(routeView('results'));
    };
};

export const setQuery = (e: ChangeEvent<HTMLInputElement>) =>
    ({ type: SEARCH_SET_QUERY, query: e.target.value });
