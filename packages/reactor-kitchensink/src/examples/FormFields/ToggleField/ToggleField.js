import React from 'react';
import { FormPanel, ToggleField } from '@extjs/reactor/modern';

export default function ToggleFieldExample() {
    return (
        <FormPanel shadow>
            <ToggleField boxLabel="On" value={true}/>
            <ToggleField boxLabel="Off" value={false}/>
            <ToggleField boxLabel="Disabled" disabled />
            <ToggleField boxLabel="Disabled (On)" disabled value={true} />
        </FormPanel>
    )
}