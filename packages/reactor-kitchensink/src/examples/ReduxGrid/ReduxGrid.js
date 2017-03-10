import React, { Component } from 'react';
import { Grid, Toolbar, Container, Button } from '@extjs/reactor/modern';
import model from './model';
import './data';

Ext.require(['Ext.grid.plugin.*']);

export default class GridExample extends Component {

    store = Ext.create('Ext.data.Store', {
        model,
        autoLoad: true,
        groupField: 'department',
        pageSize: 0,
        proxy: {
            type: 'ajax',
            url: '/KitchenSink/BigData'
        }            
    })

    render() {
        return (
            <Container layout="fit">
                <Grid
                    ref="grid"
                    store={this.store}
                    shadow
                    grouped
                    plugins={[
                        { type: 'gridviewoptions' },
                        { type: 'pagingtoolbar' },
                        { type: 'columnresizing' }
                    ]}
                    columns={[
                        { 
                            xtype: 'rownumberer' 
                        }, {
                            text: 'Id',
                            dataIndex: 'employeeNo',
                            width: 150
                        }, {
                            text: 'Name',
                            dataIndex: 'fullName',
                            styleHtmlContent: true,
                            width: 150
                        }, {
                            text: 'Email',
                            dataIndex: 'email',
                            flex: 1
                        }]}
                />
            </Container>
        )
    }
}