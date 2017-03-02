import React, { Component } from 'react';
import { Container, Panel, Button, CheckBoxField, Toolbar } from '@extjs/reactor/modern';

Ext.require('Ext.Toast');

require('./button.css');

const menu = [
    { text: 'Item 1' },
    { text: 'Item 2' },
    { text: 'Item 3' },
];

function handler() {
    Ext.toast("You clicked the button");
}

export default function ButtonExample() {
    return (
        <Container layout={{ type: 'hbox', pack: 'left', align: 'left' }}>
            <Panel shadow bodyPadding="0 20 0 0">
                <table className="button-table">
                    <tr>
                        <td>Flat</td>
                        <td><Button handler={handler}>Normal</Button></td>
                        <td><Button handler={handler} ui="decline" handler={handler}>Decline</Button></td>
                        <td><Button handler={handler} ui="confirm" handler={handler}>Confirm</Button></td>
                        <td><Button handler={handler} disabled>Disabled</Button></td>
                    </tr>
                    <tr>
                        <td>Action</td>
                        <td><Button handler={handler} ui="action">Normal</Button></td>
                        <td><Button handler={handler} ui="action decline">Decline</Button></td>
                        <td><Button handler={handler} ui="action confirm">Confirm</Button></td>
                        <td><Button handler={handler} ui="action" disabled>Disabled</Button></td>
                    </tr>
                    <tr>
                        <td>Round</td>
                        <td><Button handler={handler} ui="round action">Normal</Button></td>
                        <td><Button handler={handler} ui="round action decline">Decline</Button></td>
                        <td><Button handler={handler} ui="round action confirm">Confirm</Button></td>
                        <td><Button handler={handler} ui="round action" disabled>Disabled</Button></td>
                    </tr>
                    <tr>
                        <td>Raised</td>
                        <td><Button handler={handler} ui="raised">Normal</Button></td>
                        <td><Button handler={handler} ui="raised decline">Decline</Button></td>
                        <td><Button handler={handler} ui="raised confirm">Confirm</Button></td>
                        <td><Button handler={handler} ui="raised" disabled>Disabled</Button></td>
                    </tr>
                    <tr>
                        <td>Menu</td>
                        <td><Button handler={handler} menu={menu}>Normal</Button></td>
                        <td><Button handler={handler} menu={menu} ui="decline">Decline</Button></td>
                        <td><Button handler={handler} menu={menu} ui="confirm">Confirm</Button></td>
                        <td><Button handler={handler} menu={menu} disabled>Disabled</Button></td>
                    </tr>
                    <tr>
                        <td>Icon</td>
                        <td><Button handler={handler} iconCls="x-fa fa-home"/></td>
                        <td><Button handler={handler} iconCls="x-fa fa-home" ui="round action"/></td>
                        <td><Button handler={handler} iconCls="x-fa fa-home">Home</Button></td>
                        <td><Button handler={handler} iconCls="x-fa fa-home" menu={menu}>Home</Button></td>
                    </tr>
                </table>
            </Panel>
        </Container>
    )
}