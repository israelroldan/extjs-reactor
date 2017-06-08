import React, { Component } from 'react';
import { Grid, Column, RendererCell } from '@extjs/ext-react';
import ActionsCell from './ActionsCell';

export default class RendererCellExample extends Component {
    
    store = Ext.create('Ext.data.Store', {
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
                <Column text="Change" width="100" dataIndex="priceChange" renderer={this.renderNumberCell.bind(this, '0.00')}/>
                <Column text="% Change" dataIndex="priceChangePct" renderer={this.renderNumberCell.bind(this, '0.00%')}/>
                <Column text="Actions" flex={1} minWidth={210}>
                    <RendererCell renderer={this.renderActionsCell} bodyStyle={{ padding: '0 10px'}}/>
                </Column>
            </Grid>
        )
    }

    renderActionsCell = (value, record) => {
        return (
            <ActionsCell 
                buyHandler={this.buyHandler.bind(this, record)} 
                sellHandler={this.sellHandler.bind(this, record)} 
                watchHandler={this.watchHandler.bind(this, record)} 
            />
        )
    }

    renderNumberCell(format, value) {
        return (
            <span style={{ color: value > 0 ? 'green' : value < 0 ? 'red' : ''}}>
                {Ext.util.Format.number(value, format)}
            </span>
        )
    }

    buyHandler = (record) => Ext.toast(`Buy ${record.get('name')}`)
    sellHandler = (record) => Ext.toast(`Sell ${record.get('name')}`)
    watchHandler = (record) => Ext.toast(`Watch ${record.get('name')}`)

}

