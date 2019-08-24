import { connect } from 'react-redux';
import { deleteFeed, resolveFeed } from '../actions/invalid';
import InvalidList from '../components/InvalidList';
import { FeedsState } from '../store';
import { ThunkDispatch } from '../actions/thunk';

const mapStateToProps = (state: FeedsState) => ({
  authenticated: state.auth.authenticated,
  items: state.invalid.items,
});

const mapDispatchToProps = (dispatch: ThunkDispatch) => ({
  deleteFeed: (feedId: string) => dispatch(deleteFeed(feedId)),
  resolveFeed: (feedId: string) => dispatch(resolveFeed(feedId)),
});

/**
 * Fetch - based container component for the list of invalid feeds.
 */
const InvalidListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InvalidList);

export default InvalidListContainer;
