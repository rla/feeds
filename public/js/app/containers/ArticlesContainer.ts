import { connect } from 'react-redux';
import {
    deleteFeed,
    markRead,
    markImportant,
    markSeen,
    read
} from '../actions/articles';
import Articles from '../components/Articles';
import { FeedsState } from '../store';
import { ThunkDispatch } from '../actions/thunk';

const mapStateToProps = (state: FeedsState) => ({
    authenticated: state.auth.authenticated,
    items: state.articles.items
});

const mapDispatchToProps = (dispatch: ThunkDispatch) => ({
    deleteFeed: (articleId: string) => dispatch(deleteFeed(articleId)),
    markRead: (articleId: string) => dispatch(markRead(articleId)),
    markImportant: (articleId: string) => dispatch(markImportant(articleId)),
    markSeen: (articleId: string) => dispatch(markSeen(articleId)),
    read: (articleId: string) => dispatch(read(articleId))
});

/**
 * Container for the list of articles.
 */
const ArticlesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Articles);

export default ArticlesContainer;
