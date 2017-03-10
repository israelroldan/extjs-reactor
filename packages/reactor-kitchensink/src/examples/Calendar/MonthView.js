import React, { Component } from 'react';
import { Calendar_Month } from '@extjs/reactor/modern';
import './data';

export default class CalendarMonthViewExample extends Component{
    constructor(){
        super();
    }

    store = Ext.create('Ext.calendar.store.Calendars',{
        autoLoad: true,
        proxy:{
            type: 'ajax',
            url: '/Kitchensink/CalendarFull'
        }
    });

    render(){
        return (
            <Calendar_Month
                shadow
                store={this.store}
                views={{
                    month
                }}
            />
        )
    }
   


}