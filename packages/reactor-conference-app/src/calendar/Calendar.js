import React, { Component } from 'react';
import { Calendar_Days } from '@extjs/reactor/modern';
import AppBar from '../AppBar';

Ext.require('Ext.calendar.model.*');
import './EventModel';

export default class Calendar extends Component {

    constructor() {
        super();

        // Lookup favorites and filter event store by them.
        const favs = localStorage.getItem('favoriteEvents');
        this.favorites = favs ? JSON.parse(favs) : [];
    }

    store = Ext.create('Ext.calendar.store.Calendars', {
        eventStoreDefaults: {
            model: 'ConferenceApp.calendar.model.EventModel',
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

    render() {
        return (
            <Calendar_Days
                visibleDays={3}
                startTime={8}
                endTime={22}
                value={new Date(2017, 3, 4)}
                store={this.store}
                dayHeader={{
                    xtype: 'calendar-daysheader',
                    format: 'D',
                    compactOptions: {
                        format: 'D'
                    }
                }}
                editForm={null}
                draggable={false}
                resizeEvents={false}
                gestureNavigation={false}
            />
        )
    }
}