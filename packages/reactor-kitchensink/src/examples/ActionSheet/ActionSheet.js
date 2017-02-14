import React, { Component } from 'react';
import { Container, Panel, ActionSheet, Button } from '@extjs/reactor/modern';

export default class ActionSheetExample extends Component {

    hideActionSheet() {
        this.refs.sheet.hide();
    }

    render() {
        return (
            <Container>
                <Panel shadow>
                    <Button handler={() => this.refs.sheet.show()}>Show Action Sheet</Button>
                </Panel>
                <ActionSheet ref="sheet">
                    <Button ui="decline" handler={this.hideActionSheet.bind(this)}>Delete Draft</Button>
                    <Button handler={this.hideActionSheet.bind(this)}>Save Draft</Button>
                    <Button handler={this.hideActionSheet.bind(this)}>Delete Draft</Button>
                </ActionSheet>
            </Container>
        )
    }

}