import React, {Component} from 'react';
import {Grid} from '@extjs/reactor/modern';
import { Template } from '@extjs/reactor';
import '../../CompanyData';
import model from './GridModel';

Ext.require(['Ext.grid.plugin.SummaryRow']);

export default class RowBodyGridExample extends Component{

    store = Ext.create('Ext.data.Store',{
        autoLoad: true,
        model,
        pageSize: 0,
        proxy: {
            type: 'ajax',
            url: '/KitchenSink/Company'
        } 
    });

    renderChange = (value) => {
        return this.renderSign(value, '0.00');
    };

    renderPercent = (value) => {
        return this.renderSign(value, '0.00%');
    };

    renderSign = (value, format) => {
        var text = Ext.util.Format.number(value, format),
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
    };

    //TODO
    signTpl = new Template( data => <span style={{color:'red'}}>{data.text}</span>)
    
    render(){
        return(
            <Grid
                title="Summary Row Grid"
                height={400}
                width={600}
                store={this.store}
                plugins="gridsummaryrow"
                columns={
                    [{
                        text: 'Company',
                        flex: 1,
                        dataIndex: 'name'
                    }, {
                        text: 'Price',
                        width: 75,
                        dataIndex: 'price',
                        formatter: 'usMoney',
                        summaryFormatter: 'usMoney',
                        summaryType: 'average'
                    }, {
                        text: 'Change',
                        width: 90,
                        renderer: this.renderChange,
                        dataIndex: 'change',  
                        summaryType: 'max',                      
                        cell: {
                            encodeHtml: false
                        }
                    }, {
                        text: '% Change',
                        width: 100,
                        dataIndex: 'pctChange',
                        summaryFormatter: 'round(2)',
                        summaryType: 'average',
                        renderer: this.renderPercent,
                        cell: {
                            encodeHtml: false
                        }
                    }, {
                        text: 'Last Updated',
                        width: 125,
                        dataIndex: 'lastChange',
                        formatter: 'date("m/d/Y")',
                        summaryFormatter: 'date("m/d/Y")',
                        summaryType: 'max'
                    }]
                }
                itemConfig={{
                    body:{
                        tpl: this.tpl
                    }
                }}
                signTpl={this.signTpl}
            />
        )
    }
}