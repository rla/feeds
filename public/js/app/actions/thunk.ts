import { AnyAction } from 'redux';
import { FeedsState } from '../store';

type ThunkAction = (dispatch: ThunkDispatch, getState: () => FeedsState) => void;

type ActionDispatch = (action: AnyAction) => void;

type ThunkActionDispatch = (action: ThunkAction) => void;

/**
 * Helper type for the dispatch function that also accepts thunks.
 */
export type ThunkDispatch = ActionDispatch & ThunkActionDispatch;
