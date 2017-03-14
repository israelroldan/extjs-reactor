import React, { Component } from 'react';
import { Calendar_Week, Panel } from '@extjs/reactor/modern';
import './data';

export default class CalendarWeekViewExample extends Component{
    constructor(){
        super();
    }

    changeToWorkWeek(){
        this.refs.weekview.setConfig('visibleDays',5)
    }
    changeToCalendarWeek(){
        this.refs.weekview.setConfig('visibleDays',7)
    }

    store=Ext.create('Ext.calendar.store.Calendars',{
        autoLoad: true,
        proxy:{
            type:'ajax',
            url:'/KitchenSink/CalendarWeek'
        }
    })

    mainPanelConfig={
        title:Ext.Date.format(new Date(),'F Y'),
        layout:{
            type:'hbox',
            align:'stretch'
        },
        header:{
            layout:'hbox',
            items:[{
                xtype:'component',
                flex:1
            },{
                xtype:'segmentedbutton',
                items:[{
                    text: Ext.os.is.Phone ? null : 'Full Week',
                    iconCls: Ext.os.is.Phone ? 'x-fa fa-calendar-check-o' : null,
                    value: 'fullweek',
                    handler: this.changeToCalendarWeek.bind(this)
                },{
                    text: Ext.os.is.Phone ? null : 'Work Week',
                    iconCls: Ext.os.is.Phone ? 'x-fa fa-briefcase' : null,
                    value: 'workweek',
                    handler: this.changeToWorkWeek.bind(this)
                }]
            }]
        }
    }

    leftPanelConfig={
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

    calendarWeekViewConfig={
        store: this.store,        
        flex:1,
        timezoneOffset: 0,
        gestureNavigation: false,
        value:new Date(),
        firstDayOfWeek: 0,
        visibleDays: 7
    }

    render(){
        return(
            <Panel {...this.mainPanelConfig}>
                <Panel {...this.leftPanelConfig}/>
                <Calendar_Week ref="weekview" {...this.calendarWeekViewConfig}/>
            </Panel>
        )
    }
}