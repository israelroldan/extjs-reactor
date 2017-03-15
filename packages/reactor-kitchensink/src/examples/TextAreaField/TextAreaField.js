import React from 'react';
import { Container, FormPanel, TextAreaField } from '@extjs/reactor/modern';

export default function TextAreaFieldExample() {
    return (
        <Container layout="center">
            <FormPanel shadow>
                <TextAreaField 
                    label="Description"
                    width="300"
                    maxRows={10}
                />
            </FormPanel>
        </Container>
    )
}