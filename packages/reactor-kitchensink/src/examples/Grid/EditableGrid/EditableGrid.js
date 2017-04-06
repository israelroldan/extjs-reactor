import React, { Component } from 'react';
import { Grid, Container } from '@extjs/reactor/modern';
import model from './GridModel';
import '../CompanyData';

Ext.require(['Ext.grid.plugin.Editable']);

export default class EditableGridExample extends Component {
    
    store = Ext.create('Ext.data.Store', {
        autoLoad: true,
        model,
        pageSize: 0,
        proxy: {
            type: 'ajax',
            url: '/KitchenSink/Company'
        } 
    });

    renderSign = (value, format) => {
        let text = Ext.util.Format.number(value, format),
            tpl = this.signTpl,
            data;

        if (Math.abs(value) > 0.1) {
            if (!tpl) {
                this.signTpl = tpl = this.getView().lookupTpl('signTpl');
            }
            text = tpl.apply({
                text: text,
                value: value
            });
        }

        return text;
    }
    
    renderChange = (value) => {
        return this.renderSign(value, '0.00');
    }

    renderPercent = (value) => {
        return this.renderSign(value, '0.00%');
    }

    render() {
        return(
            <Grid 
                title='Stock Prices'
                shadow 
                store={this.store}
                plugins={'grideditable'}
                columns={[{
                    text: 'Company',
                    flex: 1,
                    dataIndex: 'name',
                    editable: true
                }, {
                    text: 'Price',
                    width: 75,
                    dataIndex: 'price',
                    formatter: 'usMoney',
                    editable: true,
                    editor: {
                        xtype: 'numberfield',
                        required: true,
                        validators: {
                            type: 'number',
                            message: 'Invalid price'
                        }
                    }
                }, {
                    text: 'Change',
                    width: 90,
                    renderer: this.renderChange,
                    dataIndex: 'change',
                    cell: {
                        encodeHtml: false
                    }
                }, {
                    text: '% Change',
                    width: 100,
                    dataIndex: 'pctChange',
                    renderer: this.renderPercent,
                    cell: {
                        encodeHtml: false
                    }
                }, {
                    text: 'Last Updated',
                    width: 125,
                    dataIndex: 'lastChange',
                    formatter: 'date("m/d/Y")',
                    editable: true,
                    editor: {
                        xtype: 'datepickerfield',
                        required: true,
                        validators: {
                            type: 'date',
                            message: 'Invalid date'
                        }
                    }
                }]}
            />
        )
    }
}