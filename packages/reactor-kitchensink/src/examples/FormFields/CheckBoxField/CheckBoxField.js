import React from 'react';
import { FormPanel, CheckBoxField } from '@extjs/ext-react';

export default function CheckBoxFieldExample() {
    return (
        <FormPanel shadow layout={{type: 'vbox', align: 'left'}} bodyPadding="10">
            <CheckBoxField boxLabel="Unchecked"/>
            <CheckBoxField boxLabel="Checked" checked/>
            <CheckBoxField boxLabel="Disabled" disabled/>
            <CheckBoxField boxLabel="Disabled (checked)" disabled checked/>
        </FormPanel>
    )
}