import React, { Component } from 'react';
import { Calendar_Week, Panel } from '@extjs/reactor/modern';
import './data';

export default class CalendarWeekViewExample extends Component{
    constructor(){
        super();
    }

    calendarData = {
        value : new Date(),
        visibleDays:7,
        firstDayOfWeek:0
    }

    store=Ext.create('Ext.data.Store',{
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
                    value: 'fullweek'
                },{
                    text: Ext.os.is.Phone ? null : 'Work Week',
                    iconCls: Ext.os.is.Phone ? 'x-fa fa-briefcase' : null
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
            //store:this.store
        }]
    }

    calendarWeekViewConfig={
        //store: this.store,        
        flex:1,
        timezoneOffset: 0,
        gestureNavigation: false,
        value:this.calendarData.value,
        firstDayOfWeek: this.calendarData.firstDayOfWeek,
        visibleDays: this.calendarData.visibleDays
    }

    render(){
        return(
            <Panel {...this.mainPanelConfig}>
                <Panel {...this.leftPanelConfig}/>
                <Calendar_Week {...this.calendarWeekViewConfig}/>
            </Panel>
        )
    }
}