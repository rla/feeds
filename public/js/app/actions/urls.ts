import { ThunkDispatch } from './thunk';
import { FeedsState } from '../store';
import { Api } from '../api';

export const URLS_SET_TEXT = 'URLS_SET_TEXT';

export type UrlsSetText = {
  type: typeof URLS_SET_TEXT;
  text: string;
};

export type UrlsAction = UrlsSetText;

/**
 * Submits the urls form.
 */
export const submit = () => {
  return async (dispatch: ThunkDispatch, getState: () => FeedsState, api: Api) => {
    const state = getState();
    const text = state.urls.text;
    const urls = text
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(line => line.length > 0);
    await dispatch({ type: URLS_SET_TEXT, text: '' });
    await api.addUrls(urls);
  };
};

/**
 * Sets the urls form textarea content.
 */
export const setText = (text: string) => ({ type: URLS_SET_TEXT, text });
