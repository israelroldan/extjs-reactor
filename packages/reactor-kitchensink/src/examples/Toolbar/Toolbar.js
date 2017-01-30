import React, { Component } from 'react';
import { Toolbar, Panel, Button, SegmentedButton, Spacer } from '@extjs/reactor/modern';

export default class ToolbarExample extends Component {

    constructor() {
        super();
        this.state = { message: '' }
    }

    tapHandler(button) {
        this.setState({ message: `User tapped "${button.getText()}"` })
    }

    render() {
        const { message } = this.state;

        return (
            <Panel height={300} width={500} shadow={true} bodyPadding={0}>
                <Toolbar docked="top">
                    <Button text="Default" onTap={this.tapHandler.bind(this)}/>
                    <Spacer/>
                    <SegmentedButton>
                        <Button text="Option 1" pressed={true}  onTap={this.tapHandler.bind(this)}/>
                        <Button text="Option 2" onTap={this.tapHandler.bind(this)}/>
                    </SegmentedButton>
                    <Spacer/>
                    <Button ui="action" text="Action" onTap={this.tapHandler.bind(this)}/>
                </Toolbar>
               <div style={{padding: '20px'}}>{ message }</div>
            </Panel>
        )
    }
}