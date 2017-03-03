import React, { Component } from 'react';
import { TitleBar, Button, EdgeMenu, Container } from '@extjs/reactor/modern';

export default class TitleBarExample extends Component {

    render() {
        return (
            <TitleBar title="App Title" docked="top">
                <Button align="left" iconCls="x-fa fa-bars"/>
                <Button align="right" iconCls="x-fa fa-inbox" text="Inbox"/>
                <Button align="right" iconCls="x-fa fa-user" text="Profile"/>
            </TitleBar>
        )
    }

}