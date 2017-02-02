import React from 'react';
import { FormPanel, SelectField, Container } from '@extjs/reactor/modern';

Ext.require('Ext.Toast');

export default function SelectFieldExample() {
    return (
        <FormPanel shadow={true}>
            <SelectField 
                label="Select"  
                onChange={value => Ext.toast(`You selected ${value}`)}
                options={[
                    { text: 'Option 1', value: 1 },
                    { text: 'Option 2', value: 2 },
                    { text: 'Option 3', value: 3 }
                ]}
            />
        </FormPanel>
    )
}