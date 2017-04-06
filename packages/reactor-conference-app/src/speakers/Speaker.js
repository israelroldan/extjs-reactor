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

const mapStateToProps = ({speakers}) => {
    console.log(speakers);
    return speakers.speaker || {};
}

export default connect(mapStateToProps)(Speaker);