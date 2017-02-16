import React, { Component } from 'react';
import { Panel, Button } from '@extjs/reactor/modern';

Ext.require('Ext.MessageBox');

export default class MsgExample extends Component {

    onConfirmResult(buttonId, value, opt) {
        Ext.toast(`User clicked ${buttonId} button.`);
    }

    onPromptResult(buttonId, value) {
        Ext.toast(`User clicked ${buttonId} and entered value "${value}".`);
    }

    render() {
        return (
            <Panel shadow layout={{type: 'vbox', align: 'stretch'}}>
                <Button handler={() => Ext.Msg.alert('Title', 'The quick brown fox jumped over the lazy dog.')}>Alert</Button>
                <Button handler={() => Ext.Msg.prompt('Welcome!', "What's your first name?", this.onPromptResult.bind(this))}>Prompt</Button>
                <Button handler={() => Ext.Msg.confirm("Confirmation", "Are you sure you want to do that?", this.onConfirmResult.bind(this))}>Confirm</Button>
            </Panel>
        )
    }
    
}