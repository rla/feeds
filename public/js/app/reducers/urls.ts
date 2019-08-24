import { URLS_SET_TEXT, UrlsAction } from '../actions/urls';

export type UrlsState = {
  text: string;
};

const initialState = {
  text: '',
};

export default (state = initialState, action: UrlsAction): UrlsState => {
  switch (action.type) {
    case URLS_SET_TEXT:
      return { ...state, text: action.text };
    default:
      return state;
  }
};
