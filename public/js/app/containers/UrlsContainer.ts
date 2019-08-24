import { connect } from 'react-redux';
import { FeedsState } from '../store';
import { setText, submit } from '../actions/urls';
import Urls from '../components/Urls';
import { ThunkDispatch } from '../actions/thunk';

const mapStateToProps = (state: FeedsState) => ({
  text: state.urls.text,
});

const mapDispatchToProps = (dispatch: ThunkDispatch) => ({
  setText: (text: string) => dispatch(setText(text)),
  submit: () => dispatch(submit()),
});

/**
 * Container for the urls form.
 */
const UrlsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Urls);

export default UrlsContainer;
