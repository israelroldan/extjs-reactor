import React, { Component } from 'react';
import { Container, Button } from '@extjs/reactor/modern';

Ext.require('Ext.Toast');

export default function ToastExample() {
    return (
        <Container layout={{type: 'vbox', align: 'left'}}>
            <Button 
                ui="action" 
                handler={() => Ext.toast('Hello World!')}
                text="Show Toast"
            />
        </Container>
    )
}