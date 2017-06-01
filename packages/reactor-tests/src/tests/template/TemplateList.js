import React, { Component } from 'react';
import { Container, List } from '@extjs/ext-react';

export default class TemplateList extends Component {

    store = Ext.create('Ext.data.Store', {
        data: [
            { first: 'Mark', last: 'Brocato' }
        ]
    });

    itemTpl = ({first, last}) => <div className="item">{first} {last}</div>

    render() {
        return (
            <Container layout="vbox">
                <div>This tests that we can render React elements in list rows.  The test should pass if the list's element contains "Mark Brocato".</div>
                <List
                    flex={1}
                    store={this.store}
                    itemTpl={this.itemTpl}
                />
            </Container>
        )
    }
    
}