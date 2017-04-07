import React, { Component } from 'react';
import { Container } from '@extjs/reactor/modern';
import { connect } from 'react-redux';
import { setTitle } from '../actions';

class Speaker extends Component {

    render() {
        const { speaker } = this.props;
        return (
            <Container masked={!speaker} padding={20}>
                { speaker && (
                    <div>
                        <img className="app-speaker-image" src={speaker.image}/>
                        <div className="app-speaker-text">
                            <div className="app-speaker-name">{speaker.name}</div>
                            <div className="app-speaker-title">{speaker.title}</div>
                        </div>
                    </div>
                )}
            </Container>
        )
    }
}

const mapStateToProps = ({speakers}) => {
    return speakers;
}

export default connect(mapStateToProps)(Speaker);