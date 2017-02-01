import React from 'react';
import { FormPanel, ToggleField } from '@extjs/reactor/modern';

export default function ToggleFieldExample() {
    return (
        <FormPanel shadow={true}>
            <ToggleField 
                label="Toggle"
            />
        </FormPanel>
    )
}