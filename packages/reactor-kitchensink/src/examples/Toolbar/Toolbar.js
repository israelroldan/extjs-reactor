import React, { Component } from 'react';
import { Container, TitleBar, Toolbar, Panel, Button, SegmentedButton, Spacer, SearchField } from '@extjs/ext-react';

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
            <Container layout="hbox" defaults={{ margin: '0 10 0 0' }}>
                <Panel flex={1} shadow bodyPadding={0}>
                    <Toolbar docked="top">
                        <Button text="Default" onTap={this.buttonHandler.bind(this)} badgeText="2"/>
                        <Spacer/>
                        <SegmentedButton>
                            <Button text="Option 1" pressed handler={this.buttonHandler.bind(this)}/>
                            <Button text="Option 2" handler={this.buttonHandler.bind(this)}/>
                        </SegmentedButton>
                        <Spacer/>
                        <Button ui="action" text="Action" handler={this.buttonHandler.bind(this)}/>
                    </Toolbar>
                <div style={{padding: '20px'}}>{ message }</div>
                </Panel>
                <Panel flex={1} shadow title="Title"/>
                <Panel flex={1}>
                    <TitleBar title="Title">
                        <Button align="left" iconCls="x-fa fa-bars" margin="0 10 0 0"/>
                        <Button align="right" text="Link 1"/>
                        <Button align="right" text="Link 2"/>
                    </TitleBar>

                    <Button ui="round raised" iconCls="x-fa fa-bars"/>
                </Panel>
                <Panel flex={1}>
                    <TitleBar title="Title">
                        
                    </TitleBar>
                </Panel>
            </Container>
        )
    }
}