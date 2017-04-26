import React, { Component } from 'react';
import { TitleBar, Container, Button, Menu, MenuItem } from '@extjs/ext-react';

export default class TitleBarExample extends Component {

    render() {
        return (
            <Container>
                <TitleBar title="App Title" docked="top">
                    <Button align="left" iconCls="x-fa fa-bars"/>
                    <Button align="right" iconCls="x-fa fa-inbox" text="Inbox"/>
                    <Button align="right" iconCls="x-fa fa-user" text="Profile"/>
                    <Button align="right" iconCls="x-fa fa-ellipsis-v" arrow={false}>
                        <Menu>
                            <MenuItem text="Settings" iconCls="x-fa fa-cog"/>
                            <MenuItem text="Help" iconCls="x-fa fa-question-circle"/>
                        </Menu>
                    </Button>
                </TitleBar>
            </Container>
        )
    }

}