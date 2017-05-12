import React from 'react';
import { NumberField, FormPanel } from '@extjs/ext-react';

export default function SpinnerFieldExample() {
    return (
        <FormPanel shadow>
            <NumberField 
                decimals={2}
                label="Number" 
                width="150"
            />
        </FormPanel>
    )
}