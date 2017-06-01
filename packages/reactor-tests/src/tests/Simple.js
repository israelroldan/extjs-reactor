import React from 'react';
import { Container, Button } from '@extjs/ext-react';

export default function Simple() {
    return (
        <Container>
            <div>This simply tests that we can render an Ext JS component</div>
            <Button itemId="button" text="Click Me"/>
        </Container>
    )
}