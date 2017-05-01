import React, { Component } from 'react';
import { List } from '@extjs/ext-react';
import { Template } from '@extjs/reactor';

Ext.require('Ext.Toast');

export default class BasicListExample extends Component {

    store = Ext.create('Ext.data.Store', { 
        proxy: {
            type: 'rest',
            url: 'resources/data/people.json'
        },
        sorters: ['last_name', 'first_name']
    })

    tpl = data => <div>{data.first_name} {data.last_name}</div>

    onSelect = (list, record) => {
        Ext.toast(`You selected ${record.get('first_name')} ${record.get('last_name')}.`)
    }
    
    componentDidMount() {
        setTimeout(() => this.store.load(), 350);
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