import React from 'react';

import { SegmentedButton, Button, Container, Toolbar } from '@extjs/reactor/modern';

export default function SegementedButtonExample() {
    return (
        <Container>
            <Toolbar>
                <div style={{marginRight: '10px'}}>Default UI:</div>
                <SegmentedButton>
                    <Button pressed>Low</Button>
                    <Button>Medium</Button>
                    <Button>High</Button>
                </SegmentedButton>
            </Toolbar>
            <Toolbar margin="0 0 20 0">
                <div style={{marginRight: '10px'}}>Toolbar UI:</div>
                <SegmentedButton>
                    <Button ui="default-toolbar" pressed>Low</Button>
                    <Button ui="default-toolbar">Medium</Button>
                    <Button ui="default-toolbar">High</Button>
                </SegmentedButton>
            </Toolbar>
        </Container>
    )
}