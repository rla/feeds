import React from 'react';
import * as api from '../api';

type Props = {
    onAuthenticated: () => void
};

type State = {
    user: string,
    pass: string
};

/**
 * Login form.
 */
export default class Login extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            user: '',
            pass: ''
        };
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUserChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ user: e.target.value });
    }

    handlePassChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ pass: e.target.value });
    }

    handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        this.login();
    }

    async login() {
        if (await api.login(this.state.user, this.state.pass)) {
            this.props.onAuthenticated();
        }
    }

    render() {
        return (
            <form className='form-inline' onSubmit={this.handleSubmit}>
                <input type='text' name='user' placeholder='user' className='input-small'
                    value={this.state.user} onChange={this.handleUserChange}/>
                <input type='password' name='pass' placeholder='pass' className='input-small'
                    value={this.state.pass} onChange={this.handlePassChange}/>
                <button type='submit' className='btn'>Login</button>
            </form>
        );
    }
}
