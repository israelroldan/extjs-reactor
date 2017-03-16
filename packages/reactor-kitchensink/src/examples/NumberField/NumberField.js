import React from 'react';
import { NumberField, FormPanel } from '@extjs/reactor/modern';

export default function SpinnerFieldExample() {
    return (
        <FormPanel shadow>
            <NumberField 
                label="Number" 
                width="150"
            />
        </FormPanel>
    )
}