import React, { Component } from 'react';
import { Container, Grid, Column } from '@extjs/ext-react';

export default class TemplateGrid extends Component {

    store = Ext.create('Ext.data.Store', {
        data: [
            { first: 'Mark', last: 'Brocato' }
        ]
    });

    nameTpl = ({first, last}) => <div className="item">{first} {last}</div>

    render() {
        return (
            <Container layout="vbox">
                <div>This tests that we can render React elements in grid cells using the tpl config.  The test should pass if the cell has "Mark Brocato" in it.</div>
                <Grid store={this.store} flex={1}>
                    <Column text="Name" tpl={this.nameTpl} flex={1} cell={{encodeHtml: false}}/>
                </Grid>
            </Container>
        )
    }
    
}