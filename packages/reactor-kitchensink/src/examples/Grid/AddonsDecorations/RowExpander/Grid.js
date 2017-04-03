import React, {Component} from 'react';
import {Grid} from '@extjs/reactor/modern';
import { Template } from '@extjs/reactor';
import '../../CompanyData';
import model from './GridModel';

Ext.require(['Ext.grid.plugin.RowExpander'])
export default class RowExpanderGridExample extends Component {

    store = Ext.create('Ext.data.Store', {
        autoLoad: true,
        pageSize: null,
        model,
        proxy: {
            type: 'ajax',
            url: '/KitchenSink/Company',
            reader: {
                type: 'json',
                rootProperty: 'data',
                implicitIncludes: false
            }
        }
    })

    renderChange = (value) => {
        return this.renderSign(value, '0.00');
    };

    renderPercent = (value) => {
        return this.renderSign(value, '0.00%');
    };

    renderSign = (value, format) => {
        var text = Ext.util.Format.number(value, format),
             tpl;
 
         if (Math.abs(value) > 0.1) {
             if (value > 0) {
                 tpl = new Template(data => <span style={{color:'green'}}> {data.text} </span>);
             } else if (value < 0) {
                 tpl = new Template(data => <span style={{color:'red'}}> {data.text} </span>);
             }
             text = tpl.apply({
                 text: text,
                 value: value
             });
         }
         return text;
    };

    tpl = new Template( data => <div>
                                    <div>Industry: {data.industry}</div>
                                    <div>Last Updated: {formatDate(data.lastChange)}</div>
                                    <div style={{marginTop:'1em'}}>{data.desc}</div>
                                </div>);
    
    render(){
        return(
            <Grid 
                title="Row Expander Grid"
                height={400}
                width={600}
                store={this.store}
                plugins="rowexpander"
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
                        dataIndex: 'priceChange',                        
                        cell: {
                            encodeHtml: false
                        }
                    }, {
                        text: '% Change',
                        width: 100,
                        dataIndex: 'priceChangePct',
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
            />
        )
    }
}