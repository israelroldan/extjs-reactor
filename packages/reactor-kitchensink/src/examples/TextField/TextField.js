import React from 'react';
import { FormPanel, Container, TextField, FieldSet } from '@extjs/reactor/modern';

export default function TextFieldExample() {
    return (
        <Container layout={{type: 'vbox', align: 'stretch'}}>
            <FormPanel shadow={true} flex={1} margin="0 0 20 0">
                <FieldSet title="Separate Label and Placeholder">
                    <TextField placeHolder="Enter Name..." label="Name" required={true}/>
                </FieldSet>
            </FormPanel>
            <FormPanel shadow={true} flex={1} height={100}>
                <FieldSet title="Label as Placeholder">
                    <TextField labelAlign="placeholder" label="Name" required={true}/>
                </FieldSet>
            </FormPanel>
        </Container>
    )
}