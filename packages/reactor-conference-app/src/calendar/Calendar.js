import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Container } from '@extjs/reactor/modern';
import AppBar from '../AppBar';

class Calendar extends Component {
    render() {
        return (
            <Container>
                Calendar
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return { ...state.calendar };
}

export default connect(mapStateToProps)(Calendar);