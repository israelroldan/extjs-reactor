import React from 'react';
import { FormPanel, SpinnerField } from '@extjs/reactor/modern';

export default function SpinnerFieldExample() {
    return (
        <FormPanel shadow>
            <SpinnerField 
                label="Spinner" 
                minValue={0} 
                maxValue={10} 
                stepValue={1} 
                cycle
            />
        </FormPanel>
    )
}