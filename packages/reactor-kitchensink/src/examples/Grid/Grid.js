import React, { Component } from 'react';
import { Grid } from '@extjs/reactor/modern';
import data from './data';

Ext.require('Ext.grid.plugin.*')

export default class GridExample extends Component {

    constructor() {
        super();

        const model = Ext.define('MyGridModel', {
            extend: 'Ext.data.Model',
            fields: [{
                name: 'id'
            }, {
                name: 'first_name'
            }, {
                name: 'last_name'
            }, {
                name: 'email'
            }, {
                name: 'gender'
            }, {
                name: 'ip_address'
            }, {
                name: 'full_name',
                calculate: ({ first_name, last_name }) => `${first_name} ${last_name}`
            }]
        })

        this.store = Ext.create('Ext.data.Store', {
            data,
            model
        });
    }

    render() {
        return (
            <Grid
                title="Grid" 
                store={this.store}
                shadow={true} 
                plugins={[
                    { type: 'columnresizing'}
                ]}
                columns={[
                    { text: 'ID', dataIndex: 'id', width: 80, },
                    { text: 'First Name', dataIndex: 'first_name', width: 125 },
                    { text: 'Last Name', dataIndex: 'last_name', width: 125 },
                    { text: 'Full Name', dataIndex: 'full_name', width: 150 },
                    { text: 'Email', dataIndex: 'email', width: 300 },
                    { text: 'Gender', dataIndex: 'gender', width: 100 },
                    { text: 'IP Address', dataIndex: 'ip_address', width: 200 },
                ]}
            />
        )
    }
}