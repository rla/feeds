const api = require('../api');

// Login form.

module.exports = class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pass: ''
        };
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUserChange(e) {
        this.setState({ user: e.target.value });
    }

    handlePassChange(e) {
        this.setState({ pass: e.target.value });
    }

    handleSubmit(e) {
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
};
