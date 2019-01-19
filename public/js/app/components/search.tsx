import React from 'react';
import * as router from '../router';

type Props = {
    query: string
};

type State = {
    query: string
};

/**
 * Search form.
 */
export default class Search extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = { query: props.query };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Handles the term input change.

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ query: e.target.value });
    }

    // Handles the submission of the search form. Directs
    // the router to the search results page.

    handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        router.go('search', encodeURIComponent(this.state.query));
    }

    render() {
        return (
            <form className='form-inline' onSubmit={this.handleSubmit}>
                <input type='text' name='query'
                    placeholder='search term' onChange={this.handleChange}/>
                <button type='submit' className='btn'>Search</button>
            </form>
        );
    }
}
