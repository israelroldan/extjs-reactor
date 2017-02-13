import React, {Component} from 'react';
import { Container, PivotGrid, Button, Toolbar} from '@extjs/reactor/modern';
import model from './model';
import data from './data';

Ext.require('Ext.pivot.*');

export default class PivotGridExample extends Component{
    constructor(){
        super();
        this.store = Ext.create('Ext.data.Store',{
            model:model,
            proxy: {
                type: 'ajax',
                limitParam: null,
                url: 'data',
                reader: {
                    type: 'json'
                }
    },
    autoLoad: true
        })
    }

    showConfigurator(){
        this.refs.mypivotgrid.showConfigurator();
    }

    coloredRenderer(v, record, dataIndex, cell, column){
        cell.setStyle( Ext.String.format('color: {0};', v > 500 ? 'green' : 'red') );
        return Ext.util.Format.number(v, '0,000.00');
    }
    expandAll(){
        this.refs.mypivotgrid.expandAll();
    }

    collapseAll(){
        this.refs.mypivotgrid.collapseAll();
    }
    testObject(){
        if(typeof this.refs.mypivotgrid!=='undefined')
        {
            console.log(this.refs.mypivotgrid.getTopAxisCellConfig());
            console.log('changing color to green...');
            this.refs.mypivotgrid.setTopAxisCellConfig({userCls:'pivotCellAbove500'})
        }
        /* var isGrandTotal = get('record.isRowGrandTotal') || get('column.isColGrandTotal'),
                isHeader = get('record.isRowGroupHeader') || get('column.isColGroupTotal'),
                isFooter = get('record.isRowGroupTotal'),
                value = get('value'),
                cls = get('column.topAxisColumn') ? (value >= 500 ? 'pivotCellAbove500' : 'pivotCellUnder500') : '';

            if(isGrandTotal){
                cls = 'pivotCellGrandTotal';
            }else if(isFooter){
                cls = 'pivotCellGroupFooter';
            }else if(isHeader){
                cls = 'pivotCellGroupHeader';
            }

            return cls;
        }*/
            
    }

    render(){
        var yearLabelRenderer = function(value){
            return 'Year ' + value;
        }
        var monthLabelRenderer = function(value){
            return Ext.Date.monthNames[value];
        }
        var test=function(){
            console.log('test1');
            console.log("test2");
            /*var pivot = this.refs.mypivotgrid;
            console.log(pivot);*/
        }
        return(
            <Container layout="fit">
                <PivotGrid ref="mypivotgrid" id="mypivotgrid"
                   plugins={[
                       {
                            type:'pivotdrilldown'
                       },
                       {
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
                            },{
                            dataIndex:  'value',
                            header:     'Value',
                            settings: {
                                allowed: 'aggregate',
                                aggregators: ['sum', 'avg', 'count'],
                                style: {
                                    fontWeight: 'bold'
                                },
                                renderers: {
                                    'Colored 0,000.00': 'coloredRenderer'
                                },
                                formatters: {
                                    '0': 'number("0")',
                                    '0.00': 'number("0.00")',
                                    '0,000.00': 'number("0,000.00")',
                                    '0%': 'number("0%")',
                                    '0.00%': 'number("0.00%")'
                                }
                            }
                        },{
                            dataIndex:  'company',
                            header:     'Company',
                            settings: {
                                aggregators: ['count']
                            }
                        },{
                            dataIndex:  'country',
                            header:     'Country',
                            settings: {
                                aggregators: ['count']
                            }
                        },{
                            dataIndex: 'person',
                            header: 'Person',
                            settings: {
                                aggregators: 'count'
                            }
                        },{
                            dataIndex:  'year',
                            header:     'Year',
                            settings: {
                                fixed: ['topAxis']
                            }
                        },{
                            dataIndex:      'month',
                            header:         'Month',
                            labelRenderer:  'monthLabelRenderer',
                            settings: {
                                aggregators: ['count'],
                                allowed: ['leftAxis', 'topAxis']
                            }
                        }]
                        }
                    ]}
                    matrix={{
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
                            labelRenderer: yearLabelRenderer
                        }]
                    }}
                    listeners={
                        {
                            afterrender:() => console.log('After render event invoked')//Doesn't work
                        }
                    }
                    topAxisCellConfig={
                        {userCls:'pivotCellUnder500'}
                    }
                    /*onShow={
                        this.testObject()
                    }*/
                    >
                    <Toolbar 
                        docked={'top'}>
                        <Button text={'Show configurator'}
                            handler={this.showConfigurator.bind(this)}/>
                        <Button text={'Expand all'}
                            handler={this.expandAll.bind(this)}/>
                        <Button text={'Collapse all'}
                            handler={this.collapseAll.bind(this)}/>
                    </Toolbar>
                </PivotGrid>
            </Container>
        )
    }
}