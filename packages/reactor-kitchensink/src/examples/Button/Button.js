import React, { Component } from 'react';
import { Container, Panel, Button, Menu, MenuItem } from '@extjs/ext-react';

export default function ButtonExample() {
    
    return (
        <Panel { ...layoutProps }>
            <Container>
                <div {...groupLabelProps}>Flat</div>
                <Container className="button-group" {...buttonGroupProps}>
                    <Container layout="hbox">
                        <Button text="Normal"/>
                        <Button text="Decline" ui="decline"/>
                    </Container>
                    <Container layout="hbox">
                        <Button text="Confirm" ui="confirm"/>
                        <Button text="Disabled" disabled/>
                    </Container>
                </Container>
            </Container>

            <Container>
                <div {...groupLabelProps}>Action</div>
                <Container className="button-group" { ...buttonGroupProps }>
                    <Container layout="hbox">
                        <Button text="Normal" ui="action"/>
                        <Button text="Decline" ui="action decline"/>
                    </Container>
                    <Container layout="hbox">
                        <Button text="Confirm" ui="action confirm"/>
                        <Button text="Disabled" disabled ui="action"/>
                    </Container>
                </Container>
            </Container>

            <Container>
                <div {...groupLabelProps}>Round</div>
                <Container className="button-group" { ...buttonGroupProps }>
                    <Container layout="hbox">
                        <Button text="Normal" ui="round"/>
                        <Button text="Decline" ui="round decline"/>
                    </Container>
                    <Container layout="hbox">
                        <Button text="Confirm" ui="round confirm"/>
                        <Button text="Disabled" disabled ui="round"/>
                    </Container>
                </Container>
            </Container>

            <Container>
                <div {...groupLabelProps}>Raised</div>
                <Container className="button-group" { ...buttonGroupProps }>
                    <Container layout="hbox">
                        <Button text="Normal" ui="raised"/>
                        <Button text="Decline" ui="raised decline"/>
                    </Container>
                    <Container layout="hbox">
                        <Button text="Confirm" ui="raised confirm"/>
                        <Button text="Disabled" disabled ui="raised"/>
                    </Container>
                </Container>
            </Container>

            <Container>
                <div {...groupLabelProps}>Badge</div>
                <Container className="button-group" { ...buttonGroupProps }>
                    <Container layout="hbox">
                        <Button text="Normal" badgeText="2"/>
                        <Button text="Decline" ui="decline" badgeText="2"/>
                    </Container>
                    <Container layout="hbox">
                        <Button text="Confirm" ui="confirm" badgeText="2"/>
                        <Button text="Disabled" disabled badgeText="2"/>
                    </Container>
                </Container>
            </Container>

            <Container>
                <div {...groupLabelProps}>Menu</div>
                <Container className="button-group" { ...buttonGroupProps }>
                    <Container layout="hbox">
                        <Button text="Normal">{menu}</Button>
                        <Button text="Decline" ui="decline">{menu}</Button>
                    </Container>
                    <Container layout="hbox">
                        <Button text="Confirm" ui="confirm">{menu}</Button>
                        <Button text="Disabled" disabled>{menu}</Button>
                    </Container>
                </Container>
            </Container>

            <Container>
                <div {...groupLabelProps}>Icon</div>
                <Container className="button-group" { ...buttonGroupProps }>
                    <Container layout="hbox">
                        <Button iconCls="x-fa fa-home"/>
                        <Button ui="decline" iconCls="x-fa fa-home"/>
                    </Container>
                    <Container layout="hbox">
                        <Button text="Icon" ui="confirm" iconCls="x-fa fa-home"/>
                        <Button text="Icon" iconCls="x-fa fa-home" disabled>{menu}</Button>
                    </Container>
                </Container>
            </Container>
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

const layoutProps = Ext.os.is.Phone ? {
    height: '100%',
    width: '100%',
    scrollable: 'y',
    className: 'demo-buttons',
    defaults: {
        margin: '20'
    }
} : {
    height: 550,
    width: 500,
    layout: { type: 'vbox', align: 'stretch' },
    className: 'demo-buttons demo-buttons-desktop',
    padding: 10,
    shadow: true,
    defaults: {
        layout: 'hbox',
        flex: 1,
        margin: '10'
    }        
}

const buttonGroupProps = Ext.os.is.Phone ? {
    padding: '20 0 0 20',
    defaults: {
        margin: '0 0 20 0',
        defaults: {
            flex: 1,
            margin: '0 20 0 0'
        }
    }
} : {
    flex: 1,
    padding: '0 0 0 20',
    layout: { type: 'hbox', align: 'middle' },
    defaults: {
        flex: 1, 
        defaults: {
            flex: 1,
            margin: '0 20 0 0'
        }
    }
}

const groupLabelProps = Ext.os.is.Phone ? {

} : {
    style: {
        width: '50px',
        textAlign: 'right',
        margin: '20px 20px 0 0'
    }
};

