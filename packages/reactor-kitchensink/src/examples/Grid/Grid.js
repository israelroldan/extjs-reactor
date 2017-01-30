import React from 'react';
import { Grid } from '@extjs/reactor/modern';
import data from './data';

Ext.require('Ext.grid.plugin.*')

export default function GridExample() {
    const store = Ext.create('Ext.data.Store', {
        data
    });

    return (
        <Grid
            plugins={[
                { type: 'columnresizing'}
            ]}
            columns={[
                { text: 'ID', dataIndex: 'id', width: 80, },
                { text: 'First Name', dataIndex: 'first_name', width: 125 },
                { text: 'Last Name', dataIndex: 'last_name', width: 125 },
                { text: 'Email', dataIndex: 'email', width: 300 },
                { text: 'Gender', dataIndex: 'gender', width: 100 },
                { text: 'IP Address', dataIndex: 'ip_address', width: 200 },
            ]}
            store={store}
            shadow={true} 
            title="Grid" 
        />
    )
}