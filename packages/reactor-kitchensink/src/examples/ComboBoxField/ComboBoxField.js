import React, { Component } from 'react';
import { Panel, ComboBoxField } from '@extjs/reactor/modern';
import data from './data';

export default class ComboBoxFieldExample extends Component {

    render() {
        return (
            <Panel shadow width={200}>
                <ComboBoxField
                    label="State"
                    options={data}
                    displayField="name"
                    valueField="code"
                    queryMode="local"
                    labelAlign="placeholder"
                    typeAhead
                />
            </Panel>
        )
    }

}