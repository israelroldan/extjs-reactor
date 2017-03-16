import React from 'react';
import { Container, FormPanel, PasswordField } from '@extjs/reactor/modern';

export default function PasswordFieldExample() {
    return (
        <Container layout="center">
            <FormPanel shadow>
                <PasswordField
                    width={200} 
                    label="Password" 
                    required 
                    revealable
                />
            </FormPanel>
        </Container>
    )
}