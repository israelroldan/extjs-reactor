import React, { Component } from 'react';
import { List } from '@extjs/reactor/modern';
import data from '../BasicList/data';

Ext.require([
    'Ext.Toast'
]);

export default class GroupedListExample extends Component {

    store = Ext.create('Ext.data.Store', { 
        data,
        sorters: ['last_name', 'first_name'],
        grouper: {
            groupFn: record => record.get('last_name')[0]
        }
    });

    render() {
        return (
            <List
                shadow
                itemTpl="{first_name} {last_name}"
                indexBar
                grouped
                pinHeaders
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