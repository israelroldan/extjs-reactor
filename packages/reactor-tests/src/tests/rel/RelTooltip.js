import React from 'react';
import { Container, Button, ToolTip } from '@extjs/ext-react';

export default function RelTooltip() {
    return (
        <Container>
            <Button text="Button" itemId="button">
                <ToolTip itemId="tooltip">
                    I am a tooltip
                </ToolTip>
            </Button>
        </Container>
    )
}