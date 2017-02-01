import React from 'react';
import { Panel } from '@extjs/reactor/modern';

Ext.require('Ext.Toast');

function toolHandler(owner, tool) {
    Ext.toast(`You clicked ${tool.config.type}`);
}

export default function PanelExample() {
    return (
        <Panel 
            shadow={true} 
            title="Panel" 
            html="Panel Body" 
            height={300}
            width={500}
            tools={[
                { type: 'minimize', handler: toolHandler },
                { type: 'refresh', handler: toolHandler },
                { type: 'save', handler: toolHandler },
                { type: 'search', handler: toolHandler },
                { type: 'close', handler: toolHandler }
            ]}
        />
    )
}