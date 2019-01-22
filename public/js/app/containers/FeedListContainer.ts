import { connect } from 'react-redux';
import {
    deleteFeed,
    markSeen,
    markRead
} from '../actions/feeds';
import FeedList from '../components/FeedList';
import { FeedsState } from '../store';
import { ThunkDispatch } from '../actions/thunk';

const mapStateToProps = (state: FeedsState) => ({
    authenticated: state.auth.authenticated,
    items: state.feeds.items
});

const mapDispatchToProps = (dispatch: ThunkDispatch) => ({
    deleteFeed: (feedId: string) => dispatch(deleteFeed(feedId)),
    allSeen: (feedId: string) => dispatch(markSeen(feedId)),
    allRead: (feedId: string) => dispatch(markRead(feedId))
});

/**
 * Fetch - based container component for the list of invalid feeds.
 */
const FeedListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedList);

export default FeedListContainer;
