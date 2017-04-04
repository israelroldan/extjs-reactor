import React, { Component, PropTypes } from 'react';
import { List } from '@extjs/reactor/modern';
import { Template } from '@extjs/reactor';
import AppBar from '../AppBar';

export default class Notifications extends Component {

    store = Ext.create('Ext.data.Store', {
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: '/resources/notifications.json'
        },
        grouper: {
            property: 'day'
        }
    })

    itemTpl = new Template(data => {
        return (
            <div style={{padding: '5px 0'}}>
                <div style={{padding: '0 0 10px 0'}}>{data.text}</div>
                <span style={{'font-weight': 'bold'}}>{data.time}</span>
            </div>
        )
    })

    render() {
        return (
            <List
                itemTpl={this.itemTpl}
                store={this.store}
                grouped
            />
        );
    }
}