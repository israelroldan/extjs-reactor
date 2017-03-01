import React from 'react';
import { FormPanel, CheckBoxField } from '@extjs/reactor/modern';

export default function CheckBoxFieldExample() {
    return (
        <FormPanel shadow layout={{type: 'vbox', align: 'left'}}>
            <CheckBoxField 
                label="Label Right" 
                labelAlign="right"
                labelWidth="auto"
            />
            <CheckBoxField 
                label="Label Left" 
                labelAlign="left"
                labelWidth="auto"
            />
        </FormPanel>
    )
}