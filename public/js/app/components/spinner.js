const api = require('../api');

// Helper to show/hide the global AJAX spinner.

module.exports = class Spinner extends React.Component {

    constructor(props) {
        super(props);
        this.state = { visible: false };        
    }

    componentDidMount() {
        api.addHandler((visible) => {
            this.setState({ visible });
        });
    }

    render() {
        return (
            <div>
                {this.state.visible && <div className='spin'></div>}
            </div>
        );
    }
};
