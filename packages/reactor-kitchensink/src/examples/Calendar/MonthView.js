import React, { Component } from 'react';
import { Calendar_Month, Panel } from '@extjs/reactor/modern';
import './data';

export default class CalendarMonthViewExample extends Component{
    constructor(){
        super();
        console.log(this.store.data.items);
    }

    store = Ext.create('Ext.calendar.store.Calendars',{
        autoLoad: true,
        proxy:{
            type: 'ajax',
            url: '/KitchenSink/CalendarFull'
        }
    })

    mainPanelConfig = {
        title:Ext.Date.format(new Date(),'F Y'),        
        layout:{
            type:'hbox',
            align:'stretch'
        },
        header:{
            titleAlign:'center'
        }
    }

    leftPanelConfig = {
        title: 'Calendars',
        ui: 'light',
        width: 150,
        bodyPadding: 5,
        hidden: Ext.os.is.Phone,
        items: [{
            xtype: 'calendar-list',
            store:this.store
        }]
    }

    calendarMonthViewConfig = {
        flex: 1,
        visibleWeeks: null,
        timezoneOffset: 0,
        gestureNavigation: false,
        store:this.store
    }

    render(){
        return (
            <Panel {...this.mainPanelConfig}>
                <Panel {...this.leftPanelConfig}/>
                 <Calendar_Month {...this.calendarMonthViewConfig}/>
            </Panel>
        )
    }
}