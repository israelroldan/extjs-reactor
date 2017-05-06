import React, { Component } from 'react';
import { Grid, Column, Toolbar, NumberField, DatePickerField } from '@extjs/ext-react';
import model from '../CompanyModel';
import { Template } from '@extjs/reactor';

Ext.require([
    'Ext.grid.plugin.Editable',
    'Ext.grid.plugin.CellEditing'
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
                    <div style={{color: '#666', fontSize: '13px' }}>Double-{Ext.os.is.Desktop ? 'click' : 'tap'} a {Ext.os.is.Desktop ? 'cell' : 'row'} to edit</div>
                </Toolbar>
                <Column 
                    text="Company" 
                    width="150" 
                    dataIndex="name" 
                    editable
                />
                <Column 
                    text="Price" 
                    width="75" 
                    dataIndex="price" 
                    formatter="usMoney" 
                    editable 
                >
                    <NumberField rel="editor" require validators={{type:"number", message:"Invalid price"}}/>
                </Column>
                <Column 
                    text="Change" 
                    width="90" 
                    renderer={this.renderChange} 
                    dataIndex="change" 
                    cell={{encodeHtml:false}}
                />
                <Column 
                    text="% Change" 
                    width="100" 
                    renderer={this.renderPercent} 
                    dataIndex="pctChange" 
                    cell={{encodeHtml:false}}
                />
                <Column 
                    text="Last Updated" 
                    width="125" 
                    dataIndex="lastChange" 
                    formatter="date('m/d/Y')" 
                    editable 
                >
                    <DatePickerField required validators={{type:"date", message:"Invalid date"}}/>
                </Column>
            </Grid>
        )
    }

    createSignTpl = format => new Template(value => (
        <span style={{ color: value > 0 ? 'green' : value < 0 ? 'red' : ''}}>
            {Ext.util.Format.number(value, format)}
        </span>
    ));

    changeTpl = this.createSignTpl('0.00');
    percentTpl = this.createSignTpl('0.00%');
    renderChange = (value) => this.changeTpl.apply(value);
    renderPercent = (value) => this.percentTpl.apply(value);
}