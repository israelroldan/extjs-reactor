import React, { Component } from 'react';
import { Grid, Container } from '@extjs/reactor/modern';


export default class XmlGridExample extends Component {

    store = Ext.create('Ext.data.Store', {
        autoLoad: true,
        fields:[
            {name: 'Author', mapping: '@author.name'},
            'Title', 
            'Manufacturer', 
            'ProductGroup'
        ],
        proxy:{
            type: 'ajax',
            url: '/resources/data/Grids/sheldon.xml',
            reader: {
                type: 'xml',
                // records will have an "Item" tag
                record: 'Item',
                idProperty: 'ASIN',
                totalRecords: '@total'
            }
        }
    })

    render(){
        return(
            <Grid
                title="XML Grid"
                height={400}
                width={600}
                store={this.store}
                columns={[{
                    text: 'Author',
                    dataIndex: 'Author',
                    flex: 1
                }, {
                    text: 'Title',
                    dataIndex: 'Title',
                    flex: 1
                }, {
                    text: 'Manufacturer',
                    dataIndex: 'Manufacturer',
                    width: 125
                }, {
                    text: 'Product Group',
                    dataIndex: 'ProductGroup',
                    width: 125
                }]}
            />
        )
    }
}