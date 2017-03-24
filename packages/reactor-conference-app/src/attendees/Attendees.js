import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Container } from '@extjs/reactor/modern';
import AppBar from '../AppBar';

class Attendees extends Component {
    render() {
        return (
            <Container>
                Attendees
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return { ...state.attendees };
}

export default connect(mapStateToProps)(Attendees);