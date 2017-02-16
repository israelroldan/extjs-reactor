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
                    <Button handler={this.showActionSheet.bind(this)}>Show Action Sheet</Button>
                </Panel>
                <ActionSheet hidden={!showActionSheet}>
                    <Button ui="decline" handler={this.hideActionSheet.bind(this)}>Delete Draft</Button>
                    <Button handler={this.hideActionSheet.bind(this)}>Save Draft</Button>
                    <Button handler={this.hideActionSheet.bind(this)}>Cancel</Button>
                </ActionSheet>
            </Container>
        )
    }

}