import React, {Component} from 'react';
import { PivotGrid, Button, Toolbar} from '@extjs/ext-react';
import model from './model';
import './data';

Ext.require('Ext.pivot.*');

export default class PivotGridExample extends Component{
    constructor(){
        super();
    }

    store = Ext.create('Ext.data.Store', {
            model,
            autoLoad: true,
            proxy: {
                type: 'ajax',
                limitParam: null,
                url: '/KitchenSink/PivotData',
                reader: {
                    type: 'json'
                }
            }
        });

        pivotConfig = {
            matrix: {
                type : 'local',
                store : this.store,
                aggregate: [{
                    dataIndex: 'value',
                    header: 'Value',
                    aggregator: 'avg',
                    width: 120
                }],
                leftAxis:[{
                    dataIndex: 'person',
                    header: 'Person',
                    width:120
                }, {
                    dataIndex: 'company',
                    header: 'Company',
                    sortable: false
                }],
                topAxis:[{
                    dataIndex: 'year',
                    header: 'Year',
                    labelRenderer: value => `Year ${value}`
                }]
            },

            topAxisCellConfig: {
                bind: {
                    userCls: '{cellStyle}'
                },
                viewModel: {
                    type: 'default', 
                    formulas: {
                        cellStyle: function (get) {
                            var isGrandTotal = get('record.isRowGrandTotal') || get('column.isColGrandTotal'),
                                isHeader = get('record.isRowGroupHeader') || get('column.isColGroupTotal'),
                                isFooter = get('record.isRowGroupTotal'),
                                value = get('value'),
                                cls = get('column.topAxisColumn') ? (value >= 500 ? 'pivotCellAbove500' : 'pivotCellUnder500') : '';

                            if (isGrandTotal) {
                                cls = 'pivotCellGrandTotal';
                            } else if(isFooter) {
                                cls = 'pivotCellGroupFooter';
                            } else if(isHeader) {
                                cls = 'pivotCellGroupHeader';
                            }

                            return cls;
                        }
                    }
                }
            },

            plugins: [{
                type:'pivotdrilldown'
            }, {
                type:'pivotconfigurator',
                fields:[{
                    dataIndex: 'quantity',
                    header: 'Qty',
                    aggregator: 'min',
                    formatter: 'number("0")',
                    settings: {
                        allowed: ['aggregate'],
                        style: {
                            fontWeight: 'bold'
                        },
                        formatters: {
                            '0':'number("0")',
                            '0%': 'number("0%")'
                        }
                    }
                }, {
                    dataIndex: 'value',
                    header: 'Value',
                    settings: {
                        allowed: 'aggregate',
                        aggregators: ['sum', 'avg', 'count'],
                        style: {
                            fontWeight: 'bold'
                        },
                        renderers: {
                            'Colored 0,000.00': (v, record, dataIndex, cell, column) => {
                                cell.setStyle( Ext.String.format('color: {0};', v > 500 ? 'green' : 'red') );
                                return Ext.util.Format.number(v, '0,000.00');
                            }
                        },
                        formatters: {
                            '0': 'number("0")',
                            '0.00': 'number("0.00")',
                            '0,000.00': 'number("0,000.00")',
                            '0%': 'number("0%")',
                            '0.00%': 'number("0.00%")'
                        }
                    }
                }, {
                    dataIndex: 'company',
                    header: 'Company',
                    settings: {
                        aggregators: ['count']
                    }
                }, {
                    dataIndex: 'country',
                    header: 'Country',
                    settings: {
                        aggregators: ['count']
                    }
                }, {
                    dataIndex: 'person',
                    header: 'Person',
                    settings: {
                        aggregators: 'count'
                    }
                }, {
                    dataIndex: 'year',
                    header: 'Year',
                    labelRenderer: value => `Year ${value}`,
                    settings: {
                        fixed: ['topAxis']
                    }
                }, {
                    dataIndex: 'month',
                    header: 'Month',
                    labelRenderer: value => Ext.Date.monthNames[value],
                    settings: {
                        aggregators: ['count'],
                        allowed: ['leftAxis', 'topAxis']
                    }
                }]
            }]
        }

    render() {
        return(
            <PivotGrid ref="grid" shadow { ...this.pivotConfig }>
                <Toolbar docked="top">
                    <Button text="Show configurator" handler={() => this.refs.grid.showConfigurator()}/>
                    <Button text="Expand all" handler={() => this.refs.grid.expandAll()}/>
                    <Button text="Collapse all" handler={() => this.refs.grid.collapseAll()}/>
                </Toolbar>
            </PivotGrid>
        )
    }
}