import React from 'react';
import { FormPanel, Container, TextField, FieldSet } from '@extjs/reactor/modern';

export default function TextFieldExample() {
    return (
        <Container layout={{type: 'vbox', align: 'stretch'}}>
            <FormPanel shadow flex={1} margin="0 0 20 0">
                <FieldSet title="Separate Label and Placeholder">
                    <TextField placeHolder="Enter Name..." label="Name" required/>
                </FieldSet>
            </FormPanel>
            <FormPanel shadow flex={1} height={100} margin="0 0 20 0">
                <FieldSet title="Label as Placeholder">
                    <TextField labelAlign="placeholder" label="Name" required/>
                </FieldSet>
            </FormPanel>
            <FormPanel shadow flex={1} height={100}>
                <FieldSet title="With Error Message">
                    <TextField 
                        labelAlign="placeholder" 
                        label="Label" 
                        errorMessage="The value you entered is invalid." 
                        value="invalid value"
                        errorTarget="under"
                    />
                </FieldSet>
            </FormPanel>
        </Container>
    )
}