import React from 'react';
import { FormPanel, Container, CheckBoxField } from '@extjs/reactor/modern';

export default function CheckBoxFieldExample() {
    return (
        <Container layout="center">
            <FormPanel shadow layout={{type: 'vbox', align: 'left'}}>
                <CheckBoxField boxLabel="Unchecked"/>
                <CheckBoxField boxLabel="Checked" checked/>
                <CheckBoxField boxLabel="Disabled" disabled/>
                <CheckBoxField boxLabel="Disabled (checked)" disabled checked/>
            </FormPanel>
        </Container>
    )
}