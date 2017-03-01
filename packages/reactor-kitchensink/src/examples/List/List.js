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
                indexBar
                shadow
                itemTpl="{first_name} {last_name}"
                grouped
                pinHeaders
                store={this.store}
                onSelect={(list, record) => {
                    Ext.toast(`You selected ${record.get('first_name')} ${record.get('last_name')}.`)
                }}
                config={{
                    onItemDisclosure: (record, btn, index) => {
                        Ext.Msg.alert('Tap', 'Disclose more info for ' + record.get('first_name'), Ext.emptyFn);
                    }
                }}
            />
        )
    }

}