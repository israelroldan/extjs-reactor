import React, { Component, PropTypes } from 'react';
import { List } from '@extjs/ext-react';
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

    itemTpl = new Template(data => (
        <div className="app-notification-item">
            <div className="app-notification-text">{data.text}</div>
            <span className="app-notification-time">{data.time}</span>
        </div>
    ))

    render() {
        return (
            <List
                itemTpl={this.itemTpl}
                store={this.store}
                disableSelection
                grouped
            />
        );
    }
}