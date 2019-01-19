import React from 'react';
import * as api from '../api';
import * as router from '../router';

type State = {
    lines: string
};

/**
 * Form to add new feed URLs.
 */
export default class Urls extends React.Component<{}, State> {

    constructor(props: {}) {
        super(props);
        this.state = { lines: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Handles the input change.

    handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        this.setState({ lines: e.target.value });
    }

    // Handles the submission of the form.

    async handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const lines = this.state.lines.split(/\r?\n/)
            .map((line) => line.trim())
            .filter((line) => line.length > 0);
        await api.addUrls(lines);
        this.setState({ lines: '' });
        router.refresh();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor='urls'>Add list of feed URLs (one per line)</label>
                <textarea id='urls' onChange={this.handleChange} rows={3} value={this.state.lines}/><br/>
                <button type='submit' className='btn'>Add</button>
            </form>
        );
    }
}
