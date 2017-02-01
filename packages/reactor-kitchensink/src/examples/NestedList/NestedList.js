import React from 'react';
import { NestedList } from '@extjs/reactor/modern';
import root from './data';

Ext.require('Ext.Toast');

export default function ListExample() {
    const store = Ext.create('Ext.data.TreeStore', { 
        root 
    });

    return (
        <NestedList
            title="Products"
            shadow={true}
            displayField="text"
            store={store}
            onLeafItemTap={(nestedList, list, index, target, record) => Ext.toast(`You selected ${record.get('text')}`)}
        />
    )
}