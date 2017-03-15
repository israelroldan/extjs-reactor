import React from 'react';
import { Container, SpinnerField, FormPanel } from '@extjs/reactor/modern';

export default function SpinnerFieldExample() {
    return (
        <Container layout="center">
            <FormPanel shadow>
                <SpinnerField 
                    label="Spinner" 
                    width="150"
                    minValue={0} 
                    maxValue={10} 
                    stepValue={1} 
                    cycle
                />
            </FormPanel>
        </Container>
    )
}