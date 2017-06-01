import React from 'react';
import { Container, Button, ToolTip } from '@extjs/ext-react';

export default function RelTooltip() {
    return (
        <Container>
            <div>This checks that a tooltip can be assigned using a child element.  The test should pass if the button has a tooltip.</div>
            <Button text="Button" itemId="button">
                <ToolTip itemId="tooltip">
                    I am a tooltip
                </ToolTip>
            </Button>
        </Container>
    )
}