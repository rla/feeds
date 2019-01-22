import { AnyAction } from 'redux';
import { FeedsState } from '../store';
import { Api } from '../api';

type ThunkAction = (dispatch: ThunkDispatch, getState: () => FeedsState, api: Api) => void;

type ActionDispatch = (action: AnyAction) => void;

type ThunkActionDispatch = (action: ThunkAction) => void;

/**
 * Helper type for the dispatch function that also accepts thunks.
 */
export type ThunkDispatch = ActionDispatch & ThunkActionDispatch;
