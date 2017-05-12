import React, { Component } from 'react';
import { Container, Grid, Toolbar, SegmentedButton, Button, Column } from '@extjs/ext-react';
import './data';

Ext.require([
    'Ext.grid.cell.Number',
    'Ext.grid.cell.Widget',
    'Ext.grid.SummaryRow',
    'Ext.ux.rating.Picker'
]);

export default class GroupedGridExample extends Component {

    store = Ext.create('Ext.data.Store', {
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: '/KitchenSink/Restaurants'
        },
        sorters: ['cuisine', 'name'],
        groupField: 'cuisine'
    });

    state = {
        grouped: true
    };

    onToggleGrouping = on => this.setState({ grouped: on })

    render() {
        const { grouped } = this.state;

        return (
            <Container layout="vbox" padding="10">
                <Toolbar margin="0 0 20 0" shadow>
                    <div style={{ marginRight: '10px' }}>Grouping:</div>
                    <SegmentedButton label="Grouping">
                        <Button ui="toolbar-default" pressed text="ON" handler={this.onToggleGrouping.bind(this, true)}/>
                        <Button ui="toolbar-default" text="OFF" handler={this.onToggleGrouping.bind(this, false)}/>
                    </SegmentedButton>
                </Toolbar>
            
                <Grid
                    flex={1}
                    title="Restaurants"
                    shadow 
                    store={this.store}
                    grouped={grouped}
                    groupFooter={{
                        xtype: 'gridsummaryrow'
                    }}
                >
                    <Column t
                        text="Name" 
                        dataIndex="name" 
                        flex={1}
                        groupHeaderTpl='{columnName}: {value:htmlEncode}'
                    />
                    <Column 
                        text="Cuisine" 
                        dataIndex="cuisine" 
                        flex={1}
                    />
                    <Column 
                        text="Rating" 
                        dataIndex="rating"
                        summaryCell="numbercell"
                        groupHeaderTpl='{value:repeat("★")} ({value:plural("Star")})'
                        cell={{
                            xtype: 'widgetcell',
                            widget: {
                                xtype: 'rating',
                                tip: 'Set to {tracking:plural("Star")}'
                            }
                        }}
                    />
                </Grid>
            </Container>
        )
    }
}
