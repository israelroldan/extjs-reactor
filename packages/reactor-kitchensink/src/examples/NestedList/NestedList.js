import React, { Component } from 'react';
import { NestedList } from '@extjs/reactor/modern';
import root from './data';

Ext.require('Ext.Toast');

export default class ListExample extends Component {

    render() {
        return (
            <NestedList
                title="Products"
                shadow
                displayField="text"
                store={this.store}
                onLeafItemTap={this.onLeafItemTap}
            />
        )
    }
    
    store = Ext.create('Ext.data.TreeStore', { 
        root 
    });

    onLeafItemTap = (nestedList, list, index, target, record) => {
        Ext.toast(`You selected ${record.get('text')}`)
    }
    
}