import React from 'react';
import { FormPanel, ToggleField } from '@extjs/reactor/modern';

export default function ToggleFieldExample() {
    return (
        <FormPanel shadow>
            <ToggleField boxLabel="Push Notifications"/>
            <ToggleField boxLabel="Mail Notifications"/>
            <ToggleField boxLabel="Disabled" disabled />
        </FormPanel>
    )
}