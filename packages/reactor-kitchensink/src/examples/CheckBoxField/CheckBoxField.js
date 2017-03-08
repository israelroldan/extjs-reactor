import React from 'react';
import { FormPanel, CheckBoxField } from '@extjs/reactor/modern';

export default function CheckBoxFieldExample() {
    return (
        <FormPanel shadow layout={{type: 'vbox', align: 'left'}}>
            <CheckBoxField 
                boxLabel="Box Label"
            />
        </FormPanel>
    )
}