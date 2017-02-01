import React from 'react';
import { List } from '@extjs/reactor/modern';
import data from './data';

Ext.require([
    'Ext.Toast',
    'Ext.MessageBox'
]);

export default function ListExample() {
    const store = Ext.create('Ext.data.Store', { 
        data,
        grouper: {
            groupFn: function(record) {
                return record.get('last_name')[0];
            }
        },
        sorters: ['last_name', 'first_name']
    });

    return (
        <List
            indexBar={true}
            shadow={true}
            itemTpl="{first_name} {last_name}"
            grouped={true}
            pinHeaders={true}
            store={store}
            onItemTap={(view, index, target, record) => {
                Ext.toast(`You selected ${record.get('first_name')} ${record.get('last_name')}.`)
            }}
            onItemDisclosure={(record, btn, index) => {
                Ext.Msg.alert('Tap', 'Disclose more info for ' + record.get('firstName'), Ext.emptyFn);
            }}
        />
    )
}