import React, { Component } from 'react';
import { Toolbar, Panel, Button, SegmentedButton, Spacer, SearchField } from '@extjs/reactor/modern';

export default class ToolbarExample extends Component {

    constructor() {
        super();
        this.state = { message: '' }
    }

    buttonHandler(button) {
        this.setState({ message: `User clicked "${button.getText()}"` })
    }

    render() {
        const { message } = this.state;

        return (
            <Panel height={300} width={500} shadow bodyPadding={0}>
                <Toolbar docked="top">
                    <Button text="Default" onTap={this.buttonHandler.bind(this)} badgeText="2"/>
                    <Spacer/>
                    <SegmentedButton>
                        <Button text="Option 1" pressed={true} handler={this.buttonHandler.bind(this)}/>
                        <Button text="Option 2" handler={this.buttonHandler.bind(this)}/>
                    </SegmentedButton>
                    <Spacer/>
                    <Button ui="action" text="Action" handler={this.buttonHandler.bind(this)}/>
                </Toolbar>
               <div style={{padding: '20px'}}>{ message }</div>
            </Panel>
        )
    }
}