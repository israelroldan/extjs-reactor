import React, { Component } from 'react';
import { TitleBar, Button, EdgeMenu, Container } from '@extjs/reactor/modern';

export default class TitleBarExample extends Component {

    render() {
        return (
            <TitleBar title="App Title" docked="top">
                <Button align="left" iconCls="fa fa-bars"/>
                <Button align="right" iconCls="fa fa-inbox">Inbox</Button>
                <Button align="right" iconCls="fa fa-user">Profile</Button>
            </TitleBar>
        )
    }

}