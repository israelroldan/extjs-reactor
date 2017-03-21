import React, { Component } from 'react';
import { Grid, Container } from '@extjs/reactor/modern';
import model from './BasicGridModel';
import './BasicGridData';


export default class BasicGridExample extends Component {
    constructor(){
        super();
    }

    store = Ext.create('Ext.data.Store',{
        autoLoad: true,
        model,
        pageSize: 0,
        proxy: {
            type: 'ajax',
            url: '/KitchenSink/Company'
        } 
    });

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
    }
    
    renderChange = (value) => {
        return this.renderSign(value, '0.00');
    }

    renderPercent = (value) => {
        return this.renderSign(value, '0.00%');
    }
    render(){

        return(
                <Grid title='Grid panel'
                    height={400}
                    width={600}
                    store={this.store}
                    shadow 
                    grouped
                    columns={[{
                        text: 'Company',
                        flex: 1,
                        dataIndex: 'name'
                    }, {
                        text: 'Price',
                        width: 75,
                        dataIndex: 'price',
                        formatter: 'usMoney'
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
                        formatter: 'date("m/d/Y")'
                    }]}

                />
        )
    }
}