import { connect } from 'react-redux';
import { FeedsState } from '../store';
import { setQuery, submit } from '../actions/search';
import Search from '../components/Search';
import { ThunkDispatch } from '../actions/thunk';
import { ChangeEvent, FormEvent } from 'react';

const mapStateToProps = (state: FeedsState) => ({
    query: state.search.query
});

const mapDispatchToProps = (dispatch: ThunkDispatch) => ({
    setQuery: (e: ChangeEvent<HTMLInputElement>) => dispatch(setQuery(e)),
    submit: (e: FormEvent) => dispatch(submit(e))
});

/**
 * Container for the search form.
 */
const SearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);

export default SearchContainer;
