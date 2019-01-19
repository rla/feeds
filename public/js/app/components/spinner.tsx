import React from 'react';
import * as api from '../api';

type State = {
    visible: boolean
};

/**
 * Helper to show/hide the global AJAX spinner.
 */
export default class Spinner extends React.Component<{}, State> {

    constructor(props: {}) {
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
                {this.state.visible && <div className='spin'/>}
            </div>
        );
    }
}
