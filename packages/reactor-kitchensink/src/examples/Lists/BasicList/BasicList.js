import React, { Component } from 'react';
import { List } from '@extjs/reactor/modern';
import { Template } from '@extjs/reactor';
import data from '../people';
import ReactDOM from 'react-dom';

Ext.require('Ext.Toast');

export default class BasicListExample extends Component {

    store = Ext.create('Ext.data.Store', { 
        data,
        sorters: ['last_name', 'first_name']
    });

    tpl = new Template(data => <div>{data.first_name} {data.last_name}</div>);

    onSelect = (list, record) => {
        Ext.toast(`You selected ${record.get('first_name')} ${record.get('last_name')}.`)
    }

    render() {
        return (
            <List
                shadow
                itemTpl={this.tpl}
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