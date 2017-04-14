import React, { Component } from 'react';
import { Grid, Column } from '@extjs/ext-react';
import model from './BasicGridModel';

export default class BasicGridExample extends Component {

    store = Ext.create('Ext.data.Store', {
        model,
        autoLoad: true,
        pageSize: 0,
        proxy: {
            type: 'ajax',
            url: 'resources/data/CompanyData.json'
        } 
    });

    signTpl = (field, format, data) => { 
        const value = data[field];
        const text = Ext.util.Format.number(value, format)

        if (Math.abs(value) <= 0.1) {
            return <span>{text}</span>
        } else if (value < 0) {
            return <span style={{color: 'red'}}>{text}</span>
        } else {
            return <span style={{color: 'green'}}>{text}</span>
        }
    }

    render() {
        return (
            <Grid title="Stock Prices" store={this.store} shadow grouped>
                <Column text="Company" dataIndex="name" width="150"/>
                <Column text="Price" width="85" dataIndex="price" formatter='usMoney'/>
                <Column text="Change" width="100" dataIndex="priceChange" tpl={this.signTpl.bind(this, 'priceChange', '0.00')} cell={{ encodeHtml: false }}/>
                <Column text="% Change" dataIndex="priceChangePct" tpl={this.signTpl.bind(this, 'priceChangePct', '0.00%')} cell={{ encodeHtml: false }}/>
                <Column text="Last Updated" width="125" dataIndex="lastChange" formatter='date("m/d/Y")'/>
            </Grid>
        )
    }

}