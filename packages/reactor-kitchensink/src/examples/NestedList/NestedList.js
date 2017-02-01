import React, { Component } from 'react';
import { NestedList } from '@extjs/reactor/modern';
import root from './data';

Ext.require('Ext.Toast');

export default class ListExample extends Component {

    constructor() {
        super();
        this.store = Ext.create('Ext.data.TreeStore', { 
            root 
        });
    }

    render() {
        return (
            <NestedList
                title="Products"
                shadow={true}
                displayField="text"
                store={this.store}
                onLeafItemTap={(nestedList, list, index, target, record) => Ext.toast(`You selected ${record.get('text')}`)}
            />
        )
    }
    
}