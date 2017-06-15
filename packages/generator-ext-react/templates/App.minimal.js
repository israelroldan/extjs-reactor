import React, { Component } from 'react'
import { Panel } from '@extjs/ext-react';

// Enable responsiveConfig app-wide. You can remove this if you don't plan to build a responsive UI.
Ext.require('Ext.plugin.Responsive');

/**
 * The main application view
 */
export default function App() {

    return (
        <Panel title="<%= appName %>" fullscreen>
            Hello World!
        </Panel>
    )
    
}
