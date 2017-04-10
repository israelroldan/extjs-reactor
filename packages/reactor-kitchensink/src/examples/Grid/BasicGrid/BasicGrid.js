import React, { Component } from 'react';
import { Grid, Column } from '@extjs/reactor/modern';
import model from './BasicGridModel';

export default class BasicGridExample extends Component {

    store = Ext.create('Ext.data.Store', {
        autoLoad: true,
        model,
        pageSize: 0,
        proxy: {
            type: 'ajax',
            url: '/data/CompanyData.json'
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

    render() {
        return (
            <Grid title="Stock Prices" store={this.store} shadow grouped>
                <Column text="Company" dataIndex="name" width="150"/>
                <Column text="Price" width="75" dataIndex="price" formatter='usMoney'/>
                <Column text="Change" width="90" renderer={this.renderChange} dataIndex="change" cell={{ encodeHtml: false }}/>
                <Column text="% Change" dataIndex="pctChange" renderer={this.renderPercent} cell={{ encodeHtml: false }}/>
                <Column text="Last Updated" width="125" dataIndex="lastChange" formatter='date("m/d/Y")'/>
            </Grid>
        )
    }
}