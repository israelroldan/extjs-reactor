import React from 'react';
import { FieldSet, TextField, FormPanel } from '@extjs/ext-react';

export default function FieldSetExample() {
    return (
        <FormPanel shadow>
            <FieldSet title="About You" instructions="Tell us about yourself." width={300}>
                <TextField label="First Name" labelAlign="placeholder"/>
                <TextField label="Last Name" labelAlign="placeholder"/>
            </FieldSet>
        </FormPanel>
    )
}