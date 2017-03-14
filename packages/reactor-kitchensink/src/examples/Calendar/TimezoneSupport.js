import React, { Component } from 'react';
import { Calendar_Day, Panel } from '@extjs/reactor/modern';
import './data';

export default class CalendarTimezoneSupportExample extends Component{
    constructor(){
        super();
    }
    changeOptions(){
        const selectorValue = Ext.getCmp('selector').getSelection().data.value;
        this.refs.timezoneview.setConfig('timezoneOffset', selectorValue)
    }

    store=Ext.create('Ext.calendar.store.Calendars',{
        autoLoad:true,
        proxy:{
            type:'ajax',
            url:'/KitchenSink/CalendarTimezone'
        }
    })

    mainPanelConfig={
        title:Ext.Date.format(new Date(),'F Y'),
        layout:'fit',
        header:{
            layout: 'hbox',
            items: [{
                xtype: 'component',
                flex: 1
            }, {
                xtype: 'selectfield',
                id:'selector',
                width: Ext.os.is.Phone ? 150 : 200,
                value: 0,
                listeners:{
                    change:this.changeOptions.bind(this)
                },
                options: [{
                    text: Ext.os.is.Phone ? 'New York -5' : 'New York (UTC-05:00)',
                    value: 300
                }, {
                    text: Ext.os.is.Phone ? 'London +0' :'London (UTC+00:00)',
                    value: 0
                }, {
                    text: Ext.os.is.Phone ? 'Paris +1' :'Paris (UTC+01:00)',
                    value: -60
                }, {
                    text: Ext.os.is.Phone ? 'Sydney +10' : 'Sydney (UTC+10:00)',
                    value: -600,
                }]
            }]
        }
    }

    calendarTimezoneConfig={
        startTime: 6,
        endTime: 22,
        visibleDays: 2,
        timezoneOffset: 0,
        gestureNavigation: false,
        showNowMarker: false,
        value:new Date(),
        store: this.store
    }

    render(){
        return(
            <Panel ref="mainpanel" {...this.mainPanelConfig}>
                <Calendar_Day ref="timezoneview" {...this.calendarTimezoneConfig}/>
            </Panel>
        )
    }
}