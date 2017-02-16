import React, { Component } from 'react';
import { Container, Panel, Button } from '@extjs/reactor/modern';

Ext.require('Ext.Toast');

function toolHandler(owner, tool) {
    Ext.toast(`You clicked ${tool.config.type}`);
}

export default class PanelExample extends Component {

    render() {
        return (
            <Container>
                <Panel 
                    shadow
                    title="Panel" 
                    height={300}
                    width={500}
                    tools={[
                        { type: 'minimize', handler: toolHandler },
                        { type: 'refresh', handler: toolHandler },
                        { type: 'save', handler: toolHandler },
                        { type: 'search', handler: toolHandler },
                        { type: 'close', handler: toolHandler }
                    ]}
                >
                    <p>Panel Body</p>
                </Panel>
                <Button ui="action" handler={() => this.refs.modal.show()} margin="20 0 0 0">Show Modal</Button>
                <Panel 
                    ref="modal"
                    title="Floated Panel"
                    modal
                    floated
                    centered
                    hideOnMaskTap
                    width={Ext.filterPlatform('ie10') ? '100%' : (Ext.os.deviceType == 'Phone') ? 260 : 400}
                    maxHeight={Ext.filterPlatform('ie10') ? '30%' : (Ext.os.deviceType == 'Phone') ? 220 : 400}
                    showAnimation={{
                        type: 'popIn',
                        duration: 250,
                        easing: 'ease-out'
                    }}
                    hideAnimation={{
                        type: 'popOut',
                        duration: 250,
                        easing: 'ease-out'
                    }}
                >
                    <p>This is a modal, centered and floated panel. hideOnMaskTap is true by default so we can tap anywhere outside the overlay to hide it.</p>
                </Panel>
            </Container>
        )
    }
}