import React, { Component } from 'react';
import { List } from '@extjs/reactor/modern';

export default class TemplateList extends Component {

    store = Ext.create('Ext.data.Store', {
        data: [
            { first: 'Mark', last: 'Brocato' }
        ]
    });

    itemTpl = ({first, last}) => <div className="item">{first} {last}</div>

    render() {
        return (
            <List
                store={this.store}
                itemTpl={this.itemTpl}
            />
        )
    }
    
}