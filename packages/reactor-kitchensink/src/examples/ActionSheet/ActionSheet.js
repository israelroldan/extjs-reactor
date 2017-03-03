import React, { Component } from 'react';
import { Container, Panel, ActionSheet, Button } from '@extjs/reactor/modern';

export default class ActionSheetExample extends Component {

    constructor() {
        super();
        this.state = {
            showActionSheet: false
        };
    }

    hideActionSheet() {
        this.setState({ showActionSheet: false })
    }

    showActionSheet() {
        this.setState({ showActionSheet: true })
    }

    render() {
        const { showActionSheet } = this.state;

        return (
            <Container>
                <Panel shadow>
                    <Button handler={this.showActionSheet.bind(this)} text="Show Action Sheet"/>
                </Panel>
                <ActionSheet hidden={!showActionSheet}>
                    <Button ui="decline" handler={this.hideActionSheet.bind(this)} text="Delete Draft"/>
                    <Button handler={this.hideActionSheet.bind(this)} text="Save Draft"/>
                    <Button handler={this.hideActionSheet.bind(this)} text="Cancel"/>
                </ActionSheet>
            </Container>
        )
    }

}