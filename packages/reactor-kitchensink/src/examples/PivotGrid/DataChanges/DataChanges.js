import React, { Component } from 'react';
import { Container, PivotGrid, Toolbar, Button, Menu, MenuItem } from '@extjs/reactor/modern';
import SaleModel from '../SaleModel';
import { generateData, randomItem } from '../generateSaleData';

export default class DataChanges extends Component {

    store = Ext.create('Ext.data.Store', {
        autoLoad: true,
        autoDestroy: true,
        model: SaleModel,
        proxy: { type: 'memory' }
    })

    addData = () => { 
        this.store.add(generateData(1)); 
    }

    updateData = () => { 
        const data = generateData(1)[0],
            record = randomItem(this.store.data.items);

        if(record) {
            record.set(data);
        }
    }

    removeData = () => {
        const record = randomItem(this.store.data.items);

        if(record) {
            this.store.remove(record);
        }
    }

    clearData = () => { this.store.removeAll(); }

    render() {
        return (
            <Container layout="fit" padding={10}>
                <PivotGrid
                    shadow
                    matrix={{
                        type: 'local',
                        store: this.store,
                        // Configure the aggregate dimensions. Multiple dimensions are supported.
                        aggregate: [{
                            dataIndex: 'value',
                            header: 'Total',
                            aggregator: 'sum'
                        }, {
                            dataIndex: 'value',
                            header: 'Count',
                            aggregator: 'count'
                        }],
                        // Configure the left axis dimensions that will be used to generate the
                        // grid rows
                        leftAxis: [{
                            dataIndex: 'year',
                            header: 'Year'
                        }, {
                            dataIndex: 'person',
                            header: 'Person'
                        }],
                        /**
                        * Configure the top axis dimensions that will be used to generate
                        * the columns.
                        *
                        * When columns are generated the aggregate dimensions are also used.
                        * If multiple aggregation dimensions are defined then each top axis
                        * result will have in the end a column header with children columns
                        * for each aggregate dimension defined.
                        */
                        topAxis: [{
                            dataIndex: 'country',
                            header: 'Country'
                        }]
                    }}
                />
                <Toolbar
                    shadow={false}
                    docked="top"
                    ui="app-transparent-toolbar"
                    padding="5 8"
                    layout={{
                        type: 'hbox',
                        align: 'stretch'
                    }}
                    defaults={{
                        margin: '0 10 0 0',
                        shadow: true,
                        ui: 'action'
                    }}
                >
                    <Button text="Change data">
                        <Menu>
                            <MenuItem text="Add" iconCls="x-fa fa-plus" handler={this.addData}/>
                            <MenuItem text="Update" iconCls="x-fa fa-edit" handler={this.updateData}/>
                            <MenuItem text="Remove" iconCls="x-fa fa-minus" handler={this.removeData}/>
                            <MenuItem text="Clear all" iconCls="x-fa fa-trash" handler={this.clearData}/>
                        </Menu>
                    </Button>
                </Toolbar>
            </Container>
        )
    }
}