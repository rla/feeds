import { SPINNER_SHOW, SPINNER_HIDE } from '../actions/spinner';
import reducer, { SpinnerState } from './spinner';

const mockState: SpinnerState = {
  show: false,
};

it('handles the set query action', () => {
  let state = reducer(mockState, { type: SPINNER_SHOW });
  expect(state.show).toBe(true);
  state = reducer(mockState, { type: SPINNER_HIDE });
  expect(state.show).toBe(false);
});
