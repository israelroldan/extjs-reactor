import React, { Component } from 'react';
import { FormPanel, ComboBoxField, Container } from '@extjs/reactor/modern';
import data from './data';

export default class ComboBoxFieldExample extends Component {

    render() {
        return (
            <Container layout="center">
                <FormPanel shadow>
                    <ComboBoxField
                        width={200}
                        label="State"
                        options={data}
                        displayField="name"
                        valueField="code"
                        queryMode="local"
                        labelAlign="placeholder"
                        typeAhead
                    />
                </FormPanel>
            </Container>
        )
    }

}