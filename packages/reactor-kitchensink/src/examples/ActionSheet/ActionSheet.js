import React, { Component } from 'react';
import { Container, Panel, ActionSheet, Button } from '@extjs/ext-react';

export default class ActionSheetExample extends Component {

    state = {
        showActionSheet: false
    }

    hideActionSheet = () => {
        this.setState({ showActionSheet: false })
    }

    showActionSheet = () => {
        this.setState({ showActionSheet: true })
    }

    render() {
        const { showActionSheet } = this.state;

        return (
            <Container>
                <Panel shadow>
                    <Button handler={this.showActionSheet} text="Show Action Sheet"/>
                </Panel>
                <ActionSheet displayed={showActionSheet} side="bottom" onHide={() => this.setState({ showActionSheet: false })}>
                    <Button ui="decline" handler={this.hideActionSheet} text="Delete Draft"/>
                    <Button handler={this.hideActionSheet} text="Save Draft"/>
                    <Button handler={this.hideActionSheet} text="Cancel"/>
                </ActionSheet>
            </Container>
        )
    }

}