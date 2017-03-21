import React, { Component } from 'react';
import { List } from '@extjs/reactor/modern';
import data from './data';

Ext.require([
    'Ext.Toast'
]);

export default class BasicListExample extends Component {

    store = Ext.create('Ext.data.Store', { 
        data,
        sorters: ['last_name', 'first_name']
    });

    render() {
        return (
            <List
                shadow
                itemTpl="{first_name} {last_name}"
                store={this.store}
                onSelect={(list, record) => {
                    Ext.toast(`You selected ${record.get('first_name')} ${record.get('last_name')}.`)
                }}
                platformConfig={{
                    '!phone': {
                        height: 450,
                        width: 300
                    }
                }}
            />
        )
    }

}