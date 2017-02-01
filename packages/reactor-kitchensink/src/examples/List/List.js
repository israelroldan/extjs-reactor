import React, { Component } from 'react';
import { List } from '@extjs/reactor/modern';
import data from './data';

Ext.require([
    'Ext.Toast',
    'Ext.MessageBox'
]);

export default class ListExample extends Component {

    constructor() {
        super();
        this.store = Ext.create('Ext.data.Store', { 
            data,
            grouper: {
                groupFn: function(record) {
                    return record.get('last_name')[0];
                }
            },
            sorters: ['last_name', 'first_name']
        });
    }

    render() {
        return (
            <List
                indexBar={true}
                shadow={true}
                itemTpl="{first_name} {last_name}"
                grouped={true}
                pinHeaders={true}
                store={this.store}
                onItemTap={(view, index, target, record) => {
                    Ext.toast(`You selected ${record.get('first_name')} ${record.get('last_name')}.`)
                }}
                onItemDisclosure={(record, btn, index) => {
                    Ext.Msg.alert('Tap', 'Disclose more info for ' + record.get('first_name'), Ext.emptyFn);
                }}
            />
        )
    }
    
}