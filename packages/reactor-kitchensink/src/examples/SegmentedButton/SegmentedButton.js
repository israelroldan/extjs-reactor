import React, { Component } from 'react';

import { SegmentedButton, Button, Panel, Toolbar } from '@extjs/ext-react';

export default class SegementedButtonExample extends Component {

    state = { 
        button1: 'low', 
        button2: 'low' 
    };

    render() {
        return (
            <Panel shadow={!Ext.os.is.Phone}> 
                <Toolbar shadow={false}>
                    <div style={{marginRight: '10px'}}>Default UI:</div>
                    <SegmentedButton 
                        value={this.state.button1}  
                        onChange={(button, value) => this.setState({ button1: value })}
                    >
                        <Button value="low" text="Low"/>
                        <Button value="medium" text="Medium"/>
                        <Button value="high" text="High"/>
                    </SegmentedButton>
                </Toolbar>
                
                <Toolbar shadow={false}>
                    <div style={{marginRight: '10px'}}>Toolbar UI:</div>
                    <SegmentedButton 
                        defaultUI="toolbar-default" 
                        value={this.state.button2} 
                        onChange={(button, value) => this.setState({ button2: value })}
                    >
                        <Button value="low" text="Low"/>
                        <Button value="medium" text="Medium"/>
                        <Button value="high" text="High"/>
                    </SegmentedButton>
                </Toolbar>
            </Panel>
        )
    }
}