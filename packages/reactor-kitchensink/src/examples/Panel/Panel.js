import React, { Component } from 'react';
import { Container, Panel, Button } from '@extjs/reactor/modern';

Ext.require('Ext.Toast');

function toolHandler(owner, tool) {
    Ext.toast(`You clicked ${tool.config.type}`);
}

export default class PanelExample extends Component {

    render() {
        return (
            <Container padding={10}>
                <Panel 
                    shadow
                    title="Panel" 
                    height={300}
                    width={500}
                    bodyPadding={10}
                    collapsible={{ dynamic: true }}
                    tools={[
                        { type: 'minimize', handler: toolHandler },
                        { type: 'refresh', handler: toolHandler },
                        { type: 'save', handler: toolHandler },
                        { type: 'search', handler: toolHandler },
                        { type: 'close', handler: toolHandler }
                    ]}
                >
                    Panel Body
                </Panel>
            </Container>
        )
    }
}