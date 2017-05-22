import React, { Component } from 'react';
import { Container, PivotGrid, Toolbar, Button, Menu, MenuRadioItem } from '@extjs/reactor/modern';
import { generateData, randomDate } from '../generateSaleData';
import SaleModel from '../SaleModel';

// TODO - EXTJS-25191 MenuRadioItem in ExtReact throws error when it tries to reference getParent()
// use items array in Menu to avoid this issue for now.
export default class Collapsible extends Component {
    
    constructor() {
        super();

        this.loadData();
    }

    store = Ext.create('Ext.data.Store', {
        model: SaleModel
    })

    loadData = () => {
        const data = generateData(20);

        for(let i=0; i<data.length; i++) {
            data[i].company = 'Dell';
            data[i].date = randomDate(new Date(2016, 0, 1), new Date(2016, 0, 31));
        }

        this.store.loadData(data);
    }

    monthLabelRenderer = value => Ext.Date.monthNames[value]

    state = {
        collapsibleRows: false,
        collapsibleColumns: false
    }

    render() {
        const { collapsibleRows, collapsibleColumns } = this.state;
        return (
            <Container layout="fit" padding={10}>
                <PivotGrid
                    shadow
                    ref="pivotgrid"
                    matrix={{
                        type: 'local',
                        // set to "false" to make groups on rows uncollapsible
                        collapsibleRows,
                        // set to "none" to disable subtotals for groups on rows
                        rowSubTotalsPosition: 'none',
                        // set to "false" to make groups on columns uncollapsible
                        collapsibleColumns,
                        // set to "none" to disable subtotals for groups on columns
                        colSubTotalsPosition: 'none',
                        // Set layout type to "tabular". If this config is missing then the
                        // default layout is "outline"
                        viewLayoutType: 'tabular',
                        store: this.store,
                        // Configure the aggregate dimensions. Multiple dimensions are
                        // supported.
                        aggregate: [{
                            dataIndex: 'value',
                            header: 'Total',
                            aggregator: 'sum',
                            width: 90
                        }],
                        // Configure the left axis dimensions that will be used to generate the
                        // grid rows
                        leftAxis: [{
                            dataIndex: 'person',
                            header: 'Person'
                        }, {
                            dataIndex: 'company',
                            header: 'Company'
                        }, {
                            dataIndex: 'year',
                            header: 'Year'
                        }],
                        // Configure the top axis dimensions that will be used to generate the
                        // grid columns
                        topAxis: [{
                            dataIndex: 'country',
                            header: 'Country'
                        }, {
                            dataIndex: 'month',
                            labelRenderer: this.monthLabelRenderer,
                            header: 'Month'
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
                    <Button text="Collapsible">
                        <Menu 
                            defaults={{ 
                                group: 'collapsible', 
                                xtype: 'menuradioitem'
                            }}
                            items={[{
                                text: 'None',
                                checked: (!collapsibleColumns && !collapsibleRows),
                                handler: () => { this.setState({ collapsibleColumns: false, collapsibleRows: false })}
                            }, {
                                text: 'Rows only',
                                checked: (collapsibleRows && !collapsibleColumns),
                                handler: () => { this.setState({ collapsibleColumns: false, collapsibleRows: true })}
                            }, {
                                text: 'Columns only',
                                checked: (collapsibleColumns && !collapsibleRows),
                                handler: () => { this.setState({ collapsibleColumns: true, collapsibleRows: false })}
                            }, {
                                text: 'Rows & Columns',
                                checked: (collapsibleColumns && collapsibleRows),
                                handler: () => { this.setState({ collapsibleColumns: true, collapsibleRows: true })}
                            }]}
                        />
                    </Button>
                </Toolbar>
            </Container>
        )
    }
}