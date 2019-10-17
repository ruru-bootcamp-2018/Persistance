import React from 'react';
import { connect } from 'react-redux';

class Template extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        return <p> template</p>;
    }
}

const mapStateToProps = state => state;

export default Template;
