import React, { Component } from 'react';
import { Calendar_Days, Container } from '@extjs/reactor/modern';
import { connect } from 'react-redux';
import model from './EventModel';

class Calendar extends Component {

    constructor({ children }) {
        super();
        this.state = { children };

        // Lookup favorites and filter event store by them.
        const favs = localStorage.getItem('favoriteEvents');
        this.favorites = favs ? JSON.parse(favs) : [];
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.children) this.setState({ children: nextProps.children });
    }

    store = Ext.create('Ext.calendar.store.Calendars', {
        eventStoreDefaults: {
            model,
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
        const { showEvent } = this.props;
        const { children } = this.state;

        return (
            <Container layout={{ type: 'card', animation: 'slide' }} activeItem={showEvent && children ? 1 : 0}>
                <Calendar_Days
                    visibleDays={3}
                    startTime={8}
                    endTime={22}
                    value={new Date(2017, 3, 4)}
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
                {children}
            </Container>
        )
    }
}

const mapStateToProps = ({ event }) => {
    return { showEvent: event.showEvent };
}

export default connect(mapStateToProps)(Calendar);