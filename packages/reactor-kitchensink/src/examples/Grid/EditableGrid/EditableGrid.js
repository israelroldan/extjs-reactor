import React, { Component } from 'react';
import { Grid, Column, Toolbar, NumberField, DatePickerField, RendererCell } from '@extjs/ext-react';
import model from '../CompanyModel';
import { Template } from '@extjs/reactor';

Ext.require([
    'Ext.grid.plugin.Editable',
    'Ext.grid.plugin.CellEditing',
    'Ext.data.validator.Presence',
    'Ext.data.validator.Number',
    'Ext.data.validator.Date'
]);

export default class EditableGrid extends Component {
    
    store = Ext.create('Ext.data.Store', {
        autoLoad: true,
        model,
        pageSize: 0,
        proxy: {
            type: 'ajax',
            url: 'resources/data/CompanyData.json'
        } 
    });

    render() {
        return (
            <Grid 
                title='Stock Prices'
                shadow 
                store={this.store}
                platformConfig={{
                    desktop: {
                        plugins: {
                            gridcellediting: true
                        }
                    },
                    '!desktop': {
                        plugins: {
                            grideditable: true
                        }
                    }
                }}
            >
                <Toolbar docked="top">
                    <div style={{color: '#666', fontSize: '13px' }}>Double-{Ext.os.is.Desktop ? 'click' : 'tap'} a {Ext.os.is.Desktop ? 'company or price' : 'row'} to edit</div>
                </Toolbar>
                <Column 
                    text="Company" 
                    width="150" 
                    dataIndex="name" 
                    editable
                />
                <Column 
                    text="Price" 
                    width="120" 
                    dataIndex="price" 
                    formatter="usMoney" 
                    editable 
                >
                    <NumberField required validators={{type:"number", message:"Invalid price"}}/>
                </Column>
                <Column 
                    text="Change" 
                    width="90" 
                    renderer={this.renderSign.bind(this, '0.00')}
                    dataIndex="change" 
                />
                <Column 
                    text="% Change" 
                    width="100" 
                    renderer={this.renderSign.bind(this, '0.00')}
                    dataIndex="pctChange" 
                />
                <Column 
                    text="Last Updated" 
                    width="125" 
                    dataIndex="lastChange" 
                    formatter="date('m/d/Y')" 
                     
                />
            </Grid>
        )
    }

    createSignTpl = format => new Template(value => (
        <span style={{ color: value > 0 ? 'green' : value < 0 ? 'red' : ''}}>
            {Ext.util.Format.number(value, format)}
        </span>
    ));

    renderSign = (format, value) => (
        <span style={{ color: value > 0 ? 'green' : value < 0 ? 'red' : ''}}>
            {Ext.util.Format.number(value, format)}
        </span>
    )
}