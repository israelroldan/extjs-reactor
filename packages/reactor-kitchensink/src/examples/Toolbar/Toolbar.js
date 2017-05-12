import React, { Component } from 'react';
import { Toolbar, Panel, Button, SearchField, SegmentedButton, Spacer } from '@extjs/ext-react';

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
            <Panel flex={1} shadow bodyPadding={0}>
                <Toolbar docked="top">
                    <Button text="Button" ui="toolbar-default" onTap={this.buttonHandler.bind(this)} badgeText="2"/>
                    <Spacer/>
                    {!Ext.os.is.Phone && (
                        <SegmentedButton>
                            <Button text="Option 1" pressed handler={this.buttonHandler.bind(this)}/>
                            <Button text="Option 2" handler={this.buttonHandler.bind(this)}/>
                        </SegmentedButton>
                    )}
                    <Spacer/>
                    <SearchField ui="faded" placeholder="Search"/>
                </Toolbar>
                <div style={{padding: '20px'}}>{ message }</div>
            </Panel>
        )
    }
}