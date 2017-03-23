import React, { Component } from 'react';
import { List } from '@extjs/reactor/modern';
import data from '../people';
import { Template } from '@extjs/reactor';

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

    tpl = new Template(data => <div>{data.first_name} {data.last_name}</div>);

    onSelect = (list, record) => {
        Ext.toast(`You selected ${record.get('first_name')} ${record.get('last_name')}.`)
    }

    render() {
        return (
            <List
                shadow
                itemTpl="{first_name} {last_name}"
                indexBar
                grouped
                pinHeaders
                store={this.store}
                onSelect={this.onSelect}
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