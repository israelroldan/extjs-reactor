import React from 'react';
import { Container, FormPanel, ToggleField } from '@extjs/reactor/modern';

export default function ToggleFieldExample() {
    return (
        <Container layout="center">
            <FormPanel shadow>
                <ToggleField boxLabel="On" value={true}/>
                <ToggleField boxLabel="Off" value={false}/>
                <ToggleField boxLabel="Disabled" disabled />
                <ToggleField boxLabel="Disabled (On)" disabled value={true} />
            </FormPanel>
        </Container>
    )
}