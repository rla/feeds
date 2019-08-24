import { connect } from 'react-redux';
import { FeedsState } from '../store';
import { setQuery, submit } from '../actions/search';
import Search from '../components/Search';
import { ThunkDispatch } from '../actions/thunk';

const mapStateToProps = (state: FeedsState) => ({
  query: state.search.query,
});

const mapDispatchToProps = (dispatch: ThunkDispatch) => ({
  setQuery: (query: string) => dispatch(setQuery(query)),
  submit: () => dispatch(submit()),
});

/**
 * Container for the search form.
 */
const SearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);

export default SearchContainer;
