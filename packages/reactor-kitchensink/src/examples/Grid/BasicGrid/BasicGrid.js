import React, { Component } from 'react';
import { Grid, Column } from '@extjs/ext-react';
import model from '../CompanyModel';

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

    signTpl = (field, format, data) => {
        const value = data[field];

        return (
            <span style={{ color: value > 0 ? 'green' : value < 0 ? 'red' : ''}}>
                {Ext.util.Format.number(value, format)}
            </span>
        )
    }

}