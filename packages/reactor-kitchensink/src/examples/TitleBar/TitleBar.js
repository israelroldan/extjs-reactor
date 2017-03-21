import React, { Component } from 'react';
import { TitleBar, Container, Button, Menu, MenuItem } from '@extjs/reactor/modern';

require('./TitleBar.css');

export default class TitleBarExample extends Component {

    render() {
        return (
            <Container>
                <TitleBar title="App Title" docked="top">
                    <Button align="left" iconCls="x-fa fa-bars" ripple={{bound: false}}/>
                    <Button align="right" iconCls="x-fa fa-inbox" text="Inbox"/>
                    <Button align="right" iconCls="x-fa fa-user" text="Profile"/>
                    <Button align="right" iconCls="x-fa fa-ellipsis-v" cls="btn-hide-arrow">
                        <Menu rel="menu">
                            <MenuItem text="Settings" iconCls="x-fa fa-cog"/>
                            <MenuItem text="Help" iconCls="x-fa fa-question-circle"/>
                        </Menu>
                    </Button>
                </TitleBar>
            </Container>
        )
    }

}