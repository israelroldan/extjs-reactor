import React, { Component } from 'react';
import { Container, Panel, Button, Menu, MenuItem } from '@extjs/reactor/modern';

Ext.require('Ext.Toast');

require('./button.css');

const menu = (
    <Menu rel="menu">
        <MenuItem text="Item 1"/>
        <MenuItem text="Item 2"/>
        <MenuItem text="Item 3"/>
    </Menu>
);

function handler() {
    Ext.toast("You clicked the button");
}

export default function ButtonExample() {
    return (
        <Container layout={{ type: 'hbox', pack: 'left', align: 'left' }} scrollable>
            <Panel shadow bodyPadding="0 20 0 0">
                <table className="button-table">
                    <tbody>
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
                            <td><Button handler={handler} text="Normal">{menu}</Button></td>
                            <td><Button handler={handler} text="Decline" ui="decline">{menu}</Button></td>
                            <td><Button handler={handler} text="Confirm" ui="confirm">{menu}</Button></td>
                            <td><Button handler={handler} text="Disabled" disabled>{menu}</Button></td>
                        </tr>
                        <tr>
                            <td>Icon</td>
                            <td><Button handler={handler} iconCls="x-fa fa-home"/></td>
                            <td><Button handler={handler} iconCls="x-fa fa-home" ui="round action"/></td>
                            <td><Button handler={handler} iconCls="x-fa fa-home">Home</Button></td>
                            <td><Button handler={handler} iconCls="x-fa fa-home" text="Home">{menu}</Button></td>
                        </tr>
                    </tbody>
                </table>
            </Panel>
        </Container>
    )
}