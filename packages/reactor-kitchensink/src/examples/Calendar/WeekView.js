import React, { Component } from 'react';
import { Calendar_Week, Panel } from '@extjs/reactor/modern';
import './data';

export default class CalendarWeekViewExample extends Component{
    constructor(){
        super();
    }

    store=Ext.create('Ext.data.Store',{
        autoLoad: true,
        proxy:{
            type:'ajax',
            url:'/KitchenSink/CalendarFull'
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
                    text: Ext.os.is.Phone ? null : 'Full Week',
                    iconCls: Ext.os.is.Phone ? 'x-fa fa-briefcase' : null,
                    value: 'workweek'
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
        timezoneOffset: 0,
        gestureNavigation: false,
        value: new Date(),
        firstDayOfWeek: 0,
        visibleDays: 7
        //store: this.store
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