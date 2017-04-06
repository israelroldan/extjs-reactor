import React, { Component } from 'react';
import { Container } from '@extjs/reactor/modern';
import { connect } from 'react-redux';
import { setTitle } from '../actions';

class Speaker extends Component {

    render() {
        return (
            <Container>
                Speaker Detail
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return state.speaker;
}

export default connect(mapStateToProps)(Speaker);