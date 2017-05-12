import React from 'react';
import { FormPanel, ToggleField } from '@extjs/ext-react';

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