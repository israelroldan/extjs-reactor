import React, { Component } from 'react';
import { Grid } from '@extjs/reactor/modern';

Ext.require([
    'Ext.grid.plugin.CellEditing',
    'Ext.grid.plugin.ColumnResizing',
]);

export default class CellEditingGridExample extends Component{
   
    store = Ext.create('Ext.data.Store', {
        fields:[
            // the 'name' below matches the tag name to read, except 'availDate'
            // which is mapped to the tag 'availability'
            {name: 'common', type: 'string'},
            {name: 'botanical', type: 'string'},
            {name: 'light'},
            {name: 'price', type: 'float'},
            // dates can be automatically converted by specifying dateFormat
            {name: 'availDate', mapping: 'availability', type: 'date', dateFormat: 'm/d/Y'},
            {name: 'indoor', type: 'bool'}
        ],
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: '/resources/data/Grids/plants.xml',
            reader:{
                type:'xml',
                record: 'plant',                
                rootProperty: 'catalog',
            }
        },
        sorters: [{
            property: 'common',
            direction: 'ASC'
        }]
    })

    render() {
        return (
            <Grid
                title="Plants"
                shadow 
                store={this.store}
                plugins={[
                    'gridcellediting',
                    'columnresizing'
                ]}
                columns={[{
                    text: 'Common Name',
                    flex: 1,
                    dataIndex: 'common',
                    editable: true
                }, {
                    text: 'Light',
                    width: 125,
                    dataIndex: 'light',
                    editable: true,
                    editor: {
                        xtype: 'selectfield',
                        options: [
                            'Shade',
                            'Mostly Shady',
                            'Sun or Shade',
                            'Mostly Sunny',
                            'Sunny'
                        ]
                    }
                }, {
                    text: 'Price',
                    width: 100,
                    formatter: 'usMoney',
                    dataIndex: 'price',
                    editable: true
                }, { 
                    xtype: 'datecolumn',
                    text: 'Available',
                    format: 'M d, Y',
                    width: 125,
                    dataIndex: 'availDate',
                    editor: {
                        allowBlur: false,
                        field: {
                            xtype: 'datepickerfield'
                        }
                    }
                }, {
                    text: 'Indoor?',
                    xtype: 'checkcolumn',
                    headerCheckbox: true,
                    dataIndex: 'indoor'
                }]}
            />
        )
    }
}