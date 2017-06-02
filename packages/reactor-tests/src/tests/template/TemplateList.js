import React, { Component } from 'react';
import { Container, List, Button } from '@extjs/ext-react';

export default class TemplateList extends Component {

    store = Ext.create('Ext.data.Store', {
        data: [
            { first: 'Mark', last: 'Brocato' }
        ]
    });

    itemTpl = ({first, last}) => (
        <div>
            <span className="text">{first} {last}</span>
            <Button itemId="button" text="Button"/>
        </div>
    )

    render() {
        return (
            <Container layout="vbox">
                <div>This tests that we can render React elements including ExtReact components in list rows.  The test should pass if the list's element contains "Mark Brocato".</div>
                <List
                    flex={1}
                    store={this.store}
                    itemTpl={this.itemTpl}
                />
            </Container>
        )
    }
    
}