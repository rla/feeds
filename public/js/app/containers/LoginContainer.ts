import { connect } from 'react-redux';
import { FeedsState } from '../store';
import { setUser, setPass, submit } from '../actions/login';
import Login from '../components/Login';
import { ThunkDispatch } from '../actions/thunk';

const mapStateToProps = (state: FeedsState) => ({
    user: state.login.user,
    pass: state.login.pass,
});

const mapDispatchToProps = (dispatch: ThunkDispatch) => ({
    setUser: (user: string) => dispatch(setUser(user)),
    setPass: (pass: string) => dispatch(setPass(pass)),
    submit: () => dispatch(submit())
});

/**
 * Fetch - based container component for the list of invalid feeds.
 */
const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default LoginContainer;
