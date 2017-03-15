import React from 'react';
import { Container, FormPanel, URLField } from '@extjs/reactor/modern';

export default function UrlFieldExample() {
    return (
        <Container layout="center">
            <FormPanel shadow>
                <URLField placeholder="http://www.domain.com" label="URL" width="200"/>
            </FormPanel>
        </Container>
    )
} 