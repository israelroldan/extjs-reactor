import React, { Component } from 'react';
import { Grid, Column, Toolbar } from '@extjs/ext-react';
import model from './GridModel';

Ext.require(['Ext.grid.plugin.Editable']);

export default class RowEditing extends Component {
    
    store = Ext.create('Ext.data.Store', {
        autoLoad: true,
        model,
        pageSize: 0,
        proxy: {
            type: 'ajax',
            url: 'resources/data/CompanyData.json'
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
            >
                <Toolbar docked="top">
                    <div style={{color: '#666', fontWeight: 100, fontSize: '13px' }}>Double-{Ext.os.is.Desktop ? 'click' : 'tap'} a row to edit</div>
                </Toolbar>
                <Column text="Company" flex="1" dataIndex="name" editable={true}/>
                <Column text="Price" width="75" dataIndex="price" formatter="usMoney" editable={true} editor={{xtype:'numberfield', required:true, validators:{type:"number", message:"Invalid price"}}}/>
                <Column text="Change" width="90" renderer={this.renderChange} dataIndex="change" cell={{encodeHtml:false}}/>
                <Column text="% Change" width="100" renderer={this.renderPercent} dataIndex="pctChange" cell={{encodeHtml:false}}/>
                <Column text="Last Updated" width="125" dataIndex="lastChange" formatter="date('m/d/Y')" editable={true} editor={{xtype:'datepickerfield', required:true, validators:{type:"date", message:"Invalid date"}}}/>
            </Grid>
        )
    }
}