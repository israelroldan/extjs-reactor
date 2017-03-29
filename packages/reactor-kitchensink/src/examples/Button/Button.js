import React, { Component } from 'react';
import { Container, Panel, Button, Menu, MenuItem } from '@extjs/reactor/modern';
import './button.css';

Ext.require('Ext.Toast');

export default function ButtonExample() {
    return (
        <Panel bodyPadding="0 20 0 0" shadow={!Ext.os.is.Phone}>
            <table className="button-table">
                <tbody>
                    <tr>
                        <td>Flat</td>
                        <td><Button handler={handler} text="Normal"/></td>
                        <td><Button handler={handler} ui="decline" handler={handler} text="Decline"/></td>
                        <td><Button handler={handler} ui="confirm" handler={handler} text="Confirm"/></td>
                        <td><Button handler={handler} disabled text="Disabled"/></td>
                    </tr>
                    <tr>
                        <td>Action</td>
                        <td><Button handler={handler} ui="action" text="Normal"/></td>
                        <td><Button handler={handler} ui="action decline" text="Decline"/></td>
                        <td><Button handler={handler} ui="action confirm" text="Confirm"/></td>
                        <td><Button handler={handler} ui="action" disabled text="Disabled"/></td>
                    </tr>
                    <tr>
                        <td>Round</td>
                        <td><Button handler={handler} ui="round action" text="Normal"/></td>
                        <td><Button handler={handler} ui="round action decline" text="Decline"/></td>
                        <td><Button handler={handler} ui="round action confirm" text="Confirm"/></td>
                        <td><Button handler={handler} ui="round action" disabled text="Disabled"/></td>
                    </tr>
                    <tr>
                        <td>Raised</td>
                        <td><Button handler={handler} ui="raised" text="Normal"/></td>
                        <td><Button handler={handler} ui="raised decline" text="Decline"/></td>
                        <td><Button handler={handler} ui="raised confirm" text="Confirm"/></td>
                        <td><Button handler={handler} ui="raised" disabled text="Disabled"/></td>
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
                        <td><Button handler={handler} iconCls="x-fa fa-home" text="Home"/></td>
                        <td><Button handler={handler} iconCls="x-fa fa-home" text="Home">{menu}</Button></td>
                    </tr>
                </tbody>
            </table>
        </Panel>
    )
}

const menu = (
    <Menu>
        <MenuItem text="Item 1"/>
        <MenuItem text="Item 2"/>
        <MenuItem text="Item 3"/>
    </Menu>
);

function handler() {
    Ext.toast("You clicked the button");
}
