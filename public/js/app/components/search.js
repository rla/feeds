const router = require('../router');

// Search form.

module.exports = class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = { query: props.args.query };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Handles the term input change.
    
    handleChange(e) {
        this.setState({ query: e.target.value });
    }

    // Handles the submission of the search form. Directs
    // the router to the search results page.

    handleSubmit(e) {
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
};
