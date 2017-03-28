import React, { Component } from 'react';
import { Grid, Toolbar } from '@extjs/reactor/modern';
import './data';

export default class GroupedGridExample extends Component{

    store = Ext.create('Ext.data.Store',{
        fields:[
            'name',
            'cuisine'
        ],
        autoLoad: true,
        proxy:{
            type: 'ajax',
            url: '/KitchenSink/Restaurants'
        },
        sorters: ['cuisine', 'name'],
        groupField: 'cuisine'

    })

    state = {
        grouped: true
    }

    onToggleGrouping = () => {
        const result = this.state.grouped ? false : true
        this.setState({grouped:result})
    }

    render(){
        return(
            <Grid 
                title="Restaurants"
                store={this.store}
                height={400}
                width={600}
                grouped={this.state.grouped}
                columns={[
                    {
                        text: 'Name',
                        dataIndex: 'name',
                        flex: 1,

                        // Adjust the header text when grouped by this column:
                        groupHeaderTpl: '{columnName}: {value:htmlEncode}'
                    }, {
                        text: 'Cuisine',
                        dataIndex: 'cuisine',
                        flex: 1
                    }
                ]}
            >
                <Toolbar 
                    docked="bottom"
                    items={['->', {
                        text: 'Toggle grouping On/Off',
                        handler: this.onToggleGrouping
                    }]} />
            </Grid>
        )
    }
}
