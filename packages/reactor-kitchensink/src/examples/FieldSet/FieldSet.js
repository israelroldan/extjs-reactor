import React from 'react';
import { Container, FieldSet, TextField, FormPanel } from '@extjs/reactor/modern';

export default function FieldSetExample() {
    return (
        <Container layout="center">
            <FormPanel shadow>
                <FieldSet title="About You" instructions="Tell us about yourself." width={300}>
                    <TextField label="First Name" labelAlign="placeholder"/>
                    <TextField label="Last Name" labelAlign="placeholder"/>
                </FieldSet>
            </FormPanel>
        </Container>
    )
}