import React, { Component } from 'react';
import { Container } from '@extjs/reactor/modern';
import { connect } from 'react-redux';
import { setTitle } from '../actions';

import days from '../util/days';

class Event extends Component {

    render() {
        const { event } = this.props;

        return (
            <Container masked={!event} padding="20">
                { event && (
                    <div>
                        <div className="app-event-name">{event.name}</div>
                        <div className="app-event-speaker">{ event.speaker ? `by ${event.speaker}` : event.category }</div>
                        <div className="app-event-time">{days[event.day]} {event.time}</div>
                        <div className="app-event-location">{event.location}</div>
                        <hr/>
                        <div className="app-event-abstract"/>
                    </div>
                )}
            </Container>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        event: state.schedule.event
    };
}

export default connect(mapStateToProps)(Event);