import { connect } from 'react-redux';
import { FeedsState } from '../store';
import { setText, submit } from '../actions/urls';
import Urls from '../components/Urls';
import { ThunkDispatch } from '../actions/thunk';
import { ChangeEvent, FormEvent } from 'react';

const mapStateToProps = (state: FeedsState) => ({
    text: state.urls.text
});

const mapDispatchToProps = (dispatch: ThunkDispatch) => ({
    setText: (e: ChangeEvent<HTMLTextAreaElement>) => dispatch(setText(e)),
    submit: (e: FormEvent) => dispatch(submit(e))
});

/**
 * Container for the urls form.
 */
const UrlsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Urls);

export default UrlsContainer;
