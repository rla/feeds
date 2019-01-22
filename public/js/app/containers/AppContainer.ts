import { connect } from 'react-redux';
import { FeedsState } from '../store';
import { viewToDisplay } from '../selectors/route';
import { logout } from '../actions/auth';
import App from '../components/App';

const mapStateToProps = (state: FeedsState) => ({
    display: viewToDisplay(state.route.view),
    spinner: state.spinner.show,
    authenticated: state.auth.authenticated
});

const mapDispatchToProps = () => ({ logout });

/**
 * Fetch - based container component for the list of invalid feeds.
 */
const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
