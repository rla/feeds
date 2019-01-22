import { connect } from 'react-redux';
import { FeedsState } from '../store';
import { setUser, setPass, submit } from '../actions/login';
import Login from '../components/Login';
import { ThunkDispatch } from '../actions/thunk';
import { ChangeEvent, FormEvent } from 'react';

const mapStateToProps = (state: FeedsState) => ({
    user: state.login.user,
    pass: state.login.pass,
});

const mapDispatchToProps = (dispatch: ThunkDispatch) => ({
    setUser: (e: ChangeEvent<HTMLInputElement>) => dispatch(setUser(e)),
    setPass: (e: ChangeEvent<HTMLInputElement>) => dispatch(setPass(e)),
    submit: (e: FormEvent) => dispatch(submit(e))
});

/**
 * Fetch - based container component for the list of invalid feeds.
 */
const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default LoginContainer;
