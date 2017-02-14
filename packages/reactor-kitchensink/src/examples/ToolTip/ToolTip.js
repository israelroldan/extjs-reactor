import React, { Component } from 'react';
import { Panel, Button } from '@extjs/reactor/modern';

export default class ToolTipExample extends Component {
    render() {
        return (
            <Panel layout={{ type: 'hbox', align: 'start', pack: 'center' }} shadow>
                <Button tooltip="A simple tooltip">Basic Tip</Button>
                
                <Button tooltip={{ 
                    autoHide: false, 
                    html: 'A simple tooltip',
                    closable: true 
                }}>autoHide: false</Button>
                
            </Panel>
        )
    }
}