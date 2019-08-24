import { connect } from 'react-redux';
import { FeedsState } from '../store';
import { viewToDisplay } from '../selectors/route';
import { logout } from '../actions/auth';
import App from '../components/App';
import { ThunkDispatch } from '../actions/thunk';

const mapStateToProps = (state: FeedsState) => ({
  display: viewToDisplay(state.route.view),
  spinner: state.spinner.show,
  authenticated: state.auth.authenticated,
  allowAnonymousReadonly: state.auth.allowAnonymousReadonly,
});

const mapDispatchToProps = (dispatch: ThunkDispatch) => ({
  logout: () => dispatch(logout()),
});

/**
 * The root application components.
 */
const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
