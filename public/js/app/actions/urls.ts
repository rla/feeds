import { ChangeEvent, FormEvent } from 'react';
import { ThunkDispatch } from './thunk';
import { FeedsState } from '../store';
import * as api from '../api';

export const URLS_SET_TEXT = 'URLS_SET_TEXT';

export type UrlsSetText = {
    type: typeof URLS_SET_TEXT,
    text: string
};

export type UrlsAction = UrlsSetText;

/**
 * Submits the urls form.
 */
export const submit = (e: FormEvent) => {
    e.preventDefault();
    return async (dispatch: ThunkDispatch, getState: () => FeedsState) => {
        const state = getState();
        const text = state.urls.text;
        const urls = text.split(/\r?\n/)
            .map((line) => line.trim())
            .filter((line) => line.length > 0);
        dispatch({ type: URLS_SET_TEXT, text: '' });
        await api.addUrls(urls);
    };
};

/**
 * Sets the urls form textarea content.
 */
export const setText = (e: ChangeEvent<HTMLTextAreaElement>) =>
    ({ type: URLS_SET_TEXT, text: e.target.value });
