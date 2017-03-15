import React from 'react';
import { Container, FormPanel, EmailField } from '@extjs/reactor/modern';

export default function EmailFieldExample() {
    return (
        <Container layout="center">
            <FormPanel shadow>
                <EmailField 
                    width={250}
                    placeholder="user@domain.com" 
                    label="Email"
                />
            </FormPanel>
        </Container>
    )
}