import React, { Component } from 'react';
import { Container, PivotGrid, Toolbar, Button, Menu, MenuRadioItem } from '@extjs/reactor/modern';
import { generateData, randomDate } from '../generateSaleData';
import SaleModel from '../SaleModel';

// TODO - Menu is not working in this example.
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

    reconfigureMatrix = (btn, checked) => {
        if(!checked) return;

        this.refs.pivotgrid.reconfigurePivot(btn.cfg);
    }

    monthLabelRenderer = value => Ext.Date.monthNames[value]

    render() {
        return (
            <Container layout="fit" height={400} width={400}>
                <PivotGrid
                    shadow
                    ref="pivotgrid"
                    matrix={{
                        type: 'local',
                        // set to "false" to make groups on rows uncollapsible
                        collapsibleRows: false,
                        // set to "none" to disable subtotals for groups on rows
                        rowSubTotalsPosition: 'none',
                        // set to "false" to make groups on columns uncollapsible
                        collapsibleColumns: false,
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
                                handler: this.reconfigureMatrix,
                                xtype: 'menuradioitem'
                            }}
                            items={[{
                                checked: true,
                                text: 'None',
                                cfg: {
                                    collapsibleRows: false,
                                    collapsibleColumns: false
                                }
                            }, {
                                text: 'Rows only',
                                cfg: {
                                    collapsibleRows: true,
                                    collapsibleColumns: false
                                }
                            }, {
                                text: 'Columns only',
                                cfg: {
                                    collapsibleRows: false,
                                    collapsibleColumns: true
                                }
                            }, {
                                text: 'Rows & Columns',
                                cfg: {
                                    collapsibleRows: true,
                                    collapsibleColumns: true
                                }
                            }]}
                        />
                    </Button>
                </Toolbar>
            </Container>
        )
    }
}