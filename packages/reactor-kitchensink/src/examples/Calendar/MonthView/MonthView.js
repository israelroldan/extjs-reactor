import React, { Component } from 'react';
import { Calendar_Month, Panel } from '@extjs/reactor/modern';
import '../data';

export default class CalendarMonthViewExample extends Component{

    store = Ext.create('Ext.calendar.store.Calendars',{
        autoLoad: true,
        proxy:{
            type: 'ajax',
            url: '/KitchenSink/CalendarFull'
        }
    })

    render(){
        return (
            <Panel 
                title={Ext.Date.format(new Date(),'F Y')}
                layout={{
                    type:'hbox',
                    align:'stretch'
                }}
                header={{
                    titleAlign:'center'
                }}>
                <Panel 
                    title={'Calendars'}
                    ui={'light'}
                    width={150}
                    bodyPadding={5}
                    hidden={Ext.os.is.Phone}
                    items={[{
                        xtype: 'calendar-list',
                        store:this.store
                    }]}/>
                 <Calendar_Month
                    flex= {1}
                    visibleWeeks={null}
                    timezoneOffset={0}
                    gestureNavigation={false}
                    store={this.store}/>
            </Panel>
        )
    }
}