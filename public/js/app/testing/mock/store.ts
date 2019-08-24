import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mockApi } from './api';
import { ThunkDispatch } from '../../actions/thunk';
import { AnyAction } from 'redux';

type FeedsMockStore = {
  dispatch: ThunkDispatch;
  getActions: () => AnyAction[];
};

/**
 * Helper function to create mock store for testing actions.
 */
// tslint:disable-next-line: no-any
export default (initialState: any): FeedsMockStore => {
  const middlewares = [thunk.withExtraArgument(mockApi)];
  const mockStore = configureStore(middlewares);
  return mockStore(initialState) as FeedsMockStore;
};
