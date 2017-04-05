import React, { Component } from 'react';
import { Container } from '@extjs/reactor/modern';
import { connect } from 'react-redux';
import { setTitle } from '../actions';

import days from '../util/days';

class Event extends Component {

    render() {
        const { data } = this.props;

        return (
            <Container masked={!data} padding="20">
                { data && (
                    <div>
                        <div className="app-event-name">{data.name}</div>
                        <div className="app-event-speaker">{ data.speaker ? `by ${data.speaker}` : data.category }</div>
                        <div className="app-event-time">{days[data.day]} {data.time}</div>
                        <div className="app-event-location">{data.location}</div>
                        <hr/>
                        <div className="app-event-abstract"/>
                    </div>
                )}
            </Container>
        )
    }

}

const mapStateToProps = ({event}) => {
    return event;
}

export default connect(mapStateToProps)(Event);