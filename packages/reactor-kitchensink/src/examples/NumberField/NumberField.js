import React from 'react';
import { Container, NumberField, FormPanel } from '@extjs/reactor/modern';

export default function SpinnerFieldExample() {
    return (
        <Container layout="center">
            <FormPanel shadow>
                <NumberField 
                    label="Number" 
                    width="150"
                />
            </FormPanel>
        </Container>
    )
}