import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Calendar_Days, Container } from '@extjs/ext-react';
import Event from '../event/Event';
import { loadEvent } from '../event/actions';

class Calendar extends Component {

    constructor({ children }) {
        super();
        this.state = { children };

        // Lookup favorites and filter event store by them.
        const favs = localStorage.getItem('favoriteEvents');
        this.favorites = favs ? JSON.parse(favs) : [];
    }

    componentDidMount = () => this.updateData();
    componentDidUpdate = (prevProps) => this.updateData(prevProps);

    updateData = (prevProps) => {
        const id = this.props.match.params.id;
        
        if (!prevProps || prevProps.match.params.id !== id) {
            this.props.dispatch(loadEvent(id, 'Calendar', '/calendar'))
        }
    }

    store = Ext.create('Ext.calendar.store.Calendars', {
        eventStoreDefaults: {
            proxy: {
                type: 'ajax',
                url: '/resources/schedule.json'
            },
            filters: item => this.favorites.indexOf(item.get('id')) >= 0
        },
        data: [{
            id: 1,
            name: 'myCal'
        }]
    })

    eventTap = (cal, ctx) => {
        const eventId = ctx.event && ctx.event.getId();
        if(eventId) location.hash = `/calendar/${eventId}`;
    }

    render() {
        const { event, match } = this.props;

        return (
            <Container layout={{ type: 'card', animation: 'slide' }} activeItem={match.params.id ? 1 : 0}>
                <Calendar_Days
                    visibleDays={3}
                    startTime={7}
                    endTime={22}
                    value={new Date(2016, 10, 7)}
                    store={this.store}
                    dayHeader={{
                        format: 'D',
                        compactOptions: {
                            format: 'D'
                        }
                    }}
                    editForm={null}
                    draggable={false}
                    resizeEvents={false}
                    gestureNavigation={false}
                    onEventTap={this.eventTap}
                />
                <Event event={event}/>
            </Container>
        )
    }
}

const mapStateToProps = ({ event }) => {
    return { showEvent: event.showEvent };
}

export default connect(mapStateToProps)(Calendar);