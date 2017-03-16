import React from 'react';

import { SegmentedButton, Button, Panel, Container, Toolbar } from '@extjs/reactor/modern';

export default function SegementedButtonExample() {
    return (
        <Container layout="center">
            <Panel layout="vbox" shadow>
                <Toolbar shadow={false}>
                    <div style={{marginRight: '10px'}}>Default UI:</div>
                    <SegmentedButton>
                        <Button pressed text="Low"/>
                        <Button text="Medium"/>
                        <Button text="High"/>
                    </SegmentedButton>
                </Toolbar>
                <Toolbar shadow={false}>
                    <div style={{marginRight: '10px'}}>Toolbar UI:</div>
                    <SegmentedButton>
                        <Button ui="default-toolbar" pressed text="Low"/>
                        <Button ui="default-toolbar" text="Medium"/>
                        <Button ui="default-toolbar" text="High"/>
                    </SegmentedButton>
                </Toolbar>
            </Panel>
        </Container>
    )
}