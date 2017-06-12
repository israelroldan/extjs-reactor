import React, { Component } from 'react';
import { Panel, Button, Grid, Column } from '@extjs/ext-react';

Ext.require([
    'Ext.grid.plugin.CellEditing',
    'Ext.grid.plugin.RowExpander'
]);

export default class MyComponent extends Component {

    store = new Ext.data.Store({
        fields: ['id', 'name']
    });

    buttonHandler = () => {
        console.log('clicked')
    }

    render() {
        return (
            <Panel title="Panel Header">
                <Grid store={this.store} flex={1} plugins={['cellediting', 'rowexpander']}>
                    <Column dataIndex="id" text="ID"/>
                    <Column dataIndex="name" text="Name"/>
                </Grid>
                <Button text="Button" handler={this.buttonHandler}/>
            </Panel>
        )
    }
    
}