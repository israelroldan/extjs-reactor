import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Container } from '@extjs/reactor/modern';
import AppBar from '../AppBar';

class Notifications extends Component {
    render() {
        return (
            <Container>
                Notifications
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return { ...state.notifications };
}

export default connect(mapStateToProps)(Notifications);