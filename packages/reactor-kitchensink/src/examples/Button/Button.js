import React, { Component } from 'react';
import { Container, Panel, Button, CheckBoxField, Toolbar } from '@extjs/reactor/modern';

Ext.require('Ext.Toast');

export default class ButtonExample extends Component {

    constructor() {
        super();
        this.state = { ui: [] };
    }

    toggleUI(ui) {
        if (this.state.ui.indexOf(ui) !== -1) {
            this.setState({ ui: this.state.ui.filter(u => u !== ui) })
        } else {
            this.setState({ ui: [...this.state.ui, ui]})
        }
    }

    render() {
        const { ui } = this.state;
        const checkboxProps = { labelWidth: 'auto', labelAlign: 'right', margin: '0 20 0 0' };

        return (
            <Panel shadow={true} height={300} width={380} layout={{type: 'vbox', align: 'center', pack: 'center'}}>
                <Button ref="button" text="Button" ui={ui.join(' ')} handler={() => Ext.toast('Clicked')}/>
                <Toolbar docked="bottom" layout="vbox" shadow={true}>
                    <div style={{marginBottom: '10px', textAlign: 'center'}}>Button UIs</div>
                    <Container layout="hbox">
                        <CheckBoxField {...checkboxProps} label="action" onChange={() => this.toggleUI('action')} />
                        <CheckBoxField {...checkboxProps} label="alt" onChange={() => this.toggleUI('alt')} />
                        <CheckBoxField {...checkboxProps} label="confirm" onChange={() => this.toggleUI('confirm')} />
                        <CheckBoxField {...checkboxProps} label="decline"onChange={() => this.toggleUI('decline')} />
                        <CheckBoxField {...checkboxProps} label="round" onChange={() => this.toggleUI('round')} />
                    </Container>
                </Toolbar>
            </Panel>
        )
    }
}