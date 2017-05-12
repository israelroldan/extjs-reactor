import React, { Component } from 'react';
import { Grid, Column, WidgetCell, SparkLineLine } from '@extjs/ext-react';

export default class RelGridColumn extends Component {

    store = Ext.create('Ext.data.Store', {
        data: [
            { first: 'Mark', last: 'Brocato', trend: [1,2,3,4,3,2,1] }
        ]
    });

    render() {
        return (
            <Grid store={this.store}
                itemConfig={{
                    viewModel: {

                    }
                }}
            >
                <Column text="Name">
                    <Column text="First" dataIndex="first"/>
                    <Column text="Last" dataIndex="last"/>
                </Column>
                <Column text="Trend">
                    <WidgetCell forceWidth bind='{trend}'>
                        <SparkLineLine text="Edit"/>
                    </WidgetCell>
                </Column>
            </Grid>
        )
    }
    
}