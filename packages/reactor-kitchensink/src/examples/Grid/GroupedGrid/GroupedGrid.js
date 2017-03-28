import React, { Component } from 'react';
import { Grid, Toolbar, Label, SegmentedButton, Button } from '@extjs/reactor/modern';
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

    onToggleGrouping = (on) => this.setState({ grouped: on })

    render() {
        const { grouped } = this.state;

        return (
            <Grid
                title="Restaurants"
                shadow 
                store={this.store}
                grouped={grouped}
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
                <Toolbar docked="bottom">
                    <Label margin="0 10 0 0">Grouping:</Label>
                    <SegmentedButton label="Grouping">
                        <Button ui="toolbar-default" pressed text="ON" handler={this.onToggleGrouping.bind(this, true)}/>
                        <Button ui="toolbar-default" text="OFF" handler={this.onToggleGrouping.bind(this, false)}/>
                    </SegmentedButton>
                </Toolbar>
            </Grid>
        )
    }
}
