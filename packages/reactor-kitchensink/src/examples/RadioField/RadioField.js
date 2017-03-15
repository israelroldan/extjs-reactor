import React from 'react';
import { Container, FormPanel, RadioField, FieldSet } from '@extjs/reactor/modern';

const radioProps = {
    name: 'radios'
};

export default function RadioFieldExample() {
    return (
        <Container layout="center">
            <FormPanel shadow layout={{type: 'vbox', align: 'left'}}>
                <RadioField {...radioProps} boxLabel="Checked" value="checked" checked/>
                <RadioField {...radioProps} boxLabel="Unchecked" value="unchecked"/>
                <RadioField {...radioProps} boxLabel="Disabled" value="disabled" disabled/>
            </FormPanel>
        </Container>
    )
}