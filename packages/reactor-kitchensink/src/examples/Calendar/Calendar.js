import React, { Component } from 'react';
import { Calendar } from '@extjs/reactor/modern';
import './data';

export default class CalendarExample extends Component {
    constructor() {
        super();
    }

    store = Ext.create('Ext.calendar.store.Calendars', {
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: '/KitchenSink/CalendarFull'
            }
        });

    render() {
        return (
            <Calendar
                shadow
                views={{
                    day: {
                        startTime: 6,
                        endTime: 22
                    },
                    workweek: {
                        xtype: 'calendar-week',
                        controlStoreRange: false,
                        titleTpl: '{start:date("j M")} - {end:date("j M")}',
                        label: 'Work Week',
                        weight: 15,
                        dayHeaderFormat: 'D d',
                        firstDayOfWeek: 1,
                        visibleDays: 5                    
                    }
                }}
                timezoneOffset={0}
                store={this.store}
            />
        );
    }
}