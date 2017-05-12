import React, { Component } from 'react';
import { Grid, Column } from '@extjs/ext-react';

export default class TemplateList extends Component {

    store = Ext.create('Ext.data.Store', {
        data: [
            { first: 'Mark', last: 'Brocato' }
        ]
    });

    nameTpl = ({first, last}) => <div className="item">{first} {last}</div>

    render() {
        return (
            <Grid store={this.store}>
                <Column text="Name" tpl={this.nameTpl} flex={1} cell={{encodeHtml: false}}/>
            </Grid>
        )
    }
    
}