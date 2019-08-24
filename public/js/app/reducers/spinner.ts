import { SPINNER_SHOW, SPINNER_HIDE, SpinnerAction } from '../actions/spinner';

export type SpinnerState = {
  show: boolean;
};

const initialState = {
  show: false,
};

export default (state = initialState, action: SpinnerAction): SpinnerState => {
  switch (action.type) {
    case SPINNER_SHOW:
      return { ...state, show: true };
    case SPINNER_HIDE:
      return { ...state, show: false };
    default:
      return state;
  }
};
