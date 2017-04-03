import React, {Component} from 'react';
import {Grid} from '@extjs/reactor/modern';
import { Template } from '@extjs/reactor';
import '../../CompanyData';
import model from './GridModel';

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
    tpl = new Template( data => <div>
                                    <div>Industry: {data.industry}</div>
                                    <div>Last Updated: {formatDate(data.lastChange)}</div>
                                    <div style={{marginTop:'1em'}}>{data.desc}</div>
                                </div>);

    signTpl = new Template( data => <span style={{color:'red'}}>{data.text}</span>)
    
    render(){
        return(
            <Grid
                title="Row Body Grid"
                height={400}
                width={600}
                store={this.store}
                columns={
                    [{
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

function formatDate(date){
    return Ext.util.Format.date(date, "Y-m-d g:ia")
}