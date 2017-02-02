import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import styles from './styles';
import { ViewPort } from '@extjs/reactor/modern';

export default function Layout({
    toggleDrawer=Function.prototype,
    drawerOpen=true,
    docked=true,
    handleClose=Function.prototype,
    children,
    title="App",
    router
}) {
    return (
        <ViewPort style={{height: '100%'}}>
            <div style={{height: '100%', ...styles.vbox }}>
                <AppBar title={title} onLeftIconButtonTouchTap={toggleDrawer}/>
                <Drawer
                    open={docked || drawerOpen}
                    docked={docked}
                    onRequestChange={toggleDrawer}
                >
                    <AppBar title={title} showMenuIconButton={false}/>
                    <MenuItem onTouchTap={() => router.push('/users')}>Users</MenuItem>
                    <MenuItem onTouchTap={() => router.push('/groups')}>Groups</MenuItem>
                </Drawer>
                <div style={{ ...styles.vbox, paddingLeft: 260, flex: 1 }}>
                    { children }
                </div>
            </div>
        </ViewPort>
    )
}